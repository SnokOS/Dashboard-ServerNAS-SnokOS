import subprocess
import json
import os

class StorageManager:
    @staticmethod
    def get_disks():
        disks = []
        try:
            # Use lsblk to get disk info in JSON format
            result = subprocess.run(['lsblk', '-J', '-o', 'NAME,SIZE,MODEL,SERIAL,TEMP,HEALTH,TYPE,MOUNTPOINT'], capture_output=True, text=True)
            if result.returncode == 0:
                data = json.loads(result.stdout)
                for device in data.get('devices', []):
                    if device.get('type') == 'disk':
                        disk_info = {
                            "id": device.get('name'),
                            "model": device.get('model') or "Unknown",
                            "serial": device.get('serial') or "N/A",
                            "size": device.get('size'),
                            "temp": StorageManager.get_disk_temp(device.get('name')),
                            "health": "Healthy", # Placeholder or use smartctl
                            "status": "ONLINE",
                            "state": "healthy",
                            "usage": StorageManager.get_disk_usage(device.get('name'))
                        }
                        disks.append(disk_info)
        except Exception as e:
            print(f"Error getting disks: {e}")

        # Pad with empty slots up to 8 for the rack visualization
        padded_disks = disks[:8]
        while len(padded_disks) < 8:
            padded_disks.append({"id": None, "state": "empty"})
            
        return padded_disks

    @staticmethod
    def get_disk_temp(name):
        # Placeholder for smartctl logic
        return "35°C"

    @staticmethod
    def get_disk_usage(name):
        # Logic to find mount point and get usage
        return 0
    
    @staticmethod
    def wipe_disk(name):
        # DANGEROUS: Only for implementation demonstration
        # subprocess.run(["sudo", "wipefs", "-a", f"/dev/{name}"])
        return True
