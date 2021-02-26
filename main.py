
#METs x 3.5 x (your body weight in kilograms) / 200 = calories burned per minute.
steps = 0
cal = 0
weight = 50
state = 0
setup = 0
i = 0
stage = 0
finalMET = 0
currentspd = [2.0,3.3,13.5]
spd = ["slow","medium","fast"]
OLED.init(128, 64)

def on_gesture_shake():
    global steps
    steps += 1
input.on_gesture(Gesture.Shake, on_gesture_shake)
def calc():
    global cal
    pass




def keypressed():
    global state,weight,setup,i
    if tinkercademy.ad_keyboard(ADKeys.A, AnalogPin.P0):
        if setup == 0:
            weight += 1
            OLED.clear()
            menudisplay()

        if setup == 1:
            i += 1
            OLED.clear()
            menudisplay()


        if setup == 2:
            OLED.clear()
            state = 1
            OLED.write_string("steps = " + str(steps))
            pause(5000)
            OLED.clear()
            state = 0
            menudisplay()

    if tinkercademy.ad_keyboard(ADKeys.B, AnalogPin.P0):
        if setup == 0:
            weight -= 1
            OLED.clear()
            menudisplay()

        if setup == 1:
            i += 1
            OLED.clear()
            menudisplay()
        if setup == 2:
            OLED.clear()
            state = 1
            OLED.write_string("calories = " + str(cal))
            pause(5000)
            OLED.clear()
            state = 0
            menudisplay()
    
    if tinkercademy.ad_keyboard(ADKeys.C, AnalogPin.P0):
        
        if setup == 0:
            
            setup = 1
            OLED.clear()
            menudisplay()
        
        if setup == 1 and stage == 1:
            
            setup = 2
            stage = 0
            finalMET = currentspd[i]
            OLED.clear()
            menudisplay()
    
    if tinkercademy.ad_keyboard(ADKeys.E, AnalogPin.P0):
        control.reset()




def menudisplay():
    global state,setup,weight,currentspd,i
    if setup == 0:
        OLED.write_string_new_line("Set weight:" + str(weight) + "kg")
        OLED.write_string_new_line("Button C to confirm")

    if setup == 1:
        OLED.write_string_new_line("Set speed of walk:" + spd[i])
        OLED.write_string_new_line("Button C to confirm")

    if setup == 2:
        if state == 0:
            OLED.write_string_new_line("A. Show steps")
            OLED.write_string_new_line("B. Show calories")
            OLED.write_string_new_line("C. Input body weight")
        elif state == 1:
            pass
        
        
def weightensure():
    global weight
    if weight <= 0:
        weight = 0
    if weight >= 300:
        weight = 300      

    

menudisplay()
def on_forever():
    weightensure()
    keypressed()
    calc()
forever(on_forever)


