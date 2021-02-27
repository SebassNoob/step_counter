// METs x 3.5 x (your body weight in kilograms) / 200 = calories burned per minute.
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
let time = 0
let currentspd = [2.9, 3.4, 7.6, 14.3]
let spd = ["stroll", "walk", "jog", "sprint"]
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
        if (setupA == 0) {
            weight -= 1
            OLED.clear()
            menudisplay()
        }
        
        if (setupB == 0 && setupA == 1) {
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
        
        if (setupA == 1 && setupB == 1) {
            OLED.clear()
            state = 1
            OLED.writeString("steps = " + ("" + steps))
            pause(5000)
            OLED.clear()
            state = 0
            menudisplay()
        }
        
    }
    
    if (tinkercademy.ADKeyboard(ADKeys.B, AnalogPin.P0)) {
        if (setupA == 0) {
            weight += 1
            OLED.clear()
            menudisplay()
        }
        
        if (setupA == 1 && setupB == 0) {
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
        
        if (setupA == 1 && setupB == 1) {
            OLED.clear()
            state = 1
            OLED.writeString("calories per minute = " + ("" + calPerMin))
            pause(5000)
            OLED.clear()
            state = 0
            menudisplay()
        }
        
    }
    
    if (tinkercademy.ADKeyboard(ADKeys.C, AnalogPin.P0)) {
        if (setupA == 0) {
            pause(100)
            setupA = 1
            OLED.clear()
            menudisplay()
        } else if (setupA == 1 && setupB == 0) {
            pause(100)
            setupB = 1
            finalMET = currentspd[i]
            OLED.clear()
            menudisplay()
        }
        
    }
    
    if (tinkercademy.ADKeyboard(ADKeys.E, AnalogPin.P0)) {
        control.reset()
    }
    
}

function menudisplay() {
    
    if (setupA == 0) {
        OLED.writeStringNewLine("Set weight:" + ("" + weight) + "kg")
        OLED.writeStringNewLine("Button C to confirm")
    }
    
    if (setupA == 1 && setupB == 0) {
        OLED.writeStringNewLine("Set speed of walk:")
        OLED.writeStringNewLine(spd[i])
        OLED.writeStringNewLine("Button C to confirm")
    }
    
    if (setupA == 1 && setupB == 1) {
        if (state == 0) {
            OLED.writeStringNewLine("A. Show steps")
            OLED.writeStringNewLine("B. Show calories")
            OLED.writeStringNewLine("C. Input body weight")
        } else if (state == 1) {
            
        }
        
    }
    
}

function weightensure() {
    
    if (weight <= 0) {
        weight = 0
    }
    
    if (weight >= 300) {
        weight = 300
    }
    
}

menudisplay()
forever(function on_forever() {
    weightensure()
    keypressed()
    calc()
})
