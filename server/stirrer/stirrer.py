import logging
from ..config import use_fake, stirrer_port

if not use_fake:
    import RPi.GPIO as GPIO
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(stirrer_port, GPIO.OUT)


class Stirrer:
    is_on = False

    def get_state(self) -> bool:
        return self.is_on

    def set_state(self, is_on) -> None:
        if is_on:
            self.turn_on()
        else:
            self.turn_off()

    def turn_on(self) -> None:
        GPIO.output(stirrer_port, GPIO.HIGH)
        self.is_on = True
        logging.info("Stirrer - on")

    def turn_off(self) -> None:
        GPIO.output(stirrer_port, GPIO.LOW)
        self.is_on = False
        logging.info("Stirrer - off")
