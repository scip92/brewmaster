import logging


class FakeStirrer:
    is_on = False

    def get_state(self) -> bool:
        return self.is_on

    def set_state(self, is_on) -> None:
        if is_on:
            self.turn_on()
        else:
            self.turn_off()

    def turn_on(self) -> None:
        self.is_on = True
        logging.info("Stirrer - on")

    def turn_off(self) -> None:
        self.is_on = False
        logging.info("Stirrer - off")
