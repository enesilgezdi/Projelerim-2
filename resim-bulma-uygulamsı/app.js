const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const input = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchBtn = document.querySelector("#searchBtn");
const clearBtn = document.querySelector("#clearBtn");
const images = document.querySelector(".imagelist-wrapper");

runEventListeners();

function runEventListeners (){
    form.addEventListener("submit", search);
    clearBtn.addEventListener("click" , cleartoUI)
}

function cleartoUI(){   
    images.remove();
    input.value = "";
}

function search(e){
    
    const value = input.value.trim();
    // @RequestParam - Spring-Rest APİ
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers : {
            Authorization : "Client-ID FLLDOi0r9-Dd7ObV0Bg2fj-wdWwuaFbBzz0pUZWwSkk"
        }
    })
    .then((res)=> res.json())
    .then((data)=> {
        Array.from(data.results).forEach((image)=>{
            // console.log(image.urls.small)
            addToImageUI(image.urls.small);
        })
    })
    .catch((err) =>console.log(err))

    e.preventDefault();
}

function addToImageUI(url){
    const div = document.createElement("div")
    div.className ="card"

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.width="400";
    img.height="400";
    
    div.appendChild(img)
    images.appendChild(div);
}