const buttons = document.querySelectorAll("button");
const display = document.querySelector("#displayContent");
let displayValue = "";
let firstOperand;
let firstOperator = "";
let secondOperator = "";
let pressedOperator;
let answer;

//calculation functions
const update = function () {
    display.innerText = displayValue;
}

const add = function (num1, num2) {
    return num1 + num2;
}
const subtract = function (num1, num2) {
    return num1 - num2;
}
const multiply = function (num1, num2) {
    return num1 * num2;
}
const divide = function (num1, num2) {
    if (num2 == 0) {
        return "ಠ_ಠ";
    } else {
        return num1 / num2;
    }
}
const percent = function () {

}
const clear = function () {
    action = "";
    displayValue = "0";
    firstOperand = "";
    firstOperator = "";
    secondOperator = "";
}

const roundToTwo = function (value) {
    if (typeof value != "number") { return; }
    if (Math.floor(value) === value) return 0;
    if (value.toString().split(".")[1].length > 2){
        return value.toFixed(2);
    }
}

const operate = function (num1, operator, num2) {
    if (operator === "add") {
        return add(num1, num2);
    } else if (operator === "subtract") {
        return subtract(num1, num2);
    } else if (operator === "multiply") {
        return multiply(num1, num2);
    } else if (operator === "divide") {
        return divide(num1, num2);
    }
}
//
buttons.forEach((button) => {
    button.addEventListener("click", e => {
        const key = e.target;
        let action = key.dataset.action;
        const keyContent = key.innerText;
        //executed if number keys are pressed
        if (!action) {
            if (displayValue === "0" || pressedOperator == true) {
                displayValue = keyContent;
                if (keyContent === ".") {
                    displayValue = "0."
                }
            } else {
                //only allow one decimal per operand
                if (displayValue.toString().includes(".") && keyContent == ".") {
                    return;
                }
                displayValue = displayValue + keyContent;
            }
            pressedOperator = false;
            update();
        } else {
            displayValue = Number(displayValue);
        }
        if (action == "add" ||
            action == "subtract" ||
            action == "multiply" ||
            action == "divide") {
            //assign firstOperator
            if (firstOperator == "") {
                pressedOperator = true;
                firstOperator = action;
                firstOperand = Number(displayValue);
            //assign secondOperator
            } else if (firstOperator != "" && secondOperator == "") {
                pressedOperator = true;
                secondOperator = action;
                displayValue = operate(firstOperand, firstOperator, displayValue);
                update();
                firstOperand = displayValue;
                
            //pass operators through in sequence
            } else if (firstOperator != "" && secondOperator != "") {
                if (pressedOperator) { return;}
                pressedOperator = true;
                firstOperator = secondOperator;
                secondOperator = action;
                displayValue = operate(firstOperand, firstOperator, displayValue);
                update();
            }
        } else if (action == "plusMinus") {
            displayValue = displayValue * -1;
            update();
        } else if (action == "clear") {
            pressedOperator = true;
            clear();
            update();
        } else if (action == "equals") {
            if (pressedOperator) { return;}
            pressedOperator = true;
            displayValue = operate(firstOperand, firstOperator, displayValue);
            firstOperator = ""
            update();
        }
        console.log(`1st operand: ${firstOperand}. 2nd operand: ${displayValue}`);
        console.log(`1st operator: ${firstOperator}. 2nd operator: ${secondOperator}`);
    })
})