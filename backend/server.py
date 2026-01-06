from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from system_manager import SystemManager
from storage_manager import StorageManager
from app_manager import AppManager
import os

app = Flask(__name__, static_folder='../')
CORS(app)

UI_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

@app.route('/')
def index():
    return send_from_directory(UI_PATH, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(UI_PATH, path)

@app.route('/api/stats')
def get_stats():
    return jsonify(SystemManager.get_stats())

@app.route('/api/storage')
def get_storage():
    return jsonify(StorageManager.get_disks())

@app.route('/api/apps')
def get_apps():
    return jsonify(AppManager.get_apps())

@app.route('/api/apps/install', methods=['POST'])
def install_app():
    data = request.json
    app_id = data.get('id')
    if AppManager.install_app(app_id):
        return jsonify({"status": "success", "message": f"Installation of {app_id} started."})
    return jsonify({"status": "error", "message": "Failed to start installation."}), 400

@app.route('/api/power', methods=['POST'])
def power_action():
    data = request.json
    action = data.get('action')
    if SystemManager.power_action(action):
        return jsonify({"status": "success"})
    return jsonify({"status": "error"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
