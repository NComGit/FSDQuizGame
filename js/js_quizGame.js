var btnBegin = document.getElementById("btnBegin");
var btnReset = document.getElementById("btnReset");
var btnSubmit = document.getElementById("btnSubmit");
var btnNext = document.getElementById("btnNext");
var btnFinish = document.getElementById("btnFinish");
var welcomeSection = document.getElementById("welcomeSection");
var topArea = document.getElementById("topArea");
var gameArea = document.getElementById("gameArea");
var bottomArea = document.getElementById("bottomArea");
var NumOfQues = document.getElementById("numOfQuestions");
var selectedAnswer;
var counterQues = 1;
var arrayQues = [];
var indexQues = counterQues - 1

const setNumOfQues = 5;

window.addEventListener("load", pageLoad);

function pageLoad() {
    // Show only welcome page with game instructions and begin button
    welcomeSection.style.display = "";
    gameArea.style.display = "none";
    bottomArea.style.display = "none";
    btnFinish.style.display = "none";

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

    showQuestion();

};

function gameReset() {
    //below code causes increment value to increase with every reset - unsure why
    // welcomeSection.style.display = "";
    // gameArea.style.display = "none";
    // bottomArea.style.display = "none";
    // document.getElementById("questionNumber").innerText = "";
    // counterQues = 1;
    window.location.reload();
}

// Verifies which radio button is checked, in the form
function checkAnswer() {
    let optionList = document.getElementsByName('optionList');
    btnSubmit.disabled = true;

    for (i = 0; i < optionList.length; i++) {
        if (optionList[i].checked) {
            selectedAnswer = optionList[i].value;
        }
    }
    // NEED TO ADD: compare selectedAnswer with answer from object
}

function nextQuestion() {
    btnSubmit.disabled = false;

    if (counterQues == setNumOfQues) {
        btnNext.style.display = "none";
        btnFinish.style.display = ""
    }

    indexQues = counterQues - 1

    btnNext.disabled = true;

    document.getElementById("questionNumber").innerText = counterQues;

    showQuestion();

}

function selectQuestions() {
    let arrayNum = [];

    for (let i = 0; i < quizQuestions.length; i++) {
        arrayNum[i] = i
    }

    shuffle(arrayNum);

    for (let i = 0; i < setNumOfQues; i++) {
        arrayQues[i] = quizQuestions[arrayNum[i]]
    }

}

function showQuestion() {
    document.getElementById("question").innerHTML = arrayQues[indexQues].question;

    document.getElementById("option1").value = arrayQues[indexQues].options[0];
    document.getElementById("option2").value = arrayQues[indexQues].options[1];
    document.getElementById("option3").value = arrayQues[indexQues].options[2];
    document.getElementById("option4").value = arrayQues[indexQues].options[3];

    document.getElementById("labelOption1").innerHTML = arrayQues[indexQues].options[0];
    document.getElementById("labelOption2").innerHTML = arrayQues[indexQues].options[1];
    document.getElementById("labelOption3").innerHTML = arrayQues[indexQues].options[2];
    document.getElementById("labelOption4").innerHTML = arrayQues[indexQues].options[3];
}

// Sourced from https://stackoverflow.com/questions/15585216/how-to-randomly-generate-numbers-without-repetition-in-javascript
function shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};