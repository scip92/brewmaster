from .led_display import LedDisplay
from .fake_led_display import FakeLedDisplay
from .. import use_fake


def get_display() -> LedDisplay:
    if use_fake:
        return FakeLedDisplay()
    return LedDisplay()
