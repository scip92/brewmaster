import random


class FakeTemperatureSensor:

    def read_temperature(self):
        return round(random.uniform(50, 100), 0)
