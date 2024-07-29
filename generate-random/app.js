const input = document.querySelector("#password");
const copyI = document.querySelector("#copy");
const btn = document.querySelector("#btn");

const lenght = 12;

const upperCase = "ABCDEFGHIJKLMNOPRSQVYZXW";
const lowerCase = "abcdefghijklmnoprsqvyzxw";
const number = "0123456789";
const smybol = "@#$%^&*()_+~|}{[]></-=";

const allChars = upperCase + lowerCase + number + smybol;

runEventListeners()

function runEventListeners(){
    btn.addEventListener("click" , createPassword);
    copyI.addEventListener("click", copyPasword)
}

function createPassword(){
    let password = "";

    password += upperCase[Math.floor(Math.random()* upperCase.length)];
    password += lowerCase[Math.floor(Math.random()* upperCase.length)];
    password += number[Math.floor(Math.random()* upperCase.length)];
    password += smybol[Math.floor(Math.random()* upperCase.length)];

    while(lenght> password.length){
        password += allChars[Math.floor(Math.random() * allChars.length)]
    }

    input.value = password;
}

function copyPasword ( ){
    input.select();
    document.execCommand("copy");
    console.log("Kopyalandi")
}