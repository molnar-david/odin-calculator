const NUMBERS = "0123456789";
const OPERATORS = "+-x/";
const AUX_KEYS = "=.c";
const ALL_KEYS = NUMBERS + OPERATORS + AUX_KEYS;

let op1, operator, op2;
let currentInput = "";
let displayInput = document.getElementById("display-input");
let displayOutput = document.getElementById("display-output");

let btns = document.querySelectorAll("button");
btns.forEach((btn) => {
    btn.addEventListener("click", display);
});

window.addEventListener("keydown", display);

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

function clear() {
    op1 = operator = op2 = "";
    displayInput.textContent = displayOutput.textContent = "";
    currentInput = "";
}

function isValidInputForEvaluation() {
    return currentInput && currentInput !== "-" && currentInput.slice(-1) !== ".";
}

function display(event) {
    let input;
    switch (event.type) {
        case "keydown":
            switch (event.key) {
                case "Backspace":
                    input = "del";
                    break;
                case "Enter":
                    input = "=";
                    break;
                case "*":
                    input = "x";
                    break;
                default:
                    input = event.key.toLowerCase();
                    break;
            }
            break;
        case "click":
            input = event.target.textContent.toLowerCase();
            break;
        default:
            break;
    }

    if (NUMBERS.includes(input)) {
        if (currentInput.length >= 12) {
            return;
        }
        if (displayInput.textContent.includes("=")) {
            clear();
        }
        currentInput += input;
        displayInput.textContent += input;
    } else if (OPERATORS.includes(input)) {
        // Chain with "="
        if (displayInput.textContent.includes("=")) {
            op1 = displayOutput.textContent;
            op2 = "";
            displayInput.textContent = op1 + " " + input + " ";
            operator = input;
            currentInput = "";
        } else if (isValidInputForEvaluation()) {
            // Chain with "+-x/"
            if (op1 && operator) { 
                op1 = operate(op1, operator, currentInput).toString();
                displayOutput.textContent = +op1;
                displayInput.textContent = op1 + " " + input + " ";
            } else {
                op1 = currentInput;
                displayInput.textContent += " " + input + " ";
            }
            operator = input;
            currentInput = "";
        }
    } else switch (input) {
        case "=":
            if (isValidInputForEvaluation()) {
                if (op1) {
                    op2 = currentInput;
                    displayInput.textContent += " " + input;
                    displayOutput.textContent = operate(op1, operator, op2);
                    op1 = operator = op2 = "";
                } else if (!displayInput.textContent.includes("=")){
                    displayOutput.textContent = +displayInput.textContent;
                    displayInput.textContent += " " + input;
                }
                currentInput = "";
            }
            break;
        case "c":
            clear();
            break;
        case "+/-":
            // "=" was pressed last
            if (displayInput.textContent.includes("=")) {
                displayInput.textContent = -displayOutput.textContent;
                currentInput = displayInput.textContent;
            } else {
                if (!currentInput) {
                    currentInput = "-";
                } else if (currentInput.charAt(0) === "-") {
                    currentInput = currentInput.slice(1);
                } else {
                    currentInput = "-" + currentInput;
                }

                if (operator) {
                    displayInput.textContent = op1 + " " + operator + " " + currentInput;
                } else {
                    displayInput.textContent = currentInput;
                }
            }
            break;
        case ".":
            if (!currentInput.includes(".")) {
                if (displayInput.textContent.includes("=")) {
                    clear();
                }
                currentInput += input;
                displayInput.textContent += input;
            }
            break;
        case "del":
            if (currentInput) {
                currentInput = currentInput.slice(0, -1);
                displayInput.textContent = displayInput.textContent.slice(0, -1);
            }
            break;
        default:
            break;
    }
}
