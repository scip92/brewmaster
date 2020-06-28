from .temperature_sensor import TemperatureSensor
from .fake_temperature_sensor import FakeTemperatureSensor
from .. import use_fake


def get_temperature_sensor() -> TemperatureSensor:
    if use_fake:
        return FakeTemperatureSensor()
    return TemperatureSensor()
