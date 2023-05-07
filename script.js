let operand1, operator, operand2;
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

function operate(operand1, operator, operand2) {
    switch (operator) {
        case "+":
            return add(+operand1, +operand2);
            break;
        case "-":
            return subtract(+operand1, +operand2);
            break;
        case "*":
            return multiply(+operand1, +operand2);
            break;
        case "/":
            return divide(+operand1, +operand2);
            break;
        default:
            return;
    }
}

function display(event) {
    displayInput.textContent += event.target.textContent;
}

// operand1 = prompt("Enter operand1:");
// operator = prompt("Enter operator:");
// operand2 = prompt("Enter operand2:");
console.log(operate(operand1, operator, operand2));
