import threading
from flask import Flask, jsonify, request
from flask_cors import CORS
from tinydb import TinyDB

from server import database_path

dataLock = threading.Lock()
thread = threading.Thread()
db = TinyDB(database_path)

targetValue = 57


def create_app() -> Flask:
    app: Flask = Flask(__name__)
    CORS(app)

    @app.route("/temperature")
    def temp():
        all_temperatures = db.all()
        return jsonify(all_temperatures[-1])

    @app.route("/target-temperature", methods=["GET", "POST"])
    def target_value():
        global targetValue
        if request.method == "POST":
            new_value = request.get_json()["new_value"]
            print("new value set", new_value)
            if new_value:
                targetValue = new_value
        return str(targetValue)

    return app
