import psutil
import time
import platform
import subprocess

class SystemManager:
    @staticmethod
    def get_stats():
        cpu_usage = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        uptime_seconds = time.time() - psutil.boot_time()
        
        # Temp detection (try common paths if sensors not available)
        temp = 0
        try:
            temps = psutil.sensors_temperatures()
            if 'coretemp' in temps:
                temp = temps['coretemp'][0].current
            elif 'cpu_thermal' in temps:
                temp = temps['cpu_thermal'][0].current
        except:
            pass

        return {
            "cpu_usage": cpu_usage,
            "memory": {
                "total": memory.total,
                "used": memory.used,
                "percent": memory.percent
            },
            "temp": temp,
            "uptime": SystemManager.format_uptime(uptime_seconds),
            "hostname": platform.node(),
            "os": platform.system() + " " + platform.release()
        }

    @staticmethod
    def format_uptime(seconds):
        days = int(seconds // (24 * 3600))
        hours = int((seconds % (24 * 3600)) // 3600)
        minutes = int((seconds % 3600) // 60)
        return f"{days}d {hours}h {minutes}m"

    @staticmethod
    def power_action(action):
        if action == "reboot":
            subprocess.run(["sudo", "reboot"])
            return True
        elif action == "shutdown":
            subprocess.run(["sudo", "poweroff"])
            return True
        return False
