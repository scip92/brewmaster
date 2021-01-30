import logging
import sys
from injector import inject

from ..config import temp_sensor_path


class TemperatureSensor:

    @inject
    def __init__(self):
        self.path = temp_sensor_path

    def read_temperature(self) -> float:
        try:
            file = open(self.path, 'r')
            lines = file.readlines()
            file.close()
            temperature_str = lines[1].find('t=')
            temperature_value = lines[1][temperature_str + 2:]
            in_celsius = float(temperature_value) / 1000.0
            return round(in_celsius, 1)
        finally:
            logging.info("Unexpected error:", sys.exc_info()[0])
            return -1
