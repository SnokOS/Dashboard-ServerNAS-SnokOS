import subprocess

class AppManager:
    APPS = {
        "casaos": {
            "name": "CasaOS",
            "install_cmd": "curl -fsSL https://get.casaos.io | sudo bash",
            "description": "Simple, personal cloud system."
        },
        "docker": {
            "name": "Docker",
            "install_cmd": "curl -fsSL https://get.docker.com | sudo bash",
            "description": "Containerization platform."
        }
    }

    @staticmethod
    def get_apps():
        # Check if apps are installed
        # This is simplified
        return AppManager.APPS

    @staticmethod
    def install_app(app_id):
        if app_id in AppManager.APPS:
            cmd = AppManager.APPS[app_id]["install_cmd"]
            # Run in background ideally, but for now:
            try:
                subprocess.Popen(cmd, shell=True)
                return True
            except:
                return False
        return False
