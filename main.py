#version-1.1, build-6

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

currentspd = [2.9,3.4,5.7,12.7]
spd = ["stroll (<4km/h)","walk (4-7km/h)","jog (7-10km/h)","sprint (>10km/h)"]

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
    global state,weight,setupA,i,setupB,finalMET,cal,calPerMin,time
    if tinkercademy.ad_keyboard(ADKeys.A, AnalogPin.P0):
        if setupA == 0 and state == 0:
            weight -= 1
            OLED.clear()
            menudisplay()

        if setupB == 0 and setupA == 1 and state == 0:
            i -= 1
            if i < 0:
                i = 0
            if i > 3:
                i = 3
            OLED.clear()
            menudisplay()


        if setupA == 1 and setupB == 1 and state == 0:
            OLED.clear()
            state = 1
            OLED.write_string("steps: " + str(steps))
            
            pause(5000)
            OLED.clear()
            state = 0
            menudisplay()

        if state == 2:
            pause(100)
            state = 4
            OLED.clear()
            menudisplay()



        if state == 3:
            time -= 1
            if time < 0:
                time = 0
            if time > 1000000:
                time = 1000000
            OLED.clear()
            menudisplay()
            

        if state == 4:
            weight -= 1
            weightensure()
            OLED.clear()
            menudisplay()
            

        if state == 5:
            i -= 1
            if i < 0:
                i = 0
            if i > 3:
                i = 3
            OLED.clear()
            menudisplay()
    
    if tinkercademy.ad_keyboard(ADKeys.B, AnalogPin.P0) :
        if setupA == 0 and state == 0:
            weight += 1
            OLED.clear()
            menudisplay()

        if setupA == 1 and setupB == 0 and state == 0:
            i += 1
            if i < 0:
                i = 0
            if i > 3:
                i = 3
            OLED.clear()
            menudisplay()
        if setupA == 1 and setupB == 1 and state == 0:
            OLED.clear()
            state = 1
            OLED.write_string("calories/min: ")
            OLED.write_string_new_line(str(calPerMin))
            if time == 0:
                OLED.write_string_new_line("")
                OLED.write_string_new_line("current time:0min")
                OLED.write_string_new_line("set time in settings")
            if time != 0:
                OLED.write_string_new_line("calories: " + str(cal) )
                OLED.write_string_new_line("")
                OLED.write_string_new_line("(current time: " + str(time) + "min)")
            pause(5000)
            OLED.clear()
            state = 0
            menudisplay()

        if state == 3:
            time += 1
            if time < 0:
                time = 0
            if time > 1000000:
                time = 1000000
            OLED.clear()
            menudisplay()
            

        if state == 4:
            weight += 1
            weightensure()
            OLED.clear()
            menudisplay()

        if state == 2:
            pause(100)
            state = 5
            OLED.clear()
            menudisplay()
            
        if state == 5:
            i += 1
            if i < 0:
                i = 0
            if i > 3:
                i = 3
            OLED.clear()
            menudisplay()
    
        
    
    if tinkercademy.ad_keyboard(ADKeys.C, AnalogPin.P0):
       
        
        if setupA == 0 and state == 0:
            pause(100)
            setupA = 1
            OLED.clear()
            menudisplay()
        
        elif setupA == 1 and setupB == 0 and state == 0:
            pause(100)
            setupB = 1
            finalMET = currentspd[i]
            OLED.clear()
            menudisplay()
        elif setupA == 1 and setupB == 1 and state == 0:
            pause(100)
            state = 2
            OLED.clear()
            menudisplay()
            

        elif state == 2:
            pause(100)
            state = 3
            OLED.clear()
            menudisplay()
            

        elif state == 3 or state == 4 or state == 5:
            pause(100)
            state = 0
            OLED.clear()
            menudisplay()
    
    if tinkercademy.ad_keyboard(ADKeys.D, AnalogPin.P0):
        if state == 2:
            control.reset()

    if tinkercademy.ad_keyboard(ADKeys.E, AnalogPin.P0) :
        if state == 2:
            state = 0
            OLED.clear()
            menudisplay()




def menudisplay():
    global state,setupA,weight,currentspd,i,setupB
    if setupA == 0:
        OLED.write_string_new_line("STARTUP MODE")
        OLED.write_string_new_line("")
        OLED.write_string_new_line("Set weight: " + str(weight) + "kg")
        OLED.write_string_new_line("C to confirm")

    if setupA == 1 and setupB == 0:
        OLED.write_string_new_line("STARTUP MODE")
        OLED.write_string_new_line("")
        OLED.write_string_new_line("Set mode: " )
        OLED.write_string_new_line(spd[i])
        OLED.write_string_new_line("C to confirm")

    if setupA == 1 and setupB == 1:
        if state == 0:
            OLED.write_string_new_line("MENU")
            OLED.write_string_new_line("A. Show steps")
            OLED.write_string_new_line("B. Show calories")
            OLED.write_string_new_line("C. Settings")
            
        if state == 1:
            pass
        if state == 2:
            OLED.write_string_new_line("SETTINGS")
            OLED.write_string_new_line("A. Set weight")
            OLED.write_string_new_line("B. Set mode")
            OLED.write_string_new_line("C. Set time")
            OLED.write_string_new_line("D. Reset all")
            OLED.write_string_new_line("E. Back")
        if state == 3:
            OLED.write_string_new_line("time: " + str(time) + "min")
            OLED.write_string_new_line("C to confirm")
        if state == 4:
            OLED.write_string_new_line("weight: " + str(weight) + "kg")
            OLED.write_string_new_line("C to confirm")
        if state == 5:
            OLED.write_string_new_line("mode: " )
            OLED.write_string_new_line(str(spd[i]))
            OLED.write_string_new_line("C to confirm")
            

        
        
def weightensure():
    global weight
    if weight < 0:
        weight = 0
    if weight > 300:
        weight = 300      


def autoTime():
    global time
    for index in range(10000000):
        pause(60000)
        time += 1
    
def onIn_background():
    autoTime()
control.in_background(onIn_background)

menudisplay()
def on_forever():
    
    weightensure()
    keypressed()
    calc()
    
forever(on_forever)


