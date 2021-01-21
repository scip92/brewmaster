from ..config import use_fake, heater_port

if not use_fake:
    import RPi.GPIO as GPIO
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(heater_port, GPIO.OUT)


class Heater:

    def turn_on(self) -> None:
        print('Heater: ON')
        GPIO.output(heater_port, GPIO.HIGH)

    def turn_off(self) -> None:
        print('Heater: OFF')
        GPIO.output(heater_port, GPIO.LOW)
