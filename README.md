# SnokNAS - Advanced Server NAS Dashboard

SnokNAS is a modern, responsive, and high-performance NAS (Network Attached Storage) management dashboard. It provides a sleek web interface for monitoring system health, managing storage, and deploying applications on Linux-based servers.

## 🚀 Key Features

- **🌐 Multi-Dashboard Support**: Comprehensive control panel for various NAS services.
- **📊 Real-time Monitoring**: Track CPU, RAM, uptime, and system statistics.
- **💾 Storage Management**: Visual representation of disk health, capacity, and temperature for up to 10 drive bays.
- **📦 Application Manager**: Easy-to-use interface for installing and managing server applications.
- **🌍 Multi-language Support**: Fully localized in **English**, **French**, and **Arabic** (with pixel-perfect RTL support).
- **🌓 Theme System**: Seamless switching between **Dark** and **Light** modes (defaulting to Dark).
- **💻 CLI Control**: Manage your NAS directly from the terminal using `snoknas.py`.
- **🛠️ Auto-Installer**: Simplified deployment with the `install.sh` script.

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla), Bootstrap, Nova Round Typography.
- **Backend**: Python (Flask), System Controllers.
- **CLI**: Python-based Command Line Interface.

## 📥 Installation

To install SnokNAS on your server, you can use the following command to download and run the installer directly:

```bash
# Using curl
curl -O https://raw.githubusercontent.com/SnokOS/Dashboard-ServerNAS-SnokOS/main/install.sh
chmod +x install.sh
sudo ./install.sh

# Or using wget
wget https://raw.githubusercontent.com/SnokOS/Dashboard-ServerNAS-SnokOS/main/install.sh
chmod +x install.sh
sudo ./install.sh
```

## 🖥️ CLI Usage

You can also manage the system using the `snoknas.py` CLI:

```bash
# Show system statistics
python3 snoknas.py stats

# Show storage information
python3 snoknas.py storage

# Manage applications
python3 snoknas.py apps --install <app_name>

# Power actions
python3 snoknas.py power reboot
python3 snoknas.py power shutdown
```

## 🤝 Contact & Support

For support, collaboration, or inquiries, please contact us:

- **Developer**: Mahrez Ben Mohammed
- **Email**: [SnokSoft@gmail.com](mailto:SnokSoft@gmail.com)
- **Tel**: +216 26 360 802
- **Company**: SnokOS (شركة SnokOS)
- **Website**: [https://snokos.github.io/SnokOS/](https://snokos.github.io/SnokOS/)
- **GitHub**: [https://github.com/SnokOS](https://github.com/SnokOS)
- **Repository**: [https://github.com/SnokOS/Dashboard-ServerNAS-SnokOS](https://github.com/SnokOS/Dashboard-ServerNAS-SnokOS)

---
© 2026 SnokOS. All rights reserved.
