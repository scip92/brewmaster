import logging


class FakeHeater:
    def turn_on(self) -> None:
        logging.info("Heater - on")

    def turn_off(self) -> None:
        logging.info("Heater - off")
