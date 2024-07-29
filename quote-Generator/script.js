const quote = document.getElementById("quote");
const author = document.getElementById("author");
const apiUrl = "https://api.quotable.io/random";
const btn = document.querySelector("#getquote");
const btnTweet = document.querySelector("#tweet");


runEventListeners()

function runEventListeners() {
  
    btnTweet.addEventListener("click" , tweet)
}

async function getquote(url){
    const response = await fetch(url);
    const data = await response.json();
    quote.innerHTML = data.content;
    author.innerHTML = data.author;
}

getquote(apiUrl)

function tweet (){
    window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML + " --- by " + author.innerHTML, "Tweet Window", "width=600, height=300")
}