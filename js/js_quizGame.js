var btnBegin = document.getElementById("btnBegin");
var btnReset = document.getElementById("btnReset");
var btnSubmit = document.getElementById("btnSubmit");
var btnNext = document.getElementById("btnNext");
var btnFinish = document.getElementById("btnFinish");
var welcomeSection = document.getElementById("welcomeSection");
var gameArea = document.getElementById("gameArea");
var bottomArea = document.getElementById("bottomArea");
var counterQues = 1;
var arrayQues = [];
var indexQues = counterQues - 1
var scoreCounter = 0;

var timer;
var timerSeconds = 15; // Set the timer duration in seconds
var timerRunning = false; // Flag to track if the timer is running

const setNumOfQues = 5;

window.addEventListener("load", pageLoad);

function pageLoad() {
    let NumOfQues = document.getElementById("numOfQuestions");

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
            // counterQues++; // Move to the next question
            checkAnswer();
            btnNext.disabled = false;
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
    let selectedAnswer;
    let correctAnswerPos;
    let selectedOption = null; // add by Xiaoli Feng

    const correctAnswer = arrayQues[indexQues].answer;

    btnSubmit.disabled = true;



    // Assign user selected option to selectedAnswer
    for (i = 0; i < optionList.length; i++) {
        if (optionList[i].checked) {
            selectedAnswer = optionList[i].value;
            selectedOption = optionList[i];
        }

        if (optionList[i].value == correctAnswer) {
            correctAnswerPos = i
        }
    }

    if (selectedAnswer == correctAnswer) {
        scoreCounter++
        highlightSelectedAnswer(selectedOption, 'green'); // Highlight user-selected option in green
    } else {
        highlightSelectedAnswer(selectedOption, 'red'); // Highlight user-selected option in red
        optionList[correctAnswerPos].nextElementSibling.style.color = "green" //Highlights correct answer -NC
    }
};

/**
 * 
 * @param {*} selectedOption 
 * @param {*} color 
 */
function highlightSelectedAnswer(selectedOption, color) {
    if (selectedOption) {
        // selectedOption.parentNode.style.color = color; // Highlight user-selected answer in the specified color (green or red)
        selectedOption.nextElementSibling.style.color = color; // Highlight user-selected option in red

    }
}

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
    clearOptionSelection(); // Clear the selected option
    clearOptionColors(); // Clear option colors for the next question
    showQuestion();
    startTimer(); // Start the timer for the next question
};

/**
 * 
 */
function clearOptionSelection() {
    let optionList = document.getElementsByName('optionList');

    for (let i = 0; i < optionList.length; i++) {
        optionList[i].checked = false; // Uncheck all radio buttons
    }
}
/**
 * 
 */
function clearOptionColors() {
    let optionList = document.getElementsByName('optionList');

    for (let i = 0; i < optionList.length; i++) {
        optionList[i].nextElementSibling.style.color = ''; // Clear the text color for all options
    }
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

    btnSubmit.addEventListener("click", function () {
        checkAnswer();
        clearInterval(timer); // Stop the timer
        btnNext.disabled = false;
        if (counterQues == setNumOfQues) {
            btnFinish.disabled = false;
        }
    });

    btnNext.addEventListener("click", function () {
        counterQues++;
        nextQuestion();
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

function showFinalScorePage() {     //hides previous elements and displays message with final score
    welcomeSection.style.display = "none";
    gameArea.style.display = "none";
    bottomArea.style.display = "none";
    btnFinish.style.display = "none";
    topArea.style.display = "none";
    timerDisplay.style.display = "none";
    document.getElementById("finalScorePage").style.display = "";
    document.getElementById("finalScore").textContent = "You obtained a score of " + scoreCounter + "/5!";
}

btnFinish.addEventListener("click", function () {   
    showFinalScorePage();
});

function startNewGame() {   //same functionality as reset button
    window.location.reload();
}
document.getElementById("btnNewGame").addEventListener("click", function () {
    startNewGame();
});
