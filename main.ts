let steps = 0
let cal = 0
let weight = 0
let state = 0
OLED.init(128, 64)
input.onGesture(Gesture.Shake, function on_gesture_shake() {
    
    steps += 1
})
function calc() {
    
}

function keypressed() {
    if (tinkercademy.ADKeyboard(ADKeys.A, AnalogPin.P0)) {
        
        state = 1
        OLED.writeString("steps = " + ("" + steps))
        pause(1000)
        OLED.clear()
        state = 0
    }
    
    if (tinkercademy.ADKeyboard(ADKeys.B, AnalogPin.P0)) {
        
        OLED.writeStringNewLine("calories =" + ("" + cal))
        pause(1000)
        OLED.clear()
        state = 0
    }
    
}

function menudisplay() {
    if (state == 0) {
        OLED.writeString("A. Show steps")
        OLED.writeStringNewLine("B. Show calories")
        OLED.writeStringNewLine("C. Input body weight")
    } else {
        OLED.clear()
    }
    
}

forever(function on_forever() {
    keypressed()
    calc()
})
