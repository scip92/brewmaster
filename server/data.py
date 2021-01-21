target_temperature = 40


def set_target_temperature(value: int):
    global target_temperature
    target_temperature = value


def get_target_temperature():
    global target_temperature
    return target_temperature

