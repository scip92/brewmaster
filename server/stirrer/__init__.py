from .stirrer import Stirrer
from .fake_stirrer import FakeStirrer
from .. import use_fake


def get_stirrer() -> Stirrer:
    if use_fake:
        return FakeStirrer()
    return Stirrer()
