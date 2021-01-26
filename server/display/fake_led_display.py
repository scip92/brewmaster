import logging


class FakeLedDisplay:
    def display_text(self, value: str) -> None:
        logging.info("FakeLedDisplay:" + value)
