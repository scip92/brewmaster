from ..config import use_fake

if not use_fake:
    from luma.core.interface.serial import spi, noop
    from luma.core.render import canvas
    from luma.core.legacy import text, show_message
    from luma.led_matrix.device import max7219
    from luma.core.legacy.font import proportional, CP437_FONT, TINY_FONT, SINCLAIR_FONT, LCD_FONT
    serial = spi(port=0, device=0, gpio=noop())
    device = max7219(serial, width=32, height=8, block_orientation=-90)


class LedDisplay:

    def display_text(self, value: str):
        with canvas(device) as draw:
            text(draw, (1, 1), value, fill="white", font=proportional(CP437_FONT))
