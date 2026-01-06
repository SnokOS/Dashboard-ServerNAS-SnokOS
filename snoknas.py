#!/usr/bin/env python3
import argparse
import sys
import json
from backend.system_manager import SystemManager
from backend.storage_manager import StorageManager
from backend.app_manager import AppManager

def main():
    parser = argparse.ArgumentParser(description="SnokNAS CLI Control")
    subparsers = parser.add_subparsers(dest="command")

    # Stats command
    subparsers.add_parser("stats", help="Show system statistics")

    # Storage command
    subparsers.add_parser("storage", help="Show storage information")

    # Apps command
    app_parser = subparsers.add_parser("apps", help="Manage applications")
    app_parser.add_argument("--install", help="Install an application (e.g., casaos)")

    # Power command
    power_parser = subparsers.add_parser("power", help="System power actions")
    power_parser.add_argument("action", choices=["reboot", "shutdown"])

    args = parser.parse_args()

    if args.command == "stats":
        stats = SystemManager.get_stats()
        print(json.dumps(stats, indent=4))
    
    elif args.command == "storage":
        disks = StorageManager.get_disks()
        print(json.dumps(disks, indent=4))

    elif args.command == "apps":
        if args.install:
            if AppManager.install_app(args.install):
                print(f"Started installation of {args.install}")
            else:
                print(f"Failed to find app {args.install}")
        else:
            apps = AppManager.get_apps()
            print(json.dumps(apps, indent=4))

    elif args.command == "power":
        if SystemManager.power_action(args.action):
            print(f"System {args.action} initiated.")
        else:
            print("Failed to initiate power action.")

    else:
        parser.print_help()

if __name__ == "__main__":
    main()
