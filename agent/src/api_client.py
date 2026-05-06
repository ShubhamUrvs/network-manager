import requests
import logging

class APIClient:
    def __init__(self, base_url):
        self.base_url = base_url

    def send_metrics(self, metrics):
        try:
            response = requests.post(f"{self.base_url}/api/metrics", json=metrics)
            response.raise_for_status()
            return True
        except Exception as e:
            logging.error(f"Failed to send metrics: {e}")
            return False

    def send_processes(self, processes):
        try:
            response = requests.post(f"{self.base_url}/api/processes", json=processes)
            response.raise_for_status()
            return True
        except Exception as e:
            logging.error(f"Failed to send processes: {e}")
            return False

    def get_commands(self):
        try:
            response = requests.get(f"{self.base_url}/api/processes/commands")
            if response.status_code == 200:
                return response.json()
            return []
        except Exception as e:
            logging.error(f"Failed to fetch commands: {e}")
            return []
