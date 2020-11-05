//DOM pointers
var timerSpanEl = document.querySelector("#timerSpan");
var containerEl = document.querySelector("#container");
var jsQuizBtnEl = document.querySelector("#jsQuizStartBtn");
var correctAnswerBtnEl = document.querySelector("#correctAnswerBtn");
var wrongAnswerBtnEl = document.querySelector("#wrongAnswerBtn");



// load initial values
var init = function() {
    if (localStorage.getItem("timeLeft") === null) {
        resetTimer();
    }
    if (localStorage.getItem("currentPage") !== "") {
        localStorage.setItem("currentPage", "welcomePage")
    }
}

var renderWelcomePage = function() {
    //do event stuff


    //render page
    var welcomeHeader = document.createElement("h1");
    welcomeHeader.innerText = "Welcome to Dan Aument's Code Quiz!";
    containerEl.appendChild(welcomeHeader);

    var jsQuizStartBtn = document.createElement("button");
    jsQuizStartBtn.innerText = "Click here to begin the Javascript Quiz";
    jsQuizStartBtn.setAttribute('id', "jsQuizStartBtn");
    containerEl.appendChild(jsQuizStartBtn);
}


var resetTimer = function() {
    localStorage.setItem("timeLeft", "75");
}

var renderPage = function() {
    var page = localStorage.getItem("currentPage");
    containerEl.innerHTML = "";  //clean out previous page elements
    if (page === "welcomePage") {
        renderWelcomePage();
    }
    else if (page === "quizPage") {
        renderQuizPage();
    }
    else if (page === "highScores") {
        renderHighScores();
    }
    else if (page === "enterName") {
        renderEnterName();
    }
}

var loadNextQuestion = function() {

};

var errorPenalty = function() {
    var currentTimeLeft = parseInt(localStorage.getItem("timeLeft"));
    currentTimeLeft = currentTimeLeft - 10;
    localStorage.setItem("timeLeft", currentTimeLeft);
};

init();

renderPage();


jsQuizBtnEl.addEventListener("click", function() {
    resetTimer();
    startTimer();
    localStorage.setItem("currentPage", "quizPage");
    loadNextQuestion();
    renderPage();
});

correctAnswerBtnEl.addEventListener("click", function() {
    loadNextQuestion();
    renderPage();
});

wrongAnswerBtnEl.addEventListener("click", function() {
    errorPenalty();
    loadNextQuestion();
    renderPage();
})


