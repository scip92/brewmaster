import datetime
import threading
from flask import Flask, jsonify, request
from flask_cors import CORS
from tinydb import TinyDB

from server import database_path

dataLock = threading.Lock()
thread = threading.Thread()
temperatures_db = TinyDB(database_path+'temperatures.db')
targets_db = TinyDB(database_path+'targets.db')
processes_db = TinyDB(database_path+'processes.db')

targetValue = 50
process = ""


def create_app() -> Flask:
    app: Flask = Flask(__name__)
    CORS(app)

    @app.route("/data")
    def temp():
        all_temperatures = temperatures_db.all()
        return jsonify(all_temperatures[-1])

    @app.route("/target-temperature", methods=["GET", "POST"])
    def target_value():
        global targetValue
        if request.method == "POST":
            new_target = request.get_json()["new_value"]
            print("New target set:", new_target)
            if new_target:
                targetValue = new_target
                current_time = str(datetime.datetime.now())
                targets_db.insert({'target': targetValue, 'timestamp': current_time})
        return str(targetValue)

    @app.route("/process", methods=["GET", "POST"])
    def process():
        global process
        if request.method == "POST":
            new_process = request.get_json()["process"]
            print("New process step set:", new_process)
            if new_process:
                process = new_process
                current_time = str(datetime.datetime.now())
                processes_db.insert({'process': process, 'timestamp': current_time})
        return str(process)
    return app
