#!/bin/bash

# SnokNAS Installer
# Optimized for Ubuntu/Debian

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}------------------------------------------${NC}"
echo -e "${CYAN}   SnokNAS Automated Installer v2.0      ${NC}"
echo -e "${CYAN}------------------------------------------${NC}"

# Check for root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}" 
   exit 1
fi

echo -e "${GREEN}[1/5] Updating system and installing dependencies...${NC}"
apt-get update
apt-get install -y python3 python3-pip python3-venv curl git smartmontools

echo -e "${GREEN}[2/5] Setting up SnokNAS Directory...${NC}"
INSTALL_DIR="/opt/snoknas"
mkdir -p $INSTALL_DIR
cp -r . $INSTALL_DIR

echo -e "${GREEN}[3/5] Setting up Python Virtual Environment...${NC}"
cd $INSTALL_DIR
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors psutil

echo -e "${GREEN}[4/5] Installing Docker for Apps Support...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
fi

echo -e "${GREEN}[5/5] Creating SnokNAS Systemd Service...${NC}"
cat <<EOF > /etc/systemd/system/snoknas.service
[Unit]
Description=SnokNAS Management Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=$INSTALL_DIR/backend
ExecStart=$INSTALL_DIR/venv/bin/python $INSTALL_DIR/backend/server.py
Restart=always

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable snoknas
systemctl start snoknas

echo -e "${CYAN}------------------------------------------${NC}"
echo -e "${GREEN}SnokNAS Installed Successfully!${NC}"
echo -e "Access the dashboard at: http://$(hostname -I | awk '{print $1}'):5000"
echo -e "Use the CLI at: /opt/snoknas/snoknas.py"
echo -e "${CYAN}------------------------------------------${NC}"
