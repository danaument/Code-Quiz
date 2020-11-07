//DOM pointers
var timerSpanEl = document.querySelector("#timerSpan");
var containerEl = document.querySelector("#container");
var jsQuizBtnEl = document.querySelector("#jsQuizStartBtn");
var correctAnswerBtnEl = document.querySelector("#correctAnswerBtn");
var wrongAnswerBtnEl = document.querySelector("#wrongAnswerBtn");
var resetButton = document.querySelector("#resetButton");

//quiz data
var quizBank = {
    Javascript : [
        {   question: "this is question number 1.",
            answers: [
                {answerText: "false answer 1",
                answerVeracity: false}, 
                {answerText: "false answer 2",
                answerVeracity: false},
                {answerText: "false answer 3",
                answerVeracity: false},
                {answerText: "true answer 1",
                answerVeracity: true},
            ],
        },
        {   question: "this is question number 2.",
            answers: [
                {answerText: "false answer 1",
                answerVeracity: false}, 
                {answerText: "false answer 2",
                answerVeracity: false},
                {answerText: "false answer 3",
                answerVeracity: false},
                {answerText: "true answer 1",
                answerVeracity: true},
            ],
        }
    ],
};


//load initial values
function init() {
    if (sessionStorage.getItem("timeLeft") === null) {
        resetTimer();
    }
    if (sessionStorage.getItem("currentPage") === null) {
        sessionStorage.setItem("currentPage", "welcomePage")
    }
    console.log(sessionStorage.getItem("currentPage"));
};

//reusable function to take an integer and give a shuffled array of all values less than the input, including zero
function indexShuffler(input) {
    input = parseInt(input);
    if (Number.isInteger(input) === false) {
        console.log("Index shuffler function failed.  The input was " + input);
    }
    else {
        var sourceValues = [];
        for (i = 0; i < input; i++) {
            sourceValues.push(i);
        } 
        console.log("The input was " + input + "and the source values generated were" + sourceValues + ".");
    }
       // destructively pull out values from sourceValues at random
    var shuffledValues = [];
    while (sourceValues.length > 0) {
        var pickAValue = Math.floor(Math.random() * sourceValues.length);
        var yankedValue = sourceValues.splice(pickAValue, 1);
        shuffledValues.push(yankedValue);
    }
    return shuffledValues;
};

function renderWelcomePage() {
    // containerEl.innerHTML = "";
    //header element
    var welcomeHeader = document.createElement("h1");
    welcomeHeader.innerText = "Welcome to Dan Aument's Code Quiz!";
    containerEl.appendChild(welcomeHeader);
    //button element
    var jsQuizStartBtn = document.createElement("button");
    jsQuizStartBtn.innerText = "Click here to begin the Javascript Quiz";
    jsQuizStartBtn.setAttribute('id', "jsQuizStartBtn");
    jsQuizStartBtn.onclick = jsQuizBtnFnc;
    containerEl.appendChild(jsQuizStartBtn);
    //possible other quiz buttons
};

function renderTime() {
    var currentTime = sessionStorage.getItem("timeLeft");
    timerSpanEl.innerText = currentTime;
    //add handling for time expiring
};

function resetTimer() {
    sessionStorage.setItem("timeLeft", "75");
};

function startTimer() {
    var storedTime = parseInt(sessionStorage.getItem("timeLeft"));
    if (storedTime > 0) {
        interval = setInterval(function() {
            console.log(storedTime);
            storedTime0--;
            renderTime();
        }, 1000);
    } else {
        alert("Something went wrong. Resetting the quiz.");
        resetTimer();
        sessionStorage.setItem("currentPage", "welcomePage");
    }

};

function renderPage() {
    var page = sessionStorage.getItem("currentPage");
    containerEl.innerHTML = "";  //clean out previous page elements
    renderTime();
    console.log(sessionStorage.getItem("currentPage"));
    if (page === "welcomePage") {
        renderWelcomePage();
    }
    else if (page === "quizPage") {
        renderQuestionPage();
    }
    else if (page === "highScores") {
        renderHighScores();
    }
    else if (page === "enterName") {
        renderEnterName();
    }
};

function setQuizTopic(input) {
    sessionStorage.setItem("currentQuizTopic", input);
};

function setQuestionOrder() {
    var currentQuiz = sessionStorage.getItem("currentQuizTopic");
    var currentQuizLength = quizBank[currentQuiz].length;
    var questionOrder = indexShuffler(currentQuizLength);
    questionOrder = JSON.stringify(questionOrder);
    sessionStorage.setItem("questionOrder", questionOrder);
};

function setCurrentQuestionNumber(x) {
    sessionStorage.setItem("currentQuestion", x);
};

function loadNextQuestion() {
    var currentQuestion = parseInt(sessionStorage.getItem("currentQuestion"));
    currentQuestion++;
    sessionStorage.setItem("currentQuestion", currentQuestion);
};

function renderQuestionPage() {
    var loadQuestionOrder = JSON.parse(sessionStorage.getItem("questionOrder"));
    var loadCurrentQuestion = parseInt(sessionStorage.getItem("currentQuestion"));
    var currentQuiz = sessionStorage.getItem("currentQuizTopic");
    //question header
    var questionHeader = document.createElement("h1");
    questionHeader.innerText = "Question number " + (loadCurrentQuestion + 1) + ": " + quizBank[currentQuiz][loadCurrentQuestion]["question"];
    containerEl.appendChild(questionHeader);
    //button element
    var jsQuizStartBtn = document.createElement("button");
    jsQuizStartBtn.innerText = "Click here to begin the Javascript Quiz";
    jsQuizStartBtn.setAttribute('id', "jsQuizStartBtn");
    containerEl.appendChild(jsQuizStartBtn);
};

function errorPenalty() {
    var currentTimeLeft = parseInt(sessionStorage.getItem("timeLeft"));
    currentTimeLeft = currentTimeLeft - 10;
    sessionStorage.setItem("timeLeft", currentTimeLeft);
};

function jsQuizBtnFnc() {
    resetTimer();
    startTimer();
    setQuizTopic("Javascript");
    setQuestionOrder();
    setCurrentQuestionNumber("0");
    sessionStorage.setItem("currentPage", "quizPage");
    renderPage();
};

resetButton.addEventListener("click", function() {
    resetTimer();
    sessionStorage.setItem("currentPage", "welcomePage");
    renderPage();
});
// jsQuizBtnEl.addEventListener("click", jsQuizBtnFnc); 
    // resetTimer();
    // startTimer();
    // setQuizTopic("Javascript");
    // setQuestionOrder();
    // setCurrentQuestionNumber("0");
    // sessionStorage.setItem("currentPage", "quizPage");
    // renderPage();
// });

// var correctAnswerBtnFnc = function() {
//     loadNextQuestion();
//     renderPage();
// };

// var wrongAnswerBtnFnc = function() {
//     errorPenalty();
//     loadNextQuestion();
//     renderPage();
// };



init();

renderPage();


