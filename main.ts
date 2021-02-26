let steps = 0
let cal = 0
let weight = 0
let state = 0
let setup = 0
OLED.init(128, 64)
input.onGesture(Gesture.Shake, function on_gesture_shake() {
    
    steps += 1
})
function calc() {
    // todo later
    
}

function keypressed() {
    
    if (tinkercademy.ADKeyboard(ADKeys.A, AnalogPin.P0)) {
        OLED.clear()
        state = 1
        OLED.writeString("steps = " + ("" + steps))
        pause(5000)
        OLED.clear()
        state = 0
        menudisplay()
    }
    
    if (tinkercademy.ADKeyboard(ADKeys.B, AnalogPin.P0)) {
        OLED.clear()
        state = 1
        OLED.writeStringNewLine("calories = " + ("" + cal))
        pause(5000)
        OLED.clear()
        state = 0
        menudisplay()
    }
    
}

function menudisplay() {
    
    if (state == 0) {
        OLED.writeStringNewLine("A. Show steps")
        OLED.writeStringNewLine("B. Show calories")
        OLED.writeStringNewLine("C. Input body weight")
    }
    
}

menudisplay()
forever(function on_forever() {
    keypressed()
    calc()
})
