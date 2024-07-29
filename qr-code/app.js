const inputQR = document.getElementById("input-qr");
const imgBox = document.getElementById("imgBox");
const qrImage = document.getElementById("qrImage");


function generateQR(){
    if(inputQR.value.length > 0){
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + inputQR.value;
        imgBox.classList.add("show-img");
    }else{
        inputQR.classList.add("error");
        setTimeout(() => {
            inputQR.classList.remove("error");
        }, 1000);
    }
    
}