const firstDisplay = document.getElementById('displayOperationElement');
const secondDisplay = document.getElementById('displayResult');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalBtn = document.getElementById('equal');
const clearAllOperations = document.getElementById('clearAllElement');
const clearLastElements = document.querySelector('.clearLastElement');


let displayOperation = '';
let input = '';
let result = null;
let lastOperant = '';
let dotElement = false;



numbers.forEach(number => {
    number.addEventListener('click', e => {
        if(e.target.textContent === '.' && !dotElement){
            dotElement = true;
        } else if(e.target.textContent === '.' && dotElement) {
            return;
        }
        input += e.target.textContent; 
        secondDisplay.textContent = input;
    })
});


operators.forEach(operator => {
    operator.addEventListener('click', e => {
        if(!input) return;
        dotElement = false;
        const operant = e.target.textContent;

        if(displayOperation && input && lastOperant) {
            mathOperations();
        } else {
            result = parseFloat(input);
        }
 
        AddAndClearOperations(operant);
        lastOperant = operant;
    })
});


function AddAndClearOperations(operatorSymbol) {
    displayOperation += input + ' ' + operatorSymbol + ' ';
    firstDisplay.textContent = displayOperation;
    secondDisplay.textContent = '';
    input = '';
}


function mathOperations() {
    let firstNumber = parseFloat(result);
    let secondNumber = parseFloat(input);

    switch(lastOperant) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
        case '/':
            result = firstNumber / secondNumber;
            break;
        case '%':
            result = firstNumber % secondNumber; 
            break;
    };
};


equalBtn.addEventListener('click', () => {
    if(!displayOperation || !input) return;
    dotElement = false;
    mathOperations();
    AddAndClearOperations('');
    secondDisplay.textContent = parseFloat(result.toFixed(3));
    result = secondDisplay.textContent;
    input = '';
    displayOperation = '';
});

clearAllOperations.addEventListener('click', e => {
    firstDisplay.textContent = '0';
    secondDisplay.textContent = '0';
    displayOperation = '';
    input = '';
    result = '';
});


clearLastElements.addEventListener('click', e => {
    secondDisplay.textContent = '0'; 
    input = '';
});