steps = 0
cal = 0
weight = 0
state = 0
OLED.init(128, 64)
def on_gesture_shake():
    global steps
    steps += 1
input.on_gesture(Gesture.Shake, on_gesture_shake)
def calc():
    pass
def keypressed():
    if tinkercademy.ad_keyboard(ADKeys.A, AnalogPin.P0):
        global state
        state = 1
        OLED.write_string("steps = " + str(steps))
        pause(1000)
        OLED.clear()
        state = 0

    if tinkercademy.ad_keyboard(ADKeys.B, AnalogPin.P0):
        global state
        state =1 
        OLED.write_string_new_line("calories =" + str(cal))
        pause (1000)
        OLED.clear()
        state = 0
def menudisplay():
    if state == 0:
        OLED.write_string("A. Show steps")
        OLED.write_string_new_line("B. Show calories")
        OLED.write_string_new_line("C. Input body weight")
    else:
        OLED.clear()
def on_forever():

    keypressed()
    calc()
forever(on_forever)

   