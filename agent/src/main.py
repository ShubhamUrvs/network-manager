import time
import logging
import signal
import sys
import threading
import json
import stomp
from collectors.network import get_network_stats
from collectors.process import get_network_heavy_processes
from api_client import APIClient
from command_handler import handle_command

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

BACKEND_URL = "http://localhost:8082"
WS_HOST = "localhost"
WS_PORT = 8082
INTERVAL = 5 # seconds

class CommandListener(stomp.ConnectionListener):
    def on_message(self, frame):
        try:
            logging.info(f"Received frame: {frame.body}")
            data = json.loads(frame.body)
            handle_command(data)
        except Exception as e:
            logging.error(f"Error handling command: {e}")

def start_ws_listener():
    conn = stomp.Connection([(WS_HOST, WS_PORT)])
    conn.set_listener('', CommandListener())
    
    def connect_and_subscribe():
        while True:
            try:
                conn.connect(wait=True)
                conn.subscribe(destination='/topic/commands', id=1, ack='auto')
                logging.info("Subscribed to /topic/commands")
                while conn.is_connected():
                    time.sleep(1)
            except Exception as e:
                logging.error(f"WS Connection error: {e}. Retrying in 5s...")
                time.sleep(5)

    threading.Thread(target=connect_and_subscribe, daemon=True).start()

def main():
    client = APIClient(BACKEND_URL)
    logging.info("Starting Smart Network Agent...")

    # Start STOMP listener in background
    start_ws_listener()

    def signal_handler(sig, frame):
        logging.info("Stopping Agent...")
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)

    while True:
        try:
            # 1. Collect Metrics
            metrics = get_network_stats()
            logging.info(f"Collected Metrics: {metrics}")
            client.send_metrics(metrics)

            # 2. Collect Processes
            processes = get_network_heavy_processes()
            logging.info(f"Collected {len(processes)} network-heavy processes.")
            client.send_processes(processes)

        except Exception as e:
            logging.error(f"Error in main loop: {e}")
        
        time.sleep(INTERVAL)

if __name__ == "__main__":
    main()
