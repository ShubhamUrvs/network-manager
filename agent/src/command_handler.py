import os
import signal
import logging
import psutil

def handle_command(command):
    action = command.get("action")
    pid = command.get("pid")
    
    if action == "KILL" and pid:
        try:
            logging.info(f"Attempting to FORCE KILL process {pid}...")
            proc = psutil.Process(pid)
            # Use kill() instead of terminate() for a forced stop
            proc.kill() 
            logging.info(f"Process {pid} killed successfully.")
            return True
        except psutil.NoSuchProcess:
            logging.error(f"Failed to kill process {pid}: Process no longer exists.")
            return False
        except psutil.AccessDenied:
            logging.error(f"Failed to kill process {pid}: Permission denied. Try running the agent as Administrator.")
            return False
        except Exception as e:
            logging.error(f"Unexpected error killing process {pid}: {e}")
            return False
    return False
