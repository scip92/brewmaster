import datetime
from .display import get_display
from .sensor import get_temperature_sensor
from tinydb import TinyDB
from . import database_path

db = TinyDB(database_path)
temp_sensor = get_temperature_sensor()
display = get_display()


def run_background_task():
    current_temperature = temp_sensor.read_temperature()
    current_time = str(datetime.datetime.now())
    display.display_text(str(current_temperature))
    db.insert({'value': current_temperature, 'timestamp': current_time})
