let numbers = ['CE','C','X','9','8','7','6','5','4','3','2','1','0','+','-','/','*','=']
let calculator = document.querySelector('.container')
let typeArea = document.querySelector('.typeArea')
let arr = []
let copy = []
let str = ''
let index = 1
let finalNum = 0
let click = 0
let methodButtons

for (let i = 0; i < numbers.length; i++) {
    let button = document.createElement('button')
    button.innerHTML = numbers[i]
    button.classList.add('button')
    if (button.innerHTML === '='){
        button.classList.add('method')
        button.classList.add('equal')

    } else if (button.innerHTML === '*' || button.innerHTML === '/' || button.innerHTML === '+' || button.innerHTML === '-') {
        button.classList.add('method')
    
    }else if(button.innerHTML === 'CE'){
        button.classList.add('numClear')

    }else if(button.innerHTML === 'C'){
        button.classList.add('clear')
    }
    else {
        button.classList.add('num')
    }
    calculator.append(button)
}

let buttons = document.querySelectorAll('button')
buttons.forEach(button => {
    button.addEventListener("click", e => {

        let clickedNumber = e.target.innerHTML

        if (e.target.classList.contains('num')){
        
            str += e.target.innerHTML
            
            typeArea.value += clickedNumber


            //deleting if clicked after equal and adding clicked number
            if(arr.length === 1){

                typeArea.value = ''
                typeArea.value = clickedNumber
                arr.length = 0

            }
            
            //Checking if the methoButtons are exist, if true delete disable class 
            if(methodButtons !== undefined){
                methodButtons.forEach(button => {
                    button.classList.remove('disabledMethodButtons')
                })
            
        }


        } else if (e.target.classList.contains('method')){

            //Adding disable class to method buttons, if they already exist after click

            methodButtons = document.querySelectorAll('.method')
            console.log(methodButtons)
            methodButtons.forEach(el => {
                el.classList.add('disabledMethodButtons')
            })
           

            let method = e.target.innerHTML
            typeArea.value += e.target.innerHTML

            //if we dont write if statemant after the equal button we are adding empty str to arr
            //thats why we cant count after equal method

            if(str === ''){
                arr.push(method)
                console.log('if')
            }else{

                arr.push(str, method)
                str = ''
                console.log('else')
            }
            
            
        }if (e.target.classList.contains('equal')){
            
            //removing disabledMethodButtons class 
            methodButtons.forEach(button => {
                button.classList.remove('disabledMethodButtons')
            })

            count(arr)
            arr.length = 0
            firstNum = finalNum[0]
            arr.unshift(finalNum[0])
            
            typeArea.value = finalNum
            console.log(e.target)
            console.log(click++)
        }

        if (e.target.classList.contains('numClear')){

            if (arr.length === 0){
                str = ''
                typeArea.value = ''

            }else if (arr.length === 1){

                typeArea.value = ''
                arr.length = 0
                str = ''
            }
            else{
                console.log(arr.join(''))
                let removed = arr.join('')
                str = ''
                typeArea.value = removed
            }


        }

        if(e.target.classList.contains('clear')){
            if(arr.length !== 0){
                str = ''
                typeArea.value = ''
                arr.length = 0
            
            }else{
                str = ''
                typeArea.value = ''
            }

        }

    })
})


function count(val){
    val.pop()
    let array = val
    copy = array.slice()

    for (let i = 0; i < copy.length; i++){
        if (copy[i] === '*' || copy[i] === '/'){
            let firstNum = +copy[i - 1]
            let secNum = +copy[i + 1]
            finalNum = multiply(copy[i], firstNum, secNum, i)
            i--
        }

    }

    for (let z = 0; z < copy.length; z++){
        if (copy[z] === '-' || copy[z] === '+'){
            let firstNum = +copy[z - 1]
            let secNum = +copy[z + 1]
            finalNum = minusPlus(copy[z], firstNum, secNum, z)
            z--
        }

    }
}


function multiply(method, firstNum, secNum, index){
    let result = 0
    if (method === '/'){
        result = String(firstNum / secNum)
        copy.splice(index - 1, 3, result)
    }else if (method === '*'){
        result = String(firstNum * secNum)
        copy.splice(index - 1, 3, result)
    }
    return copy
}

function minusPlus(method, firstNum, secNum, index){
    let minResult = 0
    if (method === '-'){
        minResult = String(firstNum - secNum)
        copy.splice(index - 1, 3, minResult)
    }else if (method === '+'){
        minResult = String(firstNum + secNum)
        copy.splice(index - 1, 3, minResult)
    }
    return copy
}