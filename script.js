const passwordInputEl = document.querySelector('.password-generator__password-field')
const copyBtn = document.querySelector('.password-generator__copy-btn')
const strengthIndicatorEl = document.querySelector('.password-generator__strength-indicator')
const lengthCounterEl = document.querySelector('.password-generator__length-bar__counter')
const lengthInputEl = document.querySelector('.password-generator__length-bar')
const optionsEls = document.querySelectorAll('.options-list__option')
const generateBtnEl = document.querySelector('.btn--generate')
const popupListEl = document.querySelector('.popup-list')

const characters = { // объект символов ключи в котором совпадают с id отдельных опций
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

function generatePassword() {
    let simplePassword =""
    let passwordLength = lengthInputEl.value // длина пароля равна выбранной длине пароля 0_о

    optionsEls.forEach(option => {
        if(option.checked){
            simplePassword += characters[option.id] // сохраняем простое значение из свойства объекта, например "abcdefghijklmnopqrstuvwxyz0123456789" где еще нет никакого рандома и по сути это просто объединенная строка, а строка в свою очередь это массив букв...
        }
    })

    let randomPassword = "" // переменная под рандомный пароль

    for (let index = 0; index < passwordLength; index++) { // пока индекс меньше выбранной длины пароля
        let randomChar = simplePassword[Math.floor(Math.random() * simplePassword.length)] // получаем случайный на каждой итерации символ из выбранных значений свойств объекта путем умножения рандомного числа на длину этого самого свойства, что не даст выйти этому индексу за пределы длины свойства, что в свою очередь исключит undefined. 
        // длина свойства зависит от выбранных опций которые объединяются в единую строку, которая представляет собой массив символов к каждому из которых можно обратиться, что и происходит с помощью Math.random которая даёт каждый вызов случайное число === индекс по которому происходит доступ к символу

        randomPassword += randomChar // заполняем переменную рандомными символами
    }    

    passwordInputEl.value = randomPassword // устанавливаем "output" value 
}

function updateStrengthIndicator(){
    strengthIndicatorEl.id = lengthInputEl.value < 8 ? 'week' : lengthInputEl.value < 16 ? 'medium': 'strong' // если выбранная длина пароля меньше или равна x, то значение id = y, что триггерит определенные стили
}

function updateLengthCounter(){
    lengthCounterEl.textContent = lengthInputEl.value // значение "счетчика" длины === значение длины пароля
    generatePassword() // запускаем функцию создания пароля каждый раз когда двигается ползунок тем самым динамически создавая пароль прямо на глазах
    updateStrengthIndicator() // вместе с изменением длины пароля изменяется и индикатор силы пароля
}

function copyPassword(){
    navigator.clipboard.writeText(passwordInputEl.value)
    if(passwordInputEl.value != ''){
        showPopup()  // функция создающая popup о том что пароль скопирован...
    }
}

function showPopup(){
    let popupEl = document.createElement('div')

    popupEl.classList.add('copied-popup', 'bounceInUp')

    popupEl.innerHTML = `
        <i class="fa-regular fa-circle-check fa-lg"></i>
        <p>Copied to clipboard!</p>
    `

    popupListEl.append(popupEl)

    setTimeout(() => {
        hidePopup(popupEl)
    }, 3000);
}

function hidePopup(element){
    element.classList.add('bounceOutDown')
}

copyBtn.addEventListener('click', copyPassword)
lengthInputEl.addEventListener('input', updateLengthCounter)
generateBtnEl.addEventListener('click', generatePassword)