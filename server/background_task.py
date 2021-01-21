from .data import get_target_temperature
from .display import get_display
from .heater import get_heater
from .sensor import get_temperature_sensor


temp_sensor = get_temperature_sensor()
display = get_display()
heater = get_heater()


def run_background_task():
    current_temperature = temp_sensor.read_temperature()
    display.display_text(str(current_temperature))

    if current_temperature < get_target_temperature():
        heater.turn_on()
    else:
        heater.turn_off()

    print("Target Temperature:" + str(get_target_temperature()))

