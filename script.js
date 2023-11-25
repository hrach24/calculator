let numbers = ['CE','C','/','9','8','7','6','5','4','3','2','1','0','+','-','*','=']
// 'CE','C',,'+','-','/','*','='
let calculator = document.querySelector('.container')
let typeArea = document.querySelector('.typeArea')
let arr = []
let copy = []
let str = ''
let index = 1
let finalNum = 0
let click = 0
let methodButtons
let div = document.querySelector('.divNumbers')
let methodDiv = document.querySelector('.methods')
for (let i = 0; i < numbers.length; i++) {
    
    let button = document.createElement('button')
    
    button.innerHTML = numbers[i]
    button.classList.add('button')
    


    
    if (button.innerHTML === '='){
        button.classList.add('method')
        button.classList.add('equal')

    } else if (button.innerHTML === '*' || button.innerHTML === '/' || button.innerHTML === '+' || button.innerHTML === '-') {
        button.classList.add('method')
    
    }else if (button.innerHTML === '0') {
        button.classList.add('zero')

    }else if(button.innerHTML === 'CE'){
        button.classList.add('numClear')
        button.classList.add('bgcolor')

    }else if(button.innerHTML === 'C'){
        button.classList.add('clear')
        button.classList.add('bgcolor')
    
    }
    else {
        button.classList.add('num')
    }


    if (button.innerHTML === '+' || button.innerHTML === '-' || button.innerHTML === '*' || button.innerHTML === '='){
        methodDiv.append(button)
    
    }else if(button.innerHTML === '0'){
        calculator.append(button)
    }
    
    else{
        div.append(button)
        calculator.append(div)
    }

}

// let buttons = document.querySelectorAll('button')
// buttons.forEach(button => {
//     button.addEventListener("click", e => {

//         let clickedNumber = e.target.innerHTML

//         if (e.target.classList.contains('num')){
        
//             str += e.target.innerHTML
            
//             typeArea.value += clickedNumber


//             //deleting if clicked after equal and adding clicked number
//             if(arr.length === 1 && arr[0] !== '-'){
//                 console.log(arr)
//                 typeArea.value = ''
//                 typeArea.value = clickedNumber
//                 arr.length = 0

//             }
            
//             //Checking if the methoButtons are exist, if true delete disable class 
//             if(methodButtons !== undefined){
//                 methodButtons.forEach(button => {
//                     button.classList.remove('disabledMethodButtons')
//                 })
            
//         }


//         } else if (e.target.classList.contains('method')){

//             //Adding disable class to method buttons, if they already exist after click

//             methodButtons = document.querySelectorAll('.method')
//             console.log(methodButtons)
//             methodButtons.forEach(el => {
//                 el.classList.add('disabledMethodButtons')
//             })
           

//             let method = e.target.innerHTML
//             typeArea.value += e.target.innerHTML

//             //if we dont write if statemant after the equal button we are adding empty str to arr
//             //thats why we cant count after equal method

//             if(str === ''){
//                 arr.push(method)

//             }else{

//                 arr.push(str, method)
//                 str = ''
//             }
            
            
//         }if (e.target.classList.contains('equal')){
            
//             //removing disabledMethodButtons class 
//             methodButtons.forEach(button => {
//                 button.classList.remove('disabledMethodButtons')
//             })

//             count(arr)
//             arr.length = 0
//             firstNum = finalNum[0]
//             arr.unshift(finalNum[0])
            
//             typeArea.value = finalNum
         
//         }

//         if (e.target.classList.contains('numClear')){
//             //Checking if there is any buttons that are disabled
//             if(methodButtons){
//                 methodButtons.forEach(el => {
//                     el.classList.remove('disabledMethodButtons')
//                 })    
//             }

//             if (arr.length === 0){
//                 str = ''
//                 typeArea.value = ''

//             }else if (arr.length === 1){

//                 typeArea.value = ''
//                 arr.length = 0
//                 str = ''
//             }
//             else{
//                 let removed = arr.join('')
//                 str = ''
//                 typeArea.value = removed
//             }


//         }

//         if(e.target.classList.contains('clear')){
//             //Checking if there is any buttons that are disabled
//             if(methodButtons){
//                 methodButtons.forEach(el => {
//                     el.classList.remove('disabledMethodButtons')
//                 })    
//             }
//             if(arr.length !== 0){
//                 str = ''
//                 typeArea.value = ''
//                 arr.length = 0
            
//             }else{
//                 str = ''
//                 typeArea.value = ''
//             }

//         }

//     })
// })


// function count(val){
//     val.pop()
//     let array = val
//     copy = array.slice()

//     for (let i = 0; i < copy.length; i++){
//         if (copy[i] === '*' || copy[i] === '/'){
//             let firstNum = +copy[i - 1]
//             let secNum = +copy[i + 1]
//             finalNum = multiply(copy[i], firstNum, secNum, i)
//             i--
//         }

//     }

//     for (let z = 0; z < copy.length; z++){
//         if (copy[z] === '-' || copy[z] === '+'){
//             let firstNum = +copy[z - 1]
//             let secNum = +copy[z + 1]
//             // console.log(arr)
//             // console.log(firstNum)
//             if(isNaN(firstNum) && copy[0] === '-'){
//                 let c = copy[0] + copy[z + 1]
//                 console.log(copy[0] + copy[z + 1])
//                 copy.splice(0,2, c )
//                 console.log(copy)
               
//             }

//             finalNum = minusPlus(copy[z], firstNum, secNum, z)
//             z--
//         }

//     }
// }


// function multiply(method, firstNum, secNum, index){
//     let result = 0
//     if (method === '/'){
//         result = String(firstNum / secNum)
//         copy.splice(index - 1, 3, result)
//     }else if (method === '*'){
//         result = String(firstNum * secNum)
//         copy.splice(index - 1, 3, result)
//     }
//     return copy
// }

// function minusPlus(method, firstNum, secNum, index){
//     let minResult = 0
//     if (method === '-'){
//         minResult = String(firstNum - secNum)
//         copy.splice(index - 1, 3, minResult)
//         console.log(copy)
//     }else if (method === '+'){
//         minResult = String(firstNum + secNum)
//         copy.splice(index - 1, 3, minResult)
//         console.log(copy)
//     }
//     return copy
// }