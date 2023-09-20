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

var timer;
var timerSeconds = 15; // Set the timer duration in seconds
var timerRunning = false; // Flag to track if the timer is running

const setNumOfQues = 5;

window.addEventListener("load", pageLoad);

function pageLoad() {
    // Show only welcome page with game instructions and begin button
    welcomeSection.style.display = "";
    gameArea.style.display = "none";
    bottomArea.style.display = "none";
    btnFinish.style.display = "none";
    btnFinish.disabled = true;

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

    eventListenerStartUp();

    showQuestion();

    startTimer();

};

function startTimer() {
    // playTimerSound(); // Play the timer sound
    clearInterval(timer); // Clear any previous timers
    var timerDisplay = document.getElementById("timerDisplay");
    timerRunning = true;

    timer = setInterval(function () {
        timerDisplay.innerText = timerSeconds + "s";
        timerSeconds--;

        if (timerSeconds < 0 && timerRunning) {
            // Time's up, automatically move to the next question
            clearInterval(timer);
            timerDisplay.innerText = "";
            timerSeconds = 15; // Reset the timer duration
            timerRunning = false; // Reset the timerRunning flag
            counterQues++; // Move to the next question
            nextQuestion();
        }
    }, 1000);
}

function playTimerSound() {
    var timerSound = document.getElementById("timerSound");
    timerSound.play();
}

function gameReset() {
    window.location.reload();
};

// Verifies which radio button is checked, in the form
function checkAnswer() {
    let optionList = document.getElementsByName('optionList');
    btnSubmit.disabled = true;

    for (i = 0; i < optionList.length; i++) {
        if (optionList[i].checked) {
            selectedAnswer = optionList[i].value;
        }
    }

    // !! executable code to be changed !!
    if (selectedAnswer == arrayQues[indexQues].answer) {
        alert("correct")
    } else alert("incorrect")
    //  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
};

function nextQuestion() {
    clearInterval(timer); // Stop the timer
    btnSubmit.disabled = false;
    timerSeconds = 15; // Reset the timer duration
    if (counterQues == setNumOfQues) {
        btnNext.style.display = "none";
        btnFinish.style.display = ""
    }

    indexQues = counterQues - 1

    btnNext.disabled = true;

    document.getElementById("questionNumber").innerText = counterQues;

    showQuestion();
    startTimer(); // Start the timer for the next question

};

function selectQuestions() {
    let arrayNum = [];

    for (let i = 0; i < quizQuestions.length; i++) {
        arrayNum[i] = i
    }

    shuffle(arrayNum);

    for (let i = 0; i < setNumOfQues; i++) {
        arrayQues[i] = quizQuestions[arrayNum[i]]
    }

};

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
};

function eventListenerStartUp() {
    btnReset.addEventListener("click", function () {
        gameReset();
    });

    // Upon pressing submit, checkAnswer() is ran
    btnSubmit.addEventListener("click", function () {
        checkAnswer();
        clearInterval(timer); // Stop the timer
    });

    // Upon pressing submit, the next button is enabled
    btnSubmit.addEventListener("click", function () {
        btnNext.disabled = false;
    });

    btnSubmit.addEventListener("click", function () {
        if (counterQues == setNumOfQues) {
            btnFinish.disabled = false;
        }
    });

    btnNext.addEventListener("click", function () {
        counterQues++;
    });
    btnNext.addEventListener("click", function () {
        nextQuestion();
        startTimer(); // Start the timer for the next question
    });

    btnFinish.addEventListener("click", function () {
        // add final screen showing final results
    });
}

// Sourced from https://stackoverflow.com/questions/15585216/how-to-randomly-generate-numbers-without-repetition-in-javascript
function shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
