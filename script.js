let numbers = ['CE','C','/','9','8','7','6','5','4','3','2','1','0','+','-','*','=']
let calculator = document.querySelector('.container')
let typeArea = document.querySelector('.typeArea')
let inputData = ''
let typeAreaData = []
let copy = []
let finalNum = 0
let methodButtons = [] //Disabled class buttons array
let div = document.querySelector('.divNumbers')
let methodDiv = document.querySelector('.methods')
let methodClickCount = 0

for (let i = 0; i < numbers.length; i++) {
    let button = document.createElement('button')
    button.innerHTML = numbers[i]
    button.classList.add('button')

    if (button.innerHTML === '='){
        button.classList.add('method')
        button.classList.add('equal')

    }else if (button.innerHTML === '*' || button.innerHTML === '/' || button.innerHTML === '+' || button.innerHTML === '-') {
        button.classList.add('method')
    
    }else if (button.innerHTML === '0') {
        button.classList.add('zero')

    }else if (button.innerHTML === 'CE'){
        button.classList.add('numClear')
        button.classList.add('bgColor')

    }else if (button.innerHTML === 'C'){
        button.classList.add('clear')
        button.classList.add('bgColor')
    
    }else {
        button.classList.add('num')

    }if (button.innerHTML === '+' || button.innerHTML === '-' || button.innerHTML === '*' || button.innerHTML === '='){
        methodDiv.append(button)
    
    }else if (button.innerHTML === '0'){
        calculator.append(button)

    }else {
        div.append(button)
        calculator.append(div)

    }
}

let buttons = document.querySelectorAll('button')
buttons.forEach(button => {
    button.addEventListener("click", e => {
        if (e.target.classList.contains('num')){
            count(e.target)

        }else if (e.target.classList.contains('equal')){
            equal(e.target)

        }else if (e.target.classList.contains('method')){
            method(e.target)

        }

        function count(target){
            removeDisableClass()
            typeArea.value = target.innerHTML //adding number to input value
            inputData += target.innerHTML //adding the clicked number to string value

            let removeClickedMethodBgColor = document.querySelector('.clickedMethod')
            if (removeClickedMethodBgColor) {
                removeClickedMethodBgColor.classList.remove('clickedMethod')

            }
        }

        function method(target){
            addDisableClass()
            target.classList.add('clickedMethod') //Setting bgColor to clicked method button
            // methodClickCount++
            typeArea.value += target.innerHTML //adding method to input value
            typeAreaData.push(inputData, target.innerHTML)
            inputData = '' // Making empty to assign a new variable after method button click
            // console.log(typeAreaData)
            // if (methodClickCount > 2 && typeAreaData[typeAreaData.length - 1] === '*'){
            //     // console.log('hey')
            //    methodCount(typeAreaData, target.innerHTML)
            //
            // }else if (methodClickCount > 1 && typeAreaData[typeAreaData.length - 1] === '-'){
            //    countt(typeAreaData, target.innerHTML)
            // }

            if (target.innerHTML === '*' || target.innerHTML === '/'){
                methodClickCount++
                if (methodClickCount > 1){
                    methodCount(typeAreaData, target.innerHTML)
                }

            }

        }

        function equal(target){
            console.log('equal')
        }

        function addDisableClass(){
            methodButtons = document.querySelectorAll('.method')
            methodButtons.forEach(button => {
                button.classList.add('disabledMethodButtons')
            })
        }

        function removeDisableClass(){
            methodButtons = document.querySelectorAll('.method')
            methodButtons.forEach(button => {
                button.classList.remove('disabledMethodButtons')
            })
        }

        function countt(typeAreaData, method){
            let minResult = 0
            let methodIndex = typeAreaData.indexOf(method)
            let firstNum = +typeAreaData[methodIndex - 1]
            let secNum = +typeAreaData[methodIndex + 1]
            finalNum = multiply(method, firstNum, secNum, methodIndex)

            console.log(methodIndex, firstNum, secNum)
            if (method === '-'){
                minResult = String(firstNum - secNum)
                typeAreaData.splice(methodIndex - 1, 3, minResult)
                console.log(typeAreaData)
                typeArea.value = typeAreaData[0]
            }else if (method === '+'){
                minResult = String(firstNum + secNum)
                typeAreaData.splice(index - 1, 3, minResult)
                console.log(typeAreaData)
                typeArea.value = typeAreaData[0]
            }
            return typeAreaData

        }

        function methodCount(typeAreaData, method){
            let methodIndex = typeAreaData.indexOf(method)
            let firstNum = +typeAreaData[methodIndex - 1]
            let secNum = +typeAreaData[methodIndex + 1]
            finalNum = multiply(method, firstNum, secNum, methodIndex)
        }
        //
        // let clickedNumber = e.target.innerHTML
        // if (e.target.classList.contains('num')){
        //     //Removing disable class from method buttons if they have
        //     removeDisableClass()
        //     inputData += e.target.innerHTML
        //     typeArea.value += clickedNumber
        //     //deleting if clicked after equal and adding clicked number
        //     if (typeAreaData.length === 1 && typeAreaData[0] !== '-'){
        //         console.log(typeAreaData)
        //         typeArea.value = ''
        //         typeArea.value = clickedNumber
        //         typeAreaData.length = 0
        //
        //     }
        //
        // }else if (e.target.classList.contains('method')){
        //     console.log('meth')
        //     addDisableClass()
        //     //To not click to method buttons a hundred time, we are adding disable class
        //     typeArea.value += e.target.innerHTML
        //
        //     //After equal button click the inputData is empty, we push the clicked number to typeAreaData
        //     if (inputData === '') {
        //         typeAreaData.push(clickedNumber)
        //
        //     }else {
        //         typeAreaData.push(inputData, clickedNumber)
        //         //inputData is number before the method is clicked
        //         //clickedNumber is the method
        //         inputData = ''
        //         // if we don't make inputData empty we will add new number to added number
        //
        //     }
        //
        // }if (e.target.classList.contains('equal')){
        //     // Removing disable class from method buttons because the equal has the method class name
        //     removeDisableClass()
        //
        //     count(typeAreaData)
        //     typeAreaData.length = 0
        //     firstNum = finalNum[0]
        //     typeAreaData.unshift(finalNum[0])
        //     typeArea.value = finalNum
        //
        // }if (e.target.classList.contains('numClear')){
        //     //Checking if there is any buttons that are disabled
        //     addDisableClass()
        //
        //     if (typeAreaData.length === 0){
        //         inputData = ''
        //         typeArea.value = ''
        //
        //     }else if (typeAreaData.length === 1){
        //         typeArea.value = ''
        //         typeAreaData.length = 0
        //         inputData = ''
        //
        //     }else {
        //         let removed = typeAreaData.join('')
        //         inputData = ''
        //         typeArea.value = removed
        //
        //     }
        //
        // }if (e.target.classList.contains('clear')){
        //     //Removing disabled class from method buttons
        //     removeDisableClass()
        //    if (typeAreaData.length !== 0){
        //         inputData = ''
        //         typeArea.value = ''
        //        typeAreaData.length = 0
        //
        //     }else {
        //         inputData = ''
        //         typeArea.value = ''
        //
        //     }
        // }
    })
})

function multiply(method, firstNum, secNum, index){
    let result = 0

    if (method === '/'){
        result = String(firstNum / secNum)
        typeAreaData.splice(index - 1, 3, result)
        typeArea.value = typeAreaData[typeAreaData.length - 2]
        console.log(typeAreaData)
    }else if (method === '*'){
        result = String(firstNum * secNum)
        typeAreaData.splice(index - 1, 3, result)
        typeArea.value = typeAreaData[typeAreaData.length - 2]
        console.log(typeAreaData)
    }
    return typeAreaData
}
// function count(val){
//     val.pop()
//     copy = val.slice()
//     for (let i = 0; i < copy.length; i++){
//         if (copy[i] === '*' || copy[i] === '/'){
//             let firstNum = +copy[i - 1]
//             let secNum = +copy[i + 1]
//             finalNum = multiply(copy[i], firstNum, secNum, i)
//             i--
//         }
//     }
//
//     for (let z = 0; z < copy.length; z++){
//         if (copy[z] === '-' || copy[z] === '+'){
//             let firstNum = +copy[z - 1]
//             let secNum = +copy[z + 1]
//
//             if (isNaN(firstNum) && copy[0] === '-'){
//                 let c = copy[0] + copy[z + 1]
//                 console.log(copy[0] + copy[z + 1])
//                 copy.splice(0,2, c )
//                 console.log(copy)
//
//             }
//             finalNum = minusPlus(copy[z], firstNum, secNum, z)
//             z--
//         }
//     }
// }



//
// function minusPlus(method, firstNum, secNum, index){
//     let minResult = 0
//     if (method === '-'){
//         minResult = String(firstNum - secNum)
//         copy.splice(index - 1, 3, minResult)
//         console.log(copy)
//
//     }else if (method === '+'){
//         minResult = String(firstNum + secNum)
//         copy.splice(index - 1, 3, minResult)
//         console.log(copy)
//
//     }
//     return copy
// }
// function addDisableClass(){
//     methodButtons = document.querySelectorAll('.method')
//     methodButtons.forEach(el => {
//         el.classList.add('disabledMethodButtons')
//     })
// }
//
// function removeDisableClass(){
//     if (methodButtons !== undefined){
//         methodButtons.forEach(button => {
//             button.classList.remove('disabledMethodButtons')
//         })
//
//     }
// }