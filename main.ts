// testversion-8, build-2
let steps = 0
let cal = 0
let weight = 50
let state = 0
let setupA = 0
let setupB = 0
let i = 0
let stage = 0
let finalMET = 0
let calPerMin = 0
let time = 60
let currentspd = [2.9, 3.4, 5.7, 12.7]
let spd = ["stroll (<4km/h)", "walk (4-7km/h)", "jog (7-10km/h)", "sprint (>10km/h)"]
OLED.init(128, 64)
input.onGesture(Gesture.Shake, function on_gesture_shake() {
    
    steps += 1
})
function calc() {
    
    calPerMin = finalMET * weight * 3.5 / 200
    cal = calPerMin * time
}

function keypressed() {
    
    if (tinkercademy.ADKeyboard(ADKeys.A, AnalogPin.P0)) {
        if (setupA == 0 && state == 0) {
            weight -= 1
            OLED.clear()
            menudisplay()
        }
        
        if (setupB == 0 && setupA == 1 && state == 0) {
            i -= 1
            if (i < 0) {
                i = 0
            }
            
            if (i > 3) {
                i = 3
            }
            
            OLED.clear()
            menudisplay()
        }
        
        if (setupA == 1 && setupB == 1 && state == 0) {
            OLED.clear()
            state = 1
            OLED.writeString("steps = " + ("" + steps))
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
            
            if (time > 1000000) {
                time = 1000000
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
            i -= 1
            if (i < 0) {
                i = 0
            }
            
            if (i > 3) {
                i = 3
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
            i += 1
            if (i < 0) {
                i = 0
            }
            
            if (i > 3) {
                i = 3
            }
            
            OLED.clear()
            menudisplay()
        }
        
        if (setupA == 1 && setupB == 1 && state == 0) {
            OLED.clear()
            state = 1
            OLED.writeString("calories/min = ")
            OLED.writeStringNewLine("" + calPerMin)
            if (time == 0) {
                OLED.writeStringNewLine("input time in settings to show calorie count")
            }
            
            if (time != 0) {
                OLED.writeStringNewLine("calories = " + ("" + cal))
                OLED.writeStringNewLine("(time = " + ("" + time) + "min)")
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
            i += 1
            if (i < 0) {
                i = 0
            }
            
            if (i > 3) {
                i = 3
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
            finalMET = currentspd[i]
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
        OLED.writeStringNewLine("Set weight:" + ("" + weight) + "kg")
        OLED.writeStringNewLine("Button C to confirm")
    }
    
    if (setupA == 1 && setupB == 0) {
        OLED.writeStringNewLine("Set mode:")
        OLED.writeStringNewLine(spd[i])
        OLED.writeStringNewLine("C to confirm")
    }
    
    if (setupA == 1 && setupB == 1) {
        if (state == 0) {
            OLED.writeStringNewLine("A. Show steps")
            OLED.writeStringNewLine("B. Show calories")
            OLED.writeStringNewLine("C. Settings")
        }
        
        if (state == 1) {
            
        }
        
        if (state == 2) {
            OLED.writeStringNewLine("A. Set weight")
            OLED.writeStringNewLine("B. Set mode")
            OLED.writeStringNewLine("C. Set time")
            OLED.writeStringNewLine("D. Reset all")
            OLED.writeStringNewLine("E. Back")
        }
        
        if (state == 3) {
            OLED.writeStringNewLine("time = " + ("" + time) + "min")
            OLED.writeStringNewLine("C to confirm")
        }
        
        if (state == 4) {
            OLED.writeStringNewLine("weight = " + ("" + weight) + "kg")
            OLED.writeStringNewLine("C to confirm")
        }
        
        if (state == 5) {
            OLED.writeStringNewLine("mode = " + ("" + spd[i]))
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

menudisplay()
forever(function on_forever() {
    weightensure()
    keypressed()
    calc()
})
