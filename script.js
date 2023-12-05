let numbers = ['CE','C','/','9','8','7','6','5','4','3','2','1','0','+','-','*','='];
let calculator = document.querySelector('.container');
let typeArea = document.querySelector('.typeArea');
let inputData = '';
let typeAreaData = [];
let clickedMethodArray = [];
let methodButtons = []; //Disabled class buttons array
let div = document.querySelector('.divNumbers');
let methodDiv = document.querySelector('.methods');
let methodClickCount = 0;
let numClickCount = 0;

for (let i = 0; i < numbers.length; i++) {
    let button = document.createElement('button');
    button.innerHTML = numbers[i];
    button.classList.add('button');

    if (button.innerHTML === '=') {
        button.classList.add('method');
        button.classList.add('equal');

    }else if (button.innerHTML === '*' || button.innerHTML === '/' || button.innerHTML === '+' || button.innerHTML === '-') {
        button.classList.add('method');
    
    }else if (button.innerHTML === '0') {
        button.classList.add('num');
        button.classList.add('zero');

    }else if (button.innerHTML === 'CE') {
        button.classList.add('numClear');
        button.classList.add('bgColor');

    }else if (button.innerHTML === 'C') {
        button.classList.add('clear');
        button.classList.add('bgColor');
    
    }else {
        button.classList.add('num');

    }
    if (button.innerHTML === '+' || button.innerHTML === '-' || button.innerHTML === '*' || button.innerHTML === '=') {
        methodDiv.append(button);
    
    }else if (button.innerHTML === '0') {
        calculator.append(button);

    }else {
        div.append(button);
        calculator.append(div);

    }
}

let buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    addDisableClass();
    button.addEventListener("click", e => {
        if (e.target.classList.contains('num')) {
            count(e.target);

        }else if (e.target.classList.contains('equal')) {
            equal(e.target);

        }else if (e.target.classList.contains('method')) {
            method(e.target);

        }else if(e.target.classList.contains('clear')) {
            clear();

        }else if (e.target.classList.contains('numClear')) {
            numClear();

        }

        function count(target){
            //when typeAreaData.length === 1, means it clicked to equal button, so we show new clicked number after equal button click
            if (typeAreaData.length === 1) {
                typeArea.value = '';
                typeArea.value = target.innerHTML;
                typeAreaData.length = 0;

            }
            removeDisableClass();
            inputData += target.innerHTML; //adding the clicked number to string value
            typeArea.value = inputData; //adding number to input value
            let removeClickedMethodBgColor = document.querySelector('.clickedMethod');
            if (removeClickedMethodBgColor) {
                removeClickedMethodBgColor.classList.remove('clickedMethod');

            }
        }

        function method(target){
            let button = document.querySelector('.clickedMethod');
            target.classList.add('clickedMethod'); //Setting bgColor to clicked method button
            if (inputData !== '') { //pushing the clicked method button to typedArrData with the clicked number
                typeAreaData.push(inputData, target.innerHTML);

            }else { //rewriting every time when it's clicked on another method button
                typeAreaData.pop();
                typeAreaData.push(target.innerHTML);
                if (button) { // checking if there is any method button click after and deleting its class
                    button.classList.remove('clickedMethod');

                }
            }
            inputData = ''; // Making empty to assign a new variable after method button click
            if (typeAreaData[5] === '*' || typeAreaData[5] === '/' && typeAreaData.length === 6) {
                multiply(typeAreaData, e.target.innerHTML);

            }else if (typeAreaData[5] === '+' || typeAreaData[5] === '-' && typeAreaData.length === 6) {
                countMathExpression(typeAreaData);

            }else if (typeAreaData[3] === '+' || typeAreaData[3] === '-' && typeAreaData.length === 4) {
                countMathExpression(typeAreaData);

            }
        }

        function equal(target){
            removeDisableClass();
            if (inputData !== '') { //we do this because when the inputData is empty it will add ' ' to typeAreaDate
                typeAreaData.push(inputData);
                countMathExpression(typeAreaData);

            }
        }

        function countMathExpression(typeAreaData){
            for (let i = 0; i < typeAreaData.length; i++) {
                if (typeAreaData[i] === '*' || typeAreaData[i] === '/') {
                    let method = typeAreaData[i];
                    let firstNum = +typeAreaData[i - 1];
                    let secNum = +typeAreaData[i + 1];

                    if (method === '*') {
                        let res = firstNum * secNum;
                        typeAreaData.splice(i - 1, 3, String(res));
                        methodClickCount--;

                    }else if (method === '/'){
                        let res = firstNum / secNum;
                        typeAreaData.splice(i - 1, 3, String(res));
                        methodClickCount--;
                        typeArea.value = res;

                    }
                }
            }

            for (let z = 0; z < typeAreaData.length; z++){
                if (typeAreaData[z] === '+' || typeAreaData[z] === '-'){
                    let method = typeAreaData[z];
                    let firstNum = +typeAreaData[z - 1];
                    let secNum = +typeAreaData[z + 1];

                    if (method === '+') {
                        let res = firstNum + secNum;
                        typeAreaData.splice(z - 1, 3, String(res));
                        typeArea.value = res;
                        numClickCount--;

                    }else if (method === '-') {
                        let res = firstNum - secNum;
                        typeAreaData.splice(z - 1, 3, String(res));
                        typeArea.value = res;
                        numClickCount--;

                    }
                }
            }
        }
    })
})

function multiply(typeAreaData) {
    let res = 0;
    let method = typeAreaData.find(element => element === '*' || element === '/');
    let methodIndex = typeAreaData.indexOf(method);
    let firstNum = +typeAreaData[methodIndex - 1];
    let secNum = +typeAreaData[methodIndex + 1];

    if (method === '*') {
        res = String(firstNum * secNum);
        typeAreaData.splice(methodIndex - 1, 3, res);
        methodClickCount--;
        typeArea.value = res;

    }else if (method === '/') {
        res = String(firstNum / secNum);
        typeAreaData.splice(methodIndex - 1, 3, res);
        methodClickCount--;
        typeArea.value = res;

    }
    return typeAreaData
}

//adding if statement because numClear function duty is to clear the number after the method, but when we click to equal button
//we are adding the last final result to typedArrData, so the typedArrData has just on element, and after equal button if we click
// to CE button it will find the las element and with that 0 index it will take the + button from methodButtons because the +
//button is the 0 index in that array

function numClear(){
    if (typeAreaData.length === 2) {
        inputData = '';
        typeArea.value = 0;
        let lastClickedMethodIndex = typeAreaData.length - 1;
        let lastClickedMethodInnerHTML = methodButtons[lastClickedMethodIndex].innerHTML;
        let arrFromListedElement = Array.from(methodButtons);
        let lastClickedMethod = arrFromListedElement.find(el => el.innerHTML === lastClickedMethodInnerHTML);
        lastClickedMethod.classList.add('clickedMethod');

    }
}

function clear(){
    addDisableClass();
    let removeClickedMethodBgColor = document.querySelector('.clickedMethod');
    if (removeClickedMethodBgColor) {
        removeClickedMethodBgColor.classList.remove('clickedMethod');

    }
    inputData = '';
    typeArea.value = 0;
    methodClickCount = 0;
    numClickCount = 0;
    typeAreaData.length = 0;
}

function addDisableClass(){
    methodButtons = document.querySelectorAll('.method');
    methodButtons.forEach(button => {
        button.classList.add('disabledMethodButtons');
    })
}

function removeDisableClass(){
    methodButtons = document.querySelectorAll('.method');
    methodButtons.forEach(button => {
        button.classList.remove('disabledMethodButtons');
    })
}