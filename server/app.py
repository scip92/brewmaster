import datetime
import threading
from flask import Flask, jsonify, request
from flask_cors import CORS
from tinydb import TinyDB
from .sensor import get_temperature_sensor
from server import database_path

dataLock = threading.Lock()
thread = threading.Thread()
temperatures_db = TinyDB(database_path+'temperatures.db')
targets_db = TinyDB(database_path+'targets.db')
processes_db = TinyDB(database_path+'processes.db')
temp_sensor = get_temperature_sensor()

target_value = 40
process = "not set yet"


def create_app() -> Flask:
    app: Flask = Flask(__name__)
    CORS(app)

    @app.route("/current_temperature")
    def temp():
        current_temperature = temp_sensor.read_temperature()
        return jsonify(current_temperature = current_temperature)

    @app.route("/target_temperature", methods=["GET", "POST"])
    def target_value():
        global target_value
        if request.method == "POST":
            new_target = request.get_json()["new_value"]
            print("New target set:", new_target)
            if new_target:
                target_value = new_target
                current_time = str(datetime.datetime.now())
                targets_db.insert(
                    {'target': target_value, 'timestamp': current_time})
        return jsonify(target_temperature = target_value)

    @app.route("/process", methods=["GET", "POST"])
    def process():
        global process
        if request.method == "POST":
            new_process = request.get_json()["new_value"]
            print("New process step set:", new_process)
            if new_process:
                process = new_process
                current_time = str(datetime.datetime.now())
                processes_db.insert(
                    {'process': process, 'timestamp': current_time})
        return jsonify(current_process = process)

    return app
