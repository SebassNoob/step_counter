let steps = 0
let cal = 0
let weight = 50
let state = 0
let setup = 0
let currentspd = ""
let spd = ["slow", "medium", "fast"]
OLED.init(128, 64)
input.onGesture(Gesture.Shake, function on_gesture_shake() {
    
    steps += 1
})
function calc() {
    
    
}

function keypressed() {
    
    if (tinkercademy.ADKeyboard(ADKeys.A, AnalogPin.P0)) {
        if (setup == 0) {
            weight += 1
            OLED.clear()
            menudisplay()
        }
        
        if (setup == 1) {
            
        }
        
        if (setup == 2) {
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
        if (setup == 0) {
            weight -= 1
            OLED.clear()
            menudisplay()
        }
        
        if (setup == 2) {
            OLED.clear()
            state = 1
            OLED.writeString("calories = " + ("" + cal))
            pause(5000)
            OLED.clear()
            state = 0
            menudisplay()
        }
        
    }
    
    if (tinkercademy.ADKeyboard(ADKeys.C, AnalogPin.P0)) {
        if (setup == 0) {
            setup = 1
            OLED.clear()
            menudisplay()
        }
        
        if (setup == 1) {
            setup = 2
            OLED.clear()
            menudisplay()
        }
        
    }
    
}

function menudisplay() {
    
    if (setup == 0) {
        OLED.writeStringNewLine("Set weight:" + ("" + weight) + "kg")
        OLED.writeStringNewLine("Button C to confirm")
    }
    
    if (setup == 1) {
        OLED.writeStringNewLine("Set speed of walk:" + ("" + currentspd) + "kg")
        OLED.writeStringNewLine("Button C to confirm")
    }
    
    if (setup == 2) {
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
