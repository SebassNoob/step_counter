#version-1.2, build-11

steps = 50
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
distStep = 0
dist = 0
aveSpd = 0
aveSpdfinal = 0
isStepped = 0
currentspd = [2.9,3.4,5.7,12.7]
spd = ["stroll","walk ","jog ","sprint "]

OLED.init(128, 64)

def on_gesture_shake():
    global steps,isStepped
    steps += 1
    isStepped = 1
    pins.digital_write_pin(DigitalPin.P1, 1)
    pause(100)
    pins.digital_write_pin(DigitalPin.P1, 0)
input.on_gesture(Gesture.Shake, on_gesture_shake)

def calc():
    global cal,finalMET, calPerMin,time,dist,distStep,steps,aveSpd
    calPerMin = (finalMET*weight*3.5)/200
    cal = calPerMin*(time/60)
    dist = distStep*steps
    aveSpd = dist/time
    
def mode():
    global aveSpd,aveSpdfinal,i,currentspd,finalMET
    aveSpdfinal = 3.6*aveSpd
    if aveSpdfinal < 4:
        i = 0
    if aveSpdfinal >= 4 and aveSpdfinal < 7 :
        i = 1
    if aveSpdfinal >= 7 and aveSpdfinal <10 :
        i = 2
    if aveSpdfinal >= 10:
        i = 3

    finalMET = currentspd[i]

def keypressed():
    global state,weight,setupA,i,setupB,finalMET,cal,calPerMin,time,distStep,aveSpdfinal,aveSpd
    if tinkercademy.ad_keyboard(ADKeys.A, AnalogPin.P0):
        if setupA == 0 and state == 0:
            weight -= 1
            OLED.clear()
            menudisplay()

        if setupB == 0 and setupA == 1 and state == 0:
            distStep -= 0.1
            if distStep < 0:
                distStep = 0
            
            OLED.clear()
            menudisplay()


        if setupA == 1 and setupB == 1 and state == 0:
            OLED.clear()
            state = 1
            OLED.write_string_new_line("steps: " + str(steps))
            OLED.write_string_new_line("distance: " + str(dist/1000) + "km")
            
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
            if time > 10000000:
                time = 10000000
            OLED.clear()
            menudisplay()
            

        if state == 4:
            weight -= 1
            weightensure()
            OLED.clear()
            menudisplay()
            

        if state == 5:
            distStep -= 0.1
            if distStep < 0:
                distStep = 0
            OLED.clear()
            menudisplay()
    
    if tinkercademy.ad_keyboard(ADKeys.B, AnalogPin.P0) :
        if setupA == 0 and state == 0:
            weight += 1
            OLED.clear()
            menudisplay()

        if setupA == 1 and setupB == 0 and state == 0:
            distStep += 0.1
            if distStep < 0:
                distStep = 0
           
            OLED.clear()
            menudisplay()
        if setupA == 1 and setupB == 1 and state == 0:
            OLED.clear()
            state = 1
            OLED.write_string("calories/min: ")
            OLED.write_string_new_line(str(calPerMin))
            if time == 0:
                OLED.write_string_new_line("")
                OLED.write_string_new_line("current time: 0sec")
                OLED.write_string_new_line("set time in settings")
            if time != 0:
                OLED.write_string_new_line("calories: " + str(cal) )
                OLED.write_string_new_line("")
                OLED.write_string_new_line("(current time: " + str(time) + "sec)")
                OLED.write_string_new_line("avg speed: " + str(aveSpdfinal) + "km/h")
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
            distStep += 0.1
            if distStep < 0:
                distStep = 0
           
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
    global state,setupA,weight,currentspd,i,setupB,distStep
    if setupA == 0:
        OLED.write_string_new_line("STARTUP MODE")
        OLED.write_string_new_line("")
        OLED.write_string_new_line("Set weight: " + str(weight) + "kg")
        OLED.write_string_new_line("C to confirm")

    if setupA == 1 and setupB == 0:
        OLED.write_string_new_line("STARTUP MODE")
        OLED.write_string_new_line("")
        OLED.write_string_new_line("avg dist/step:" + str(distStep) + "m" )
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
            OLED.write_string_new_line("B. Set avg dist/step")
            OLED.write_string_new_line("C. Set time")
            OLED.write_string_new_line("D. Reset all")
            OLED.write_string_new_line("E. Back")
        if state == 3:
            OLED.write_string_new_line("time: " + str(time) + "sec")
            OLED.write_string_new_line("C to confirm")
        if state == 4:
            OLED.write_string_new_line("weight: " + str(weight) + "kg")
            OLED.write_string_new_line("C to confirm")
        if state == 5:
            OLED.write_string_new_line("avg dist/step:" + str(distStep) + "m")

            OLED.write_string_new_line("C to confirm")
            

        
        
def weightensure():
    global weight
    if weight < 0:
        weight = 0
    if weight > 300:
        weight = 300      


def autoTime():
    global time
    if isStepped == 0:
        for index in range(1000000000):
            pause(1000)
            time += 1
    
def onIn_background():
    autoTime()
control.in_background(onIn_background)

menudisplay()
def on_forever():
    mode()
    weightensure()
    keypressed()
    calc()
    
forever(on_forever)


