import datetime
import json
from .display import get_display
from .sensor import get_temperature_sensor
from tinydb import TinyDB
from . import database_path

temperatures_db = TinyDB(database_path+'temperatures.db')
targets_db = TinyDB(database_path+'targets.db')
processes_db = TinyDB(database_path+'processes.db')
temp_sensor = get_temperature_sensor()
display = get_display()


def run_background_task():
    current_temperature = temp_sensor.read_temperature()
    current_time = str(datetime.datetime.now())
    display.display_text(str(current_temperature))

    if len(targets_db) == 0:
        target_temperature = 0
    else:
        target_temperature = targets_db.all()[-1]['target']

    if len(processes_db) == 0:
        process = ""
    else:
        process = targets_db.all()[-1]['process']

    temperatures_db.insert(
        {'measured_temperature': current_temperature, 'timestamp': current_time, 'target_temperature': target_temperature, 'process': process})
