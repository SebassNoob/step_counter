// version-1.2, build-11
let steps = 50
let cal = 0
let weight = 50
let state = 0
let setupA = 0
let setupB = 0
let i = 0
let stage = 0
let finalMET = 0
let calPerMin = 0
let time = 0
let distStep = 0
let dist = 0
let aveSpd = 0
let aveSpdfinal = 0
let isStepped = 0
let currentspd = [2.9, 3.4, 5.7, 12.7]
let spd = ["stroll", "walk ", "jog ", "sprint "]
OLED.init(128, 64)
input.onGesture(Gesture.Shake, function on_gesture_shake() {
    
    steps += 1
    isStepped = 1
    pins.digitalWritePin(DigitalPin.P1, 1)
    pause(100)
    pins.digitalWritePin(DigitalPin.P1, 0)
})
function calc() {
    
    calPerMin = finalMET * weight * 3.5 / 200
    cal = calPerMin * (time / 60)
    dist = distStep * steps
    aveSpd = dist / time
}

function mode() {
    
    aveSpdfinal = 3.6 * aveSpd
    if (aveSpdfinal < 4) {
        i = 0
    }
    
    if (aveSpdfinal >= 4 && aveSpdfinal < 7) {
        i = 1
    }
    
    if (aveSpdfinal >= 7 && aveSpdfinal < 10) {
        i = 2
    }
    
    if (aveSpdfinal >= 10) {
        i = 3
    }
    
    finalMET = currentspd[i]
}

function keypressed() {
    
    if (tinkercademy.ADKeyboard(ADKeys.A, AnalogPin.P0)) {
        if (setupA == 0 && state == 0) {
            weight -= 1
            OLED.clear()
            menudisplay()
        }
        
        if (setupB == 0 && setupA == 1 && state == 0) {
            distStep -= 0.1
            if (distStep < 0) {
                distStep = 0
            }
            
            OLED.clear()
            menudisplay()
        }
        
        if (setupA == 1 && setupB == 1 && state == 0) {
            OLED.clear()
            state = 1
            OLED.writeStringNewLine("steps: " + ("" + steps))
            OLED.writeStringNewLine("distance: " + ("" + dist / 1000) + "km")
            pause(5000)
            OLED.clear()
            state = 0
            menudisplay()
        }
        
        if (state == 2) {
            pause(100)
            state = 4
            OLED.clear()
            menudisplay()
        }
        
        if (state == 3) {
            time -= 1
            if (time < 0) {
                time = 0
            }
            
            if (time > 10000000) {
                time = 10000000
            }
            
            OLED.clear()
            menudisplay()
        }
        
        if (state == 4) {
            weight -= 1
            weightensure()
            OLED.clear()
            menudisplay()
        }
        
        if (state == 5) {
            distStep -= 0.1
            if (distStep < 0) {
                distStep = 0
            }
            
            OLED.clear()
            menudisplay()
        }
        
    }
    
    if (tinkercademy.ADKeyboard(ADKeys.B, AnalogPin.P0)) {
        if (setupA == 0 && state == 0) {
            weight += 1
            OLED.clear()
            menudisplay()
        }
        
        if (setupA == 1 && setupB == 0 && state == 0) {
            distStep += 0.1
            if (distStep < 0) {
                distStep = 0
            }
            
            OLED.clear()
            menudisplay()
        }
        
        if (setupA == 1 && setupB == 1 && state == 0) {
            OLED.clear()
            state = 1
            OLED.writeString("calories/min: ")
            OLED.writeStringNewLine("" + calPerMin)
            if (time == 0) {
                OLED.writeStringNewLine("")
                OLED.writeStringNewLine("current time: 0sec")
                OLED.writeStringNewLine("set time in settings")
            }
            
            if (time != 0) {
                OLED.writeStringNewLine("calories: " + ("" + cal))
                OLED.writeStringNewLine("")
                OLED.writeStringNewLine("(current time: " + ("" + time) + "sec)")
                OLED.writeStringNewLine("avg speed: " + ("" + aveSpdfinal) + "km/h")
            }
            
            pause(5000)
            OLED.clear()
            state = 0
            menudisplay()
        }
        
        if (state == 3) {
            time += 1
            if (time < 0) {
                time = 0
            }
            
            if (time > 1000000) {
                time = 1000000
            }
            
            OLED.clear()
            menudisplay()
        }
        
        if (state == 4) {
            weight += 1
            weightensure()
            OLED.clear()
            menudisplay()
        }
        
        if (state == 2) {
            pause(100)
            state = 5
            OLED.clear()
            menudisplay()
        }
        
        if (state == 5) {
            distStep += 0.1
            if (distStep < 0) {
                distStep = 0
            }
            
            OLED.clear()
            menudisplay()
        }
        
    }
    
    if (tinkercademy.ADKeyboard(ADKeys.C, AnalogPin.P0)) {
        if (setupA == 0 && state == 0) {
            pause(100)
            setupA = 1
            OLED.clear()
            menudisplay()
        } else if (setupA == 1 && setupB == 0 && state == 0) {
            pause(100)
            setupB = 1
            OLED.clear()
            menudisplay()
        } else if (setupA == 1 && setupB == 1 && state == 0) {
            pause(100)
            state = 2
            OLED.clear()
            menudisplay()
        } else if (state == 2) {
            pause(100)
            state = 3
            OLED.clear()
            menudisplay()
        } else if (state == 3 || state == 4 || state == 5) {
            pause(100)
            state = 0
            OLED.clear()
            menudisplay()
        }
        
    }
    
    if (tinkercademy.ADKeyboard(ADKeys.D, AnalogPin.P0)) {
        if (state == 2) {
            control.reset()
        }
        
    }
    
    if (tinkercademy.ADKeyboard(ADKeys.E, AnalogPin.P0)) {
        if (state == 2) {
            state = 0
            OLED.clear()
            menudisplay()
        }
        
    }
    
}

function menudisplay() {
    
    if (setupA == 0) {
        OLED.writeStringNewLine("STARTUP MODE")
        OLED.writeStringNewLine("")
        OLED.writeStringNewLine("Set weight: " + ("" + weight) + "kg")
        OLED.writeStringNewLine("C to confirm")
    }
    
    if (setupA == 1 && setupB == 0) {
        OLED.writeStringNewLine("STARTUP MODE")
        OLED.writeStringNewLine("")
        OLED.writeStringNewLine("avg dist/step:" + ("" + distStep) + "m")
        OLED.writeStringNewLine("C to confirm")
    }
    
    if (setupA == 1 && setupB == 1) {
        if (state == 0) {
            OLED.writeStringNewLine("MENU")
            OLED.writeStringNewLine("A. Show steps")
            OLED.writeStringNewLine("B. Show calories")
            OLED.writeStringNewLine("C. Settings")
        }
        
        if (state == 1) {
            
        }
        
        if (state == 2) {
            OLED.writeStringNewLine("SETTINGS")
            OLED.writeStringNewLine("A. Set weight")
            OLED.writeStringNewLine("B. Set avg dist/step")
            OLED.writeStringNewLine("C. Set time")
            OLED.writeStringNewLine("D. Reset all")
            OLED.writeStringNewLine("E. Back")
        }
        
        if (state == 3) {
            OLED.writeStringNewLine("time: " + ("" + time) + "sec")
            OLED.writeStringNewLine("C to confirm")
        }
        
        if (state == 4) {
            OLED.writeStringNewLine("weight: " + ("" + weight) + "kg")
            OLED.writeStringNewLine("C to confirm")
        }
        
        if (state == 5) {
            OLED.writeStringNewLine("avg dist/step:" + ("" + distStep) + "m")
            OLED.writeStringNewLine("C to confirm")
        }
        
    }
    
}

function weightensure() {
    
    if (weight < 0) {
        weight = 0
    }
    
    if (weight > 300) {
        weight = 300
    }
    
}

function autoTime() {
    
    if (isStepped == 0) {
        for (let index = 0; index < 1000000000; index++) {
            pause(1000)
            time += 1
        }
    }
    
}

control.inBackground(function onIn_background() {
    autoTime()
})
menudisplay()
forever(function on_forever() {
    mode()
    weightensure()
    keypressed()
    calc()
})
