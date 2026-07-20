const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');

let currentInput = '';
let previousInput = '';
let isCalculated = false;

function appendValue(val) {
    if (isCalculated && val !== '+' && val !== '-' && val !== '*' && val !== '/') {
        currentInput = '';
        isCalculated = false;
    } else {
        isCalculated = false;
    }

    if (display.value === '0' && val !== '.') {
        currentInput = '';
    }

    if (val === '+/-') {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) * -1).toString();
            display.value = currentInput;
        }
        return;
    }

    if (val === '%') {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) / 100).toString();
            display.value = currentInput;
        }
        return;
    }

    currentInput += val;
    display.value = currentInput;
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput || '0';
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    display.value = '';
    historyDisplay.innerText = '';
}

function calculate() {
    try {
        if (currentInput !== '') {
            // Safe replace for friendly operators before evaluation
            let expression = currentInput;
            historyDisplay.innerText = expression;
            
            let result = eval(expression);
            
            // Format numbers to match clean view
            if (result.toString().includes('.')) {
                result = parseFloat(result.toFixed(4));
            }
            
            display.value = result;
            currentInput = result.toString();
            isCalculated = true;
        }
    } catch (error) {
        display.value = 'Error';
        currentInput = '';
    }
}

// Keyboard Support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        appendValue(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || '0';
    } else if (key === 'Escape') {
        clearDisplay();
    }
});