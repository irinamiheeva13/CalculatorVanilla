//Selectors

const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

// Store

const calcStore = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: false,
    operator: null,
}

// Functions

function inputNumber(number) {
    const {displayValue, secondOperand} = calcStore;

    if (secondOperand === true) {
        calcStore.displayValue = number;
        calcStore.secondOperand = false;
      } else {
        calcStore.displayValue = displayValue === '0' ? number : displayValue + number;
      }

}

function inputDecimal(dot) {

    if (calcStore.secondOperand === true) {
      calcStore.displayValue = '0.';
      calcStore.secondOperand = false;
      return
    }

    if (!calcStore.displayValue.includes(dot)) {
        calcStore.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calcStore;
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null && !isNaN(inputValue)) {
        calcStore.firstOperand = inputValue;
      } else if (operator) {
          const result = calculateResult(firstOperand, inputValue, operator);

          calcStore.displayValue = `${parseFloat(result.toFixed(7))}`;
          calcStore.firstOperand = result;
      }

    calcStore.secondOperand = true;
    calcStore.operator = nextOperator;

}

function calculateResult(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
      } else if (operator === '-') {
        return firstOperand - secondOperand;
      } else if (operator === '*') {
        return firstOperand * secondOperand;
      } else if (operator === '/') {
        return firstOperand / secondOperand;
      }
    
      return secondOperand;
}

function resetCalculator() {
  calcStore.displayValue = '0';
  calcStore.firstOperand = null;
  calcStore.secondOperand = false;
  calcStore.operator = null;
}

function updateDisplay() {
    display.value = calcStore.displayValue;
};

updateDisplay();

keys.addEventListener("click", (e) => {
  const { target } = e;
  const { value } = target;


  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;

    case '.':
      inputDecimal(value);
      break;

    case 'all-clear':
      resetCalculator();
      break;

    default:
      if (Number.isInteger(parseFloat(value))) {
        inputNumber(value);
      }
  }

  updateDisplay();
});