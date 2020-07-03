import os
import threading
import atexit
import datetime
import time
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from tinydb import TinyDB, Query

from .display import get_display
from .sensor import get_temperature_sensor
from .sensor.fake_temperature_sensor import FakeTemperatureSensor
from .sensor.temperature_sensor import TemperatureSensor

from . import database_path


POOL_TIME = 2

current_temperature = 0
dataLock = threading.Lock()
thread = threading.Thread()
db = TinyDB(database_path)


def create_app():
    app: Flask = Flask(__name__)
    CORS(app)

    @app.route("/temperature")
    def temp():
        global current_temperature
        return jsonify(value=current_temperature, timestamp=str(datetime.datetime.now()))

    def stop_thread():
        global thread
        thread.cancel()

    def loop():
        global current_temperature
        temp_sensor = get_temperature_sensor()
        display = get_display()
        while True:
            current_temperature = temp_sensor.read_temperature()
            current_time = str(datetime.datetime.now())
            display.display_text(str(current_temperature))
            time.sleep(POOL_TIME)
            db.insert({'value': current_temperature, 'timestamp': current_time})

    def start_threat():
        global thread
        thread = threading.Timer(POOL_TIME, loop, ())
        thread.start()

    start_threat()
    atexit.register(stop_thread)
    return app
