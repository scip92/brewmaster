import threading
import datetime
from flask import Flask, jsonify
from flask_cors import CORS
from tinydb import TinyDB

from server import database_path

dataLock = threading.Lock()
thread = threading.Thread()
db = TinyDB(database_path)


def create_app() -> Flask:
    app: Flask = Flask(__name__)
    CORS(app)

    @app.route("/temperature")
    def temp():
        all_temperatures = db.all()
        return jsonify(all_temperatures[-1])

    return app
