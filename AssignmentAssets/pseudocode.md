question bank format

var quizBank = {
    Javascript : [
        {   question: "string",
            answers: [
                {answerText: "string",
                answerVeracity: boolean}
                {answerText: "string",
                answerVeracity: boolean}
            ],
        }
    ],
}


var renderPage = function(page) {
    if (page === "welcomePage") {
        renderWelcomePage();
    }
    else if (page === "quizPage") {
        renderQuizPage();
    }
    else if (page === "highScores") {
        renderHighScores();
    }
        
    )
}






webpage loads
check a bunch of session and local storage attributes
    if they're empty, put in starter values
    if they have contents, set html (look at tomato time for example - setTime()/renderTime()

Stuff to store in local storage
    currentPage
    timeLeft
    questionOrder
    highScores object
    currentQuestion

Stuff to do to local storage
    Reset timeLeft to start value
    decrement timeLeft
    read/write highScores
    set/clear questionOrder
    set/increment/clear currentQuestion


Welcome page
    Welcome title
    Start the quiz button
        Set questionOrder
        Go to Quiz page
    Show High Scores button 

Quiz page
    Question # (from currentQuestion number)
    Question text
        Answer button 1
        Answer button 2 
        ...
    I quit button (return to welcome page)

High Scores page
    Stuff to do when it renders
        reset timer
        turn off countdown
        
    High Scores title
    Scores in a table?
    Clear High Scores button








function for shuffled values
    indexShuffler = function(input)
    sanitize input or quit if not integer
    create array with all integers 0 to (input - 1)
        var sourceValues = [];
        for (i = 0; i < input; i++>) {
            sourceValues = sourceValues.push(i);
        }
    destructively pull out values from sourceValues at random
        var shuffledValues = [];
        while (sourceValues.length > 0) {
            shuffledValues = shuffledValues.push(sourceValues[Math.floor(Math.random() * sourceValues.length)]);
        }
        return shuffledValues;

clickable buttons
    reset
    start quiz










To Dos
look up event listener possibilities
