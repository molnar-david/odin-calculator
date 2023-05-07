const NUMBERS = "0123456789";
const OPERATORS = "+-x/";

let op1, operator, op2;
let currentInput = "";
let displayInput = document.getElementById("display-input");
let displayOutput = document.getElementById("display-output");

let btns = document.querySelectorAll("button");
btns.forEach((btn) => {
    btn.addEventListener("click", display);
});

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(op1, operator, op2) {
    switch (operator) {
        case "+":
            return add(+op1, +op2);
            break;
        case "-":
            return subtract(+op1, +op2);
            break;
        case "x":
            return multiply(+op1, +op2);
            break;
        case "/":
            return divide(+op1, +op2);
            break;
        default:
            return;
    }
}

function display(event) {
    let input = event.target.textContent;
    if (NUMBERS.includes(input)) {
        if (op2) {
            op1 = operator = op2 = "";
            displayInput.textContent = displayOutput.textContent = "";
        }
        currentInput += input;
        displayInput.textContent += input;
    } else if (OPERATORS.includes(input)) {
        if (op2) {                          // Chain with "="
            op1 = displayOutput.textContent;
            op2 = "";
            displayInput.textContent = op1 + input;
        } else if (currentInput) {          // Chain with "+-x/"
            if (op1) { 
                op1 = operate(op1, operator, currentInput);
                displayOutput.textContent = op1;
                displayInput.textContent = op1 + input;
            } else {
                op1 = currentInput;
                displayInput.textContent += input;
            }
        }
        operator = input;
        currentInput = "";
    } else switch (input) {
        case "=":
            if (op1 && operator && currentInput) {
                op2 = currentInput;
                displayInput.textContent += input;
                displayOutput.textContent = operate(op1, operator, op2);
                currentInput = "";
            }
            break;
    }
}
