//DOM pointers
var timerSpanEl = document.querySelector("#timerSpan");
var containerEl = document.querySelector("#container");
var jsQuizBtnEl = document.querySelector("#jsQuizStartBtn");
var correctAnswerBtnEl = document.querySelector("#correctAnswerBtn");
var wrongAnswerBtnEl = document.querySelector("#wrongAnswerBtn");
var resetButton = document.querySelector("#resetButton");
var viewScoresBtnEl = document.querySelector("#headerViewScores");

var totalSeconds = 75;
var secondsElapsed = 0;
var interval;

//quiz data
var quizBank = {
    Javascript : [
        {   question: "Inside which HTML element do we put the JavaScript?",
            answers: [
                {answerText: "<js>",
                answerVeracity: false}, 
                {answerText: "<scripting>",
                answerVeracity: false},
                {answerText: "<javascript>",
                answerVeracity: false},
                {answerText: "<script>",
                answerVeracity: true},
            ],
        },
        {   question: "How do you create a function in Javascript?",
            answers: [
                {answerText: "variable myfunction = function()",
                answerVeracity: false}, 
                {answerText: "function:myFunction()",
                answerVeracity: false},
                {answerText: "function myFunction()",
                answerVeracity: true},
            ],
        },
        {   question: "How does a FOR loop start?",
            answers: [
                {answerText: "for (i=0; i <= 5)",
                answerVeracity: false}, 
                {answerText: "for i from 1 to 5",
                answerVeracity: false},
                {answerText: "for (i <= 5, i++)",
                answerVeracity: false},
                {answerText: "for (i = 0; i < 5; i++)",
                answerVeracity: true},
            ],
        },
        {   question: "What is the correct way to write a JavaScript array?",
            answers: [
                {answerText: "var colors = 'red', 'green', 'blue'",
                answerVeracity: false}, 
                {answerText: "var colors = 1:red, 2:green, 3:blue",
                answerVeracity: false},
                {answerText: "var colors = ('red'; 'green'; 'blue')",
                answerVeracity: false},
                {answerText: "var colors = ['red', 'green', 'blue']",
                answerVeracity: true},
            ],
        },
        {   question: "JavaScript is the same as Java",
            answers: [
                {answerText: "true",
                answerVeracity: false}, 
                {answerText: "false",
                answerVeracity: true},
            ],
        }
    ],
};


//load initial values
function init() {
    sessionStorage.setItem("currentPage", "welcomePage");
    // console.log(sessionStorage.getItem("currentPage"));
};

//reusable function to take an integer and give a shuffled array of all values less than the input, including zero
function indexShuffler(input) {
    input = parseInt(input);
    if (Number.isInteger(input) === false) {
        // console.log("Index shuffler function failed.  The input was " + input);
    }
    else {
        var sourceValues = [];
        for (i = 0; i < input; i++) {
            sourceValues.push(i);
        } 
        // console.log("The input was " + input + "and the source values generated were" + sourceValues + ".");
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

function renderTime() {
    var secondsLeft = totalSeconds - secondsElapsed;
    timerSpanEl.innerText = secondsLeft;

    if (secondsElapsed >= totalSeconds) {
        secondsElapsed = 75;
        stopTimer();
        gameOver();
    }
}

function startTimer() {
    interval = setInterval(function() {
        secondsElapsed++;
        renderTime();
    }, 1000);
};

function pauseTimer() {
    clearInterval(interval);
    renderTime();
};

function stopTimer() {
    secondsElapsed = 0;
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

function renderPage() {
    var page = sessionStorage.getItem("currentPage");
    containerEl.innerHTML = "";  //clean out previous page elements
    // console.log(sessionStorage.getItem("currentPage"));
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
    var currentQuiz = sessionStorage.getItem("currentQuizTopic");
    var currentQuizLength = quizBank[currentQuiz].length;
    //if next question doesn't exist, clearinterval and set score value and set page to submit score
    if (currentQuestion === currentQuizLength) {
        gameOver();
    }
};

function gameOver() {
    clearInterval(interval);
    if (parseInt(timerSpanEl.innerText) < 0) {
        secondsElapsed = 75;
        renderTime();
    }
    // var playerScore = parseInt(timerSpanEl.innerText);
    sessionStorage.setItem("currentPage", "enterName");
    renderPage();
};

function renderHighScores() {
    var highScoresHeader = document.createElement("h1");
    highScoresHeader.innerText = "Code Quiz High Scores";
    containerEl.appendChild(highScoresHeader);
    var storedScores = JSON.parse(sessionStorage.getItem("highScores"))
    var scoreTable = document.createElement("table");
    containerEl.appendChild(scoreTable);
    for (i=0; i < storedScores.length; i++) {
        var scoreRow = document.createElement("tr");
        scoreRow.setAttribute("id", "tableRow" + i);
        var scoreName = document.createElement("td");
        scoreName.innerText = storedScores[i]["name"];
        scoreRow.appendChild(scoreName);
        var scoreNumber = document.createElement("td");
        scoreNumber.innerHTML = storedScores[i]["score"];
        scoreRow.appendChild(scoreNumber);
        scoreTable.appendChild(scoreRow);
    }
    containerEl.appendChild(scoreTable);
    var backToStartBtn = document.createElement("button");
    backToStartBtn.innerText = "Return to beginning";
    backToStartBtn.setAttribute("id", "resetToStart");
    backToStartBtn.onclick = resetToStartFnc;
    containerEl.appendChild(backToStartBtn);
};

function renderQuestionPage() {
    var loadQuestionOrder = JSON.parse(sessionStorage.getItem("questionOrder"));
    var loadCurrentQuestion = parseInt(sessionStorage.getItem("currentQuestion"));
    specificQuestion = parseInt(loadQuestionOrder[loadCurrentQuestion]);
    var currentQuiz = sessionStorage.getItem("currentQuizTopic");
    //question header
    var questionHeader = document.createElement("h1");
    questionHeader.innerText = "Question number " + (loadCurrentQuestion + 1) + ": " + quizBank[currentQuiz][specificQuestion]["question"];
    containerEl.appendChild(questionHeader);
    //set shuffled answer order
    var currentAnswerAmnt = quizBank[currentQuiz][specificQuestion]["answers"].length;
    // console.log("current number of answers is " + currentAnswerAmnt);
    var currentAnswerOrder = indexShuffler(currentAnswerAmnt);
    // console.log("current answer order is " + currentAnswerOrder);
    //button elements with answers
    for (i=0; i < currentAnswerOrder.length; i++) {
        var pickAnswer = currentAnswerOrder[i]
        var answer = document.createElement("button");
        // console.log(quizBank[currentQuiz][specificQuestion]["answers"][pickAnswer]["answerText"]);
        answer.innerText = quizBank[currentQuiz][specificQuestion]["answers"][pickAnswer]["answerText"];
        if (quizBank[currentQuiz][specificQuestion]["answers"][pickAnswer]["answerVeracity"] === false) {
            answer.setAttribute('id', 'wrongAnswerBtnEl');
            answer.onclick = wrongAnswerBtnFnc;
        } else if (quizBank[currentQuiz][specificQuestion]["answers"][pickAnswer]["answerVeracity"] === true) {
            answer.setAttribute('id', 'correctAnswerBtnEl');
            answer.onclick = correctAnswerBtnFnc;
        } else {
            console.log("answer building failed");
        };
        containerEl.appendChild(answer);
    };
};

function renderEnterName() {
    var playerScore = parseInt(timerSpanEl.innerText);
    var enterNameHeader = document.createElement("h1");
    if (playerScore > 0) {
        enterNameHeader.innerText = "Enter your name, champion!"
    } else {
        enterNameHeader.innerText = "...Never send to know for whom the bell tolls; it tolls for: "
    }
    containerEl.appendChild(enterNameHeader);
    //create name form
    var nameForm = document.createElement("form");
    nameForm.setAttribute("id", "nameForm");
    containerEl.appendChild(nameForm);
    var inputField = document.createElement("input");
    inputField.setAttribute("id", "nameFormInput")
    inputField.setAttribute("type", "text");
    inputField.setAttribute("placeholder", "Enter name here");
    document.getElementById("nameForm").appendChild(inputField);
    var submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    submitButton.setAttribute('id', "submitButton");
    submitButton.onclick = submitButtonFnc;
    containerEl.appendChild(submitButton);
};


function errorPenalty() {
    // console.log("before penalty time elapse is " + secondsElapsed);
    secondsElapsed += 20;
    // console.log("after penalty time elapse is " + secondsElapsed);
};

function jsQuizBtnFnc() {
    startTimer();
    setQuizTopic("Javascript");
    setQuestionOrder();
    setCurrentQuestionNumber("0");
    sessionStorage.setItem("currentPage", "quizPage");
    renderPage();
};

resetButton.addEventListener("click", function() {
    stopTimer();
    sessionStorage.setItem("currentPage", "welcomePage");
    renderPage();
    timerSpanEl.innerText = "75";
});

viewScoresBtnEl.addEventListener("click", function() {
    stopTimer();
    sessionStorage.setItem("currentPage", "highScores");
    renderPage();
});

function correctAnswerBtnFnc() {
    loadNextQuestion();
    renderPage();
};

function wrongAnswerBtnFnc() {
    errorPenalty();
    loadNextQuestion();
    renderPage();
};

function resetToStartFnc() {
    stopTimer();
    sessionStorage.setItem("currentPage", "welcomePage");
    renderPage();
    timerSpanEl.innerText = "75";
}

function submitButtonFnc() {
    var storedScores = JSON.parse(sessionStorage.getItem("highScores"));
    if (!Array.isArray(storedScores)) {
        storedScores = [];
    }
    var newScore = {};
    var playerScore = parseInt(timerSpanEl.innerText);
    newScore.name = document.querySelector("#nameFormInput").value;
    newScore.score = playerScore
    storedScores.push(newScore);
    sessionStorage.setItem("highScores", JSON.stringify(storedScores));
    sessionStorage.setItem("currentPage", "highScores");
    renderPage();   
};

init();

renderPage();