const buttons = document.querySelectorAll('button')
const equation = document.querySelector('.equation')
const solution = document.querySelector('.solution')
const textNotToShow = ['Del', 'clear', 'Delete']
const operator = ['+', '-', '*', '/', '=']
const number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

var operationToDo = []
let a = 0;
let b = 0;


const add = function(a, b){
    return a + b;
}
 

const subtract = function(a, b){
    return a - b;
}


const multiply = function(a, b){
    return a * b;
}


const divide = function(a, b){
    return Math.round(((a / b)* 100)) / 100;
}

const oprate = function(oprator, a, b){
    if (oprator == '+') {
        return add(a, b);
    } else if (oprator == '-') {
        return subtract(a, b);
    } else if (oprator == '*') {
        return multiply(a, b);
    } else if (oprator == '/') {
        return divide(a, b);
    }
}

const operaterNumber = function(operationToDo){
    let length = 0;
    operator.forEach(op => {
        length = operationToDo.filter(x => x === op).length + length
    })
    return length
}

const finda = function(str, op) {
    if (str[0] === '-'){
        let strrp = str.replace('-', '');
        ind = strrp.indexOf(op);
        a = '-' + strrp.slice(0, ind)
        return +a
    } else {
        ind = str.indexOf(op)
        a = str.slice(0, ind)
        return +a
    }
    
}
const findb = function(str, op) {
    if (str[0] === '-'){
        let strrp = str.replace('-', '');
        ind = strrp.indexOf(op);
        b = strrp.slice(ind + 1)
        return +b
    } else {
        ind = str.indexOf(op)
        b = str.slice(ind + 1)
        return +b
    }
}



const checkDisplay = function(text){
    if (textNotToShow.includes(text)) {
        if (text == 'clear' || text == 'Delete'){
            equation.textContent = ''
            solution.textContent = ''
            operationToDo = []
        }
    }else if (operator.includes(text)){
        if (text !== '='  && operaterNumber(operationToDo) < 1){
            operationToDo.push(equation.textContent.replace(/(\r\n|\n|\r)/gm, "").replace(/ /g, ""))
            operationToDo.push(text)
            equation.append(text)
        }else if (text !== '='  && operaterNumber(operationToDo) >= 1){
            operationToDo[0] = equation.textContent.replace(/(\r\n|\n|\r)/gm, "").replace(/ /g, "")
            a = finda(operationToDo[0], operationToDo[1])
            b = findb(operationToDo[0], operationToDo[1])
            let result = oprate(operationToDo[1], a, b);
            solution.textContent = result
            equation.textContent = result
            equation.insertAdjacentText('beforeend', text)
            operationToDo[1] = text

        }else if (text === '=' && operaterNumber(operationToDo) >= 1){
            operationToDo[0] = equation.textContent.replace(/(\r\n|\n|\r)/gm, "").replace(/ /g, "")
            a = finda(operationToDo[0], operationToDo[1])
            b = findb(operationToDo[0], operationToDo[1])
            let result = oprate(operationToDo[1], a, b);
            solution.textContent = result
            equation.textContent = `${a}${operationToDo[1]}${b}`
            operationToDo = [`${a}${operationToDo[1]}${b}`, `${operationToDo[1]}`]
        }
    }else if (number.includes(text)) {
        equation.insertAdjacentText('beforeend', text)
    }

}
buttons.forEach(button => {
    button.addEventListener('click', e => {
        checkDisplay(e.target.textContent)
    })
})

window.addEventListener('keydown', e => checkDisplay(e.key))