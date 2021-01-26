import logging
from ..config import use_fake, heater_port

if not use_fake:
    import RPi.GPIO as GPIO
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(heater_port, GPIO.OUT)


class Heater:
    def turn_on(self) -> None:
        logging.info("Heater - on")
        GPIO.output(heater_port, GPIO.HIGH)

    def turn_off(self) -> None:
        logging.info("Heater - off")
        GPIO.output(heater_port, GPIO.LOW)
