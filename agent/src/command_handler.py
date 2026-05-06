import os
import signal
import logging
import psutil

def handle_command(command):
    action = command.get("action")
    pid = command.get("pid")
    
    if action == "KILL" and pid:
        try:
            logging.info(f"Attempting to kill process {pid}...")
            # Use psutil for a cleaner kill
            proc = psutil.Process(pid)
            proc.terminate() # or proc.kill()
            logging.info(f"Process {pid} terminated successfully.")
            return True
        except (psutil.NoSuchProcess, psutil.AccessDenied) as e:
            logging.error(f"Failed to kill process {pid}: {e}")
            return False
    return False
