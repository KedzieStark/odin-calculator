const buttons = document.querySelectorAll("button");
const display = document.querySelector("#displayContent");
let displayValue = "";
let lastValue;
let nextValue;
let currentOperator = "";
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

const countDecimals = function (value) {
    if (typeof value != "number") {return;}
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
    }

const operate = function (num1, operator, num2) {
    if (!!num2) {
        return displayValue;
    } else if (operator === "add") {
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
                if (displayValue.includes(".") && keyContent == ".") {
                    return;
                }
                displayValue = displayValue + keyContent;
            }
            pressedOperator = false;
            update();
        } else {
            pressedOperator = true;
        }
        if (action == "add" ||
            action == "subtract" ||
            action == "multiply" ||
            action == "divide") {
            currentOperator = action;
            lastValue = Number(displayValue);
            } else if (action == "plusMinus") {
                displayValue = displayValue * -1;
            } else if (action == "clear") {
                action = "";
                displayValue = "0";
                lastValue = "";
            } else if (action == "equals") {
                displayValue = Number(displayValue);
                answer = operate(lastValue, currentOperator, displayValue);
                if (countDecimals(answer) > 2) {
                    answer = answer.toFixed(2);
                }
                displayValue = answer;
            }
            update();
        })
    })