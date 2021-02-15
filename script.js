const display = document.getElementById('display')
const displayHistory = document.getElementById('displayHistory')
const deleteBtn = document.getElementById('delete')
const clearBtn = document.getElementById('clear')
const pointBtn = document.getElementById('point')
const equalsBtn = document.getElementById('equals')
const numbers = document.querySelectorAll('#num')
const operators = document.querySelectorAll('#operator')

let tempOperator = null
let num1 = ''
let num2 = ''
let toReset = false
let partialResult = false
let sum = false

deleteBtn.addEventListener('click', deleteNum)
clearBtn.addEventListener('click', clearDisplay)
pointBtn.addEventListener('click', addPoint)
equalsBtn.addEventListener('click', compute)

numbers.forEach((number) => 
    number.addEventListener('click', () => appendNum(number.textContent))
)

operators.forEach((operator) => 
    operator.addEventListener('click', () => setOperator(operator.textContent))
)

window.addEventListener('keydown', (e) => {
    
    if(e.key >= 0 && e.key <= 9) {
        appendNum(e.key)
    } else if (e.key === '.') {
        addPoint()
    } else if (e.key === '=' || e.key === 'Enter') {
        compute()
    } else if (e.key === 'Backspace') {
        deleteNum()
    } else if (e.key === 'Escape') {
        clearDisplay()
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperator(e.key)
    }
    console.log(e.key)
})

function appendNum(number) {
    if (display.textContent.includes('err')) {
        display.textContent = ''
    }
    if (toReset) {
        clearDisplay()
        toReset = false        
    }
    if (sum) {
        display.textContent = ''
        sum = false
    }
    // if (tempOperator) {
    //     display.textContent = ''
    // }
    display.textContent += number
    
}

function setOperator(operator) {
    
    if (tempOperator === null) {
        num1 = display.textContent
        toReset = false
        displayHistory.textContent = `${num1} `    
        tempOperator = operator
        displayHistory.textContent += `${tempOperator} `
        display.textContent = ''
    } else {
        partialResult = true 
        tempOperator = operator
        compute()        
        tempOperator = operator
        displayHistory.textContent += `${tempOperator} `
    }
}

function clearDisplay() {
    display.textContent = ""
    displayHistory.textContent = ""
    num1 = ''
    num2 = ''
    tempOperator = null
    toReset = false
}

function addPoint() {
    if (display.textContent === '') {
        display.textContent = "0."
    } else if (display.textContent.includes('.')) {
        return
    } else {
        display.textContent += '.'
    }
}

function deleteNum() {
    display.textContent = display.textContent.slice(0,-1)
}

function resetScreen() {
    display.textContent = ''
}

function compute() {
    num1 = parseFloat(num1)
    num2 = parseFloat(display.textContent)
    if (partialResult) {
        displayHistory.textContent += `${num2} `
           
    } else {
        displayHistory.textContent += `${num2} =`
    }
    if (tempOperator === '/' && num2 === 0) {
        display.textContent = 'err'
        displayHistory.textContent = ""
        num1 = ''
        num2 = ''
        tempOperator = null
        toReset = true 
        return
    }
    if (!tempOperator || !num1 || !num2) {
        display.textContent = 'err'
        displayHistory.textContent = ""
        num1 = ''
        num2 = ''
        tempOperator = null
        toReset = true 
        return
    } else {        
        num1 = operate(tempOperator, num1, num2)
        display.textContent = Math.round(num1 * 100000) / 100000
        tempOperator = null
        if (!partialResult) {
            toReset = true
        }     
        partialResult = false
        sum = true  
    }
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(op, a, b) {
    if (op === '+') {
        return add(a,b)
    } else if (op === '-') {
        return subtract(a,b)
    } else if (op === '*') {
        return multiply(a,b)
    } else if (op === '/') {
        return divide(a,b)
    }
}
