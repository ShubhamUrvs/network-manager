import time
import logging
import signal
import sys
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
INTERVAL = 5 # seconds

def main():
    client = APIClient(BACKEND_URL)
    logging.info("Starting Smart Network Agent (Polling Mode)...")

    def signal_handler(sig, frame):
        logging.info("Stopping Agent...")
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)

    while True:
        try:
            # 1. Collect & Send Metrics
            metrics = get_network_stats()
            logging.info(f"Collected Metrics: {metrics}")
            client.send_metrics(metrics)

            # 2. Collect & Send Processes
            processes = get_network_heavy_processes()
            logging.info(f"Collected {len(processes)} network-heavy processes.")
            client.send_processes(processes)

            # 3. Poll for Commands (New robust way)
            commands = client.get_commands()
            for cmd in commands:
                logging.info(f"Received remote command: {cmd}")
                handle_command(cmd)

        except Exception as e:
            logging.error(f"Error in main loop: {e}")
        
        time.sleep(INTERVAL)

if __name__ == "__main__":
    main()
