import requests
import logging

class APIClient:
    def __init__(self, base_url):
        self.base_url = base_url
        self.metrics_url = f"{base_url}/api/metrics"
        self.processes_url = f"{base_url}/api/processes"

    def send_metrics(self, data):
        try:
            response = requests.post(self.metrics_url, json=data, timeout=5)
            response.raise_for_status()
            return True
        except Exception as e:
            logging.error(f"Failed to send metrics: {e}")
            return False

    def send_processes(self, data):
        try:
            response = requests.post(self.processes_url, json=data, timeout=5)
            response.raise_for_status()
            return True
        except Exception as e:
            logging.error(f"Failed to send processes: {e}")
            return False
