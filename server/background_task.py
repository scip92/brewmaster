import logging
from datetime import datetime

from .data import get_target_temperature
from .display import get_display
from .heater import get_heater
from .sensor import get_temperature_sensor

temp_sensor = get_temperature_sensor()
display = get_display()
heater = get_heater()
last_heater_switch = None


def run_background_task():
    global last_heater_switch

    current_temperature = temp_sensor.read_temperature()
    target_temperature = get_target_temperature()
    display.display_text(str(current_temperature))

    logging.info("CurrentTemperature: " + str(current_temperature) + " TargetTemperature: " + str(target_temperature))

    if (last_heater_switch is not None) and (datetime.now() - last_heater_switch).total_seconds() < 10:
        logging.info("No heater update needed")
        return

    if current_temperature < target_temperature:
        heater.turn_on()
    else:
        heater.turn_off()

    last_heater_switch = datetime.now()
