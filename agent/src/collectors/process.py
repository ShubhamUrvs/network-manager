import psutil
import logging

def get_network_heavy_processes(limit=10):
    processes = []
    for proc in psutil.process_iter(['pid', 'name', 'username']):
        try:
            # We count established connections as a simple proxy for network activity
            connections = proc.connections(kind='inet')
            established = [c for c in connections if c.status == 'ESTABLISHED']
            
            if established:
                processes.append({
                    "pid": proc.info['pid'],
                    "name": proc.info['name'],
                    "user": proc.info['username'],
                    "connections": len(established)
                })
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    
    # Sort by active connections
    processes = sorted(processes, key=lambda x: x['connections'], reverse=True)[:limit]
    return processes
