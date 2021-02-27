
#METs x 3.5 x (your body weight in kilograms) / 200 = calories burned per minute.
steps = 0
cal = 0
weight = 50
state = 0
setupA = 0
setupB = 0
i = 0
stage = 0
finalMET = 0
calPerMin = 0
time = 0
currentspd = [2.9,3.4,7.6,14.3]
spd = ["stroll","walk","jog","sprint"]
OLED.init(128, 64)

def on_gesture_shake():
    global steps
    steps += 1
input.on_gesture(Gesture.Shake, on_gesture_shake)
def calc():
    global cal,finalMET, calPerMin,time
    calPerMin = (finalMET*weight*3.5)/200
    cal = calPerMin*time






def keypressed():
    global state,weight,setupA,i,setupB,finalMET,cal,calPerMin
    if tinkercademy.ad_keyboard(ADKeys.A, AnalogPin.P0):
        if setupA == 0:
            weight -= 1
            OLED.clear()
            menudisplay()

        if setupB == 0 and setupA == 1:
            i -= 1
            if i < 0:
                i = 0
            if i > 3:
                i = 3
            OLED.clear()
            menudisplay()


        if setupA == 1 and setupB == 1:
            OLED.clear()
            state = 1
            OLED.write_string("steps = " + str(steps))
            pause(5000)
            OLED.clear()
            state = 0
            menudisplay()

    if tinkercademy.ad_keyboard(ADKeys.B, AnalogPin.P0):
        if setupA == 0:
            weight += 1
            OLED.clear()
            menudisplay()

        if setupA == 1 and setupB == 0:
            i += 1
            if i < 0:
                i = 0
            if i > 3:
                i = 3
            OLED.clear()
            menudisplay()
        if setupA == 1 and setupB == 1:
            OLED.clear()
            state = 1
            OLED.write_string("calories per minute = " + str(calPerMin))
            pause(5000)
            OLED.clear()
            state = 0
            menudisplay()
    
    if tinkercademy.ad_keyboard(ADKeys.C, AnalogPin.P0):
        
        if setupA == 0:
            pause(100)
            setupA = 1
            OLED.clear()
            menudisplay()
        
        elif setupA == 1 and setupB == 0:
            pause(100)
            setupB = 1
            finalMET = currentspd[i]
            OLED.clear()
            menudisplay()
    
    if tinkercademy.ad_keyboard(ADKeys.E, AnalogPin.P0):
        control.reset()




def menudisplay():
    global state,setupA,weight,currentspd,i,setupB
    if setupA == 0:
        OLED.write_string_new_line("Set weight:" + str(weight) + "kg")
        OLED.write_string_new_line("Button C to confirm")

    if setupA == 1 and setupB == 0:
        OLED.write_string_new_line("Set speed of walk:" )
        OLED.write_string_new_line(spd[i])
        OLED.write_string_new_line("Button C to confirm")

    if setupA == 1 and setupB == 1:
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


