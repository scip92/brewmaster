from .heater import Heater
from .fake_heater import FakeHeater
from .. import use_fake


def get_heater() -> Heater:
    if use_fake:
        return FakeHeater()
    return Heater()
