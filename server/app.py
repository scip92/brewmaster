from flask import Flask, jsonify, request
from flask_cors import CORS
from .sensor import get_temperature_sensor
from .data import get_target_temperature, set_target_temperature

temp_sensor = get_temperature_sensor()


def create_app() -> Flask:
    app: Flask = Flask(__name__)
    CORS(app)

    @app.route("/current_temperature")
    def temp():
        current_temperature = temp_sensor.read_temperature()
        return jsonify(current_temperature=current_temperature)

    @app.route("/target_temperature", methods=["GET", "POST"])
    def target_value():
        if request.method == "POST":
            new_value = request.get_json()["new_value"]
            set_target_temperature(new_value)
        return jsonify(target_temperature=get_target_temperature())

    return app
