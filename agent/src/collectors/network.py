import ping3
import time
import logging

def get_network_stats(host="8.8.8.8"):
    latencies = []
    try:
        for _ in range(5):
            latency = ping3.ping(host, unit='ms')
            if isinstance(latency, (int, float)):
                latencies.append(latency)
            time.sleep(0.1)
    except Exception as e:
        logging.error(f"Error during ping: {e}")
    
    if not latencies:
        return {"ping": 0.0, "jitter": 0.0, "packetLoss": 100.0}
        
    avg_ping = sum(latencies) / len(latencies)
    packet_loss = ((5 - len(latencies)) / 5) * 100.0
    
    # Jitter calculation: average of the absolute differences between successive latency measurements.
    jitter = 0.0
    if len(latencies) > 1:
        diffs = [abs(latencies[i] - latencies[i-1]) for i in range(1, len(latencies))]
        jitter = sum(diffs) / len(diffs)
    
    return {
        "ping": round(avg_ping, 2),
        "jitter": round(jitter, 2),
        "packetLoss": round(packet_loss, 2)
    }
