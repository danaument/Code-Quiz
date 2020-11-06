//DOM pointers
var timerSpanEl = document.querySelector("#timerSpan");
var containerEl = document.querySelector("#container");
var jsQuizBtnEl = document.querySelector("#jsQuizStartBtn");
var correctAnswerBtnEl = document.querySelector("#correctAnswerBtn");
var wrongAnswerBtnEl = document.querySelector("#wrongAnswerBtn");

// load initial values
var init = function() {
    if (sessionStorage.getItem("timeLeft") === null) {
        resetTimer();
    }
    if (sessionStorage.getItem("currentPage") !== "") {
        sessionStorage.setItem("currentPage", "welcomePage")
    }
}

var indexShuffler = function(input) {
    input = parseInt(input);
    if (Number.isInteger(input) === false) {
        console.log("Index shuffler function failed.  The input was " + input);
    }
    else {
        var sourceValues = [];
        for (i = 0; i < input; i++) {
            sourceValues = sourceValues.push(i);
        } 
        console.log("The input was " + input + "and the source values generated were" + sourceValues + ".");
    }
       // destructively pull out values from sourceValues at random
    var shuffledValues = [];
    while (sourceValues.length > 0) {
        var pickAValue = Math.floor(Math.random() * sourceValues.length)
        var yankedValue = sourceValues.splice(pickAValue, 1);
        shuffledValues = shuffledValues.push(yankedValue);
    }
    return shuffledValues;
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

var renderTime = function () {
    var currentTime = sessionStorage.getItem("timeLeft");
    timerSpanEl.innerText = currentTime;
    //add handling for time expiring
}

var resetTimer = function() {
    sessionStorage.setItem("timeLeft", "75");
}

var startTimer = function() {
    var storedTime = sessionStorage.getItem("timeLeft");
    if (storedTime > 0) {
        interval = setInterval(function() {
            storedTime0--;
            renderTime();
        }, 1000);
    } else {
        alert("Something went wrong. Resetting the quiz.");
        resetTimer();
        sessionStorage.setItem("currentPage", "welcomePage");
    }

}

var renderPage = function() {
    var page = sessionStorage.getItem("currentPage");
    containerEl.innerHTML = "";  //clean out previous page elements
    renderTime();
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
};

var setQuizTopic = function(input) {
    sessionStorage.setItem("currentQuizTopic", input);
};

var setQuestionOrder = function() {
    var currentQuiz = sessionStorage.getItem("currentQuizTopic");
    var questionOrder = indexShuffler(quizBank.currentQuiz.length);
    //need to access object at a variable key
    questionOrder = JSON.stringify(questionOrder);
    sessionStorage.setItem(questionOrder);
};

var loadNextQuestion = function() {

};

var errorPenalty = function() {
    var currentTimeLeft = parseInt(sessionStorage.getItem("timeLeft"));
    currentTimeLeft = currentTimeLeft - 10;
    sessionStorage.setItem("timeLeft", currentTimeLeft);
};

init();

renderPage();


jsQuizBtnEl.addEventListener("click", function() {
    resetTimer();
    startTimer();
    setQuizTopic();
    setQuestionOrder();
    sessionStorage.setItem("currentPage", "quizPage");
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


