//variables
const startButton = document.querySelector("#startBtn");
const timerEl = document.querySelector("#timer");
const questionDiv = document.querySelector("#questions-container");
const finalScore = document.querySelector("#score");
const gameOverScore = document.querySelector("#endquiz");
let timeLeft = 60;
let timer;

// Create a listener for the start button.
startButton.addEventListener("click", startQuiz);

//questions to be asked in coding quiz
const questions = [
    "What is DOM?",
    "What is a function?",
    "Javascript and Java are the same?",
    "Variables are used for...?",
];
//answers for questions
const answers = [
    ["Domninant Object Material", "Document Object Model", "Document Obstructive Model", "Dominant Obsolete material"],
    ["Represents a true or false value", "Storing and manipulating text", "multiple values stored in a single variable", "A block of code designed to perform a task"],
    ["True", "False", "Neither", "Both true and false"],
    ["Creating a new function", "Holding a value", "Changing a value", "Storing and manipulating text",]
];
const correctAnswers = [1, 3, 1, 1];

let correct = 0;
let currentQuestion = 0;

//start quiz function with timer 
function startQuiz(){

    // initializing important variables
    correct = 0;
    currentQuestion = 0;

    setTimer(); // Start a timer

    // Hide the intro/welcome text and start button
    document.querySelector("main").style.display = "none";

    // Show the first question
    showQuestion();
}

function setTimer() {
    // Sets interval in variable
    // Start with 60 seconds.
    timeLeft=120;
    // Appear in the upper right corner.
    timer = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        // See if time has run out. If so, then call gameOver.
        if (timeLeft <= 0) gameOver();

    }, 1000);
}

//function to make questions appear
function showQuestion() {

    let possibleAnswers = answers[currentQuestion];
    // Create the html for the question area.
    let html = `<h2>Question ${currentQuestion + 1}</h2>\n`;
    html += `<p>${questions[currentQuestion]}</p>\n`;
    for (let i=0; i<4; i++) {
        html += `<button onclick="checkAnswer(${i});">${possibleAnswers[i]}</button>\n`;
    }

    // Fill the question area with the new html.
    questionDiv.innerHTML = html;

    // Set the display for the area to block.
    questionDiv.style.display= "flex";

    }

//function to help check to see if questions were answered correctly or incorrectly
function checkAnswer(answerIndex) {
    const isAnswerCorrect=answerIndex === correctAnswers[currentQuestion];
    if (!isAnswerCorrect) {
     // If not, penalize the time.
    timeLeft -= 15;
       

    }
    showFeedback(isAnswerCorrect);
    if (currentQuestion == questions.length - 1) {

    gameOver();

    } else {

    // Advance to next question
    // Increase the currentQuestion value, then call show question function.
    currentQuestion++;
    // Otherwise, show the next question....
    showQuestion();
    }

}

//show score after game over
function showScore() {
    gameOverScore.classList.remove("hide");
    finalScore.innerHTML = timeLeft;
}

function gameOver(){
    // Cancel the timer.
    clearInterval(timer);
    showScore();
    hideQuestions();
   
}

function hideQuestions (){
const questionsDiv= document.querySelector("#questions-container");
questionsDiv.style.display="none";

}

//saving highscore to include initials and score #
function saveHighscore() {
 const initialsTextbox =document.querySelector("#initials");
const initials= initialsTextbox.value;
console.log(initials, timeLeft);
let highScores=window.localStorage.getItem("highScores");
if (highScores === null){
    highScores="";

}
highScores += `${initials},${timeLeft};`;
window.localStorage.setItem('highScores', highScores);
window.location ="highscore.html";
}
let hidefeedbackTimer=null;
function showFeedback(isCorrect){
    if (hidefeedbackTimer != null){
        window.clearTimeout(hidefeedbackTimer);
     }
     //showing if questions were answered right(green), wrong(red)
    const feedbackText= document.querySelector("#feedback");
    if (isCorrect){
        feedbackText.innerHTML="Right!";
        feedbackText.style.color="green";
        feedbackText.style.fontSize="x-large";


    }
    else {
        feedbackText.innerHTML="Wrong!";
        feedbackText.style.color="red";
        feedbackText.style.fontSize="x-large";
    }
const feedbackDiv= document.querySelector("#results-container");
feedbackDiv.style.display="flex";
hidefeedbackTimer= window.setTimeout(hideFeedback, 2000);

}
function hideFeedback(){
    const feedbackDiv= document.querySelector("#results-container");
    feedbackDiv.style.display="none";

}