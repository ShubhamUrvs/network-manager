import time
import logging
import signal
import sys
import threading
import json
import websocket
from collectors.network import get_network_stats
from collectors.process import get_network_heavy_processes
from api_client import APIClient
from command_handler import handle_command

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

BACKEND_URL = "http://localhost:8081"
WS_URL = "ws://localhost:8081/ws" # Note: In a real app, STOMP over WS would be better
INTERVAL = 5 # seconds

def ws_listener():
    def on_message(ws, message):
        try:
            # Basic non-STOMP check, though our backend uses STOMP.
            # For simplicity in this script, we'll assume a simplified message 
            # or recommend using a proper stomp library like 'stomp.py'
            data = json.loads(message)
            handle_command(data)
        except Exception as e:
            pass

    def on_error(ws, error):
        logging.error(f"WS Error: {error}")

    def on_close(ws, close_status_code, close_msg):
        logging.info("WS Connection Closed. Retrying in 5s...")
        time.sleep(5)
        start_ws()

    def start_ws():
        # Note: This is a simplified WS client. 
        # For production STOMP, 'stomp.py' is recommended.
        ws = websocket.WebSocketApp(WS_URL,
                                  on_message=on_message,
                                  on_error=on_error,
                                  on_close=on_close)
        ws.run_forever()

    start_ws()

def main():
    client = APIClient(BACKEND_URL)
    logging.info("Starting Smart Network Agent...")

    # Start WS listener in background
    # ws_thread = threading.Thread(target=ws_listener, daemon=True)
    # ws_thread.start()

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
