const questions  = [
    {
        question: "Türkiyenin başkenti neresidir?",
        answers:[
            {text: "Ankara" , correct: true },
            {text: "İstanbul" , correct: false },
            {text: "Eskişehir" , correct: false },
            {text: "Adana" , correct: false }
        ]
        
    },
    {
        question: "Atatürk'ün doğum tarihi kaç yilidir?",
        answers:[
            {text: "1889" , correct: false },
            {text: "1887" , correct: false },
            {text: "1881" , correct: true },
            {text: "1899" , correct: false }
        ]
        
    },
    {
        question: "Fenerbahçe kaç yilinda kurulmuştur?",
        answers:[
            {text: "1901" , correct: false },
            {text: "1907" , correct: true },
            {text: "1905" , correct: false },
            {text: "1903" , correct: false }
        ]
        
    },
    {
        question: "Türkiyenin kaç tane bölgesi vardir?",
        answers:[
            {text: "5" , correct: false },
            {text: "8" , correct: false },
            {text: "2" , correct: false },
            {text: "7" , correct: true }
        ]
        
    },
];

const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector(".answer-buttons");
const nextBtn = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz (){
    currentQuestionIndex = 0
    score= 0
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click" , selectAnswer)
    })
}

function resetState(){
    nextBtn.style.display = "none";
    while ( answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer (e ){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach((button) =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextBtn.style.display = "block";
}

function showScore ( ){
    resetState();
    questionElement.innerHTML = ` you scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play again";
    nextBtn.style.display = "block"
}

function handleNextButton () {
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();

    }else{
        showScore();
    }

}

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();