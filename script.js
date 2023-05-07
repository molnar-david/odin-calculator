let operand1, operator, operand2;

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

// operand1 = prompt("Enter operand1:");
// operator = prompt("Enter operator:");
// operand2 = prompt("Enter operand2:");
console.log(operate(operand1, operator, operand2));
