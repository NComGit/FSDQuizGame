var btnBegin = document.getElementById("btnBegin");
var btnReset = document.getElementById("btnReset");
var btnSubmit = document.getElementById("btnSubmit");
var btnNext = document.getElementById("btnNext");
var welcomeSection = document.getElementById("welcomeSection");
var topArea = document.getElementById("topArea");
var gameArea = document.getElementById("gameArea");
var bottomArea = document.getElementById("bottomArea");
var NumOfQues = document.getElementById("numOfQuestions");
var selectedAnswer;
var counterQues = 1;
var arrayQues = [];

const setNumOfQues = 5;

window.addEventListener("load", pageLoad);

function pageLoad() {
    // Show only welcome page with game instructions and begin button
    welcomeSection.style.display = "";
    gameArea.style.display = "none";
    bottomArea.style.display = "none";

    NumOfQues.innerText = setNumOfQues;

    btnBegin.addEventListener("click", function () {
        gameStart();
    })
};

function gameStart() {
    welcomeSection.style.display = "none";
    gameArea.style.display = "";
    bottomArea.style.display = "";

    btnNext.disabled = true;

    document.getElementById("questionNumber").innerText = counterQues;

    selectQuestions();

    btnReset.addEventListener("click", function () {
        gameReset();
    });

    // Upon pressing submit, checkAnswer() is ran
    btnSubmit.addEventListener("click", function () {
        checkAnswer();
    });

    // Upon pressing submit, the next button is enabled
    btnSubmit.addEventListener("click", function () {
        btnNext.disabled = false;
    });

    btnNext.addEventListener("click", function () {
        counterQues++;
    });
    btnNext.addEventListener("click", function () {
        nextQuestion();
    });

};

function gameReset() {
    welcomeSection.style.display = "";
    gameArea.style.display = "none";
    bottomArea.style.display = "none";
    document.getElementById("questionNumber").innerText = "";
    counterQues;
}

// Verifies which radio button is checked, in the form
function checkAnswer() {
    let optionList = document.getElementsByName('optionList');

    for (i = 0; i < optionList.length; i++) {
        if (optionList[i].checked) {
            selectedAnswer = optionList[i].value;
        }
    }
    // NEED TO ADD: compare selectedAnswer with answer from object
}

function nextQuestion() {
    document.getElementById("questionNumber").innerText = counterQues;

    // NEED TO ADD: update form optionList with new question / options
    // NEED TO ADD: if final question then end game and show score
}

function selectQuestions() {

    for (let i = 0; i < setNumOfQues; i++) {
        arrayQues[i] = quizQuestions[Math.floor(Math.random() * (quizQuestions.length - 0 + 1)) + 0]
    }

    // NEED TO ADD: Will choose random questions from js_quizQuestions.js
}


