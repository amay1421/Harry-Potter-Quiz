var startButton = document.getElementById('start-btn')
var questionContainerElement = document.getElementById('question-container')
var questionBoxElement = document.getElementById('questionBox')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var endScreenElement = document.getElementById('game-over')
var timeLeft = parseInt(document.getElementById('time').textContent);

var mixQuestions, currentQuestionIndex
var mixAnswers, currentQuestionIndex

var count = 0;
let quizTime = 80;
let timer;
var timeId = "";

var questions = [
    {
        question: 'What house was Harry Potter sorted into?',
        answers: [
            {text: 'Hufflepuff', correct: false},
            {text: 'Ravenclaw', correct: false},
            {text: 'Slytherin', correct: false},
            {text: 'Gryffindor', correct: true},
        ]
    },
    {
       question: 'What is Harry’s position on the Quidditch team?',
       answers: [
           {text: 'Chaser', correct: false},
           {text: 'Seeker', correct: true},
           {text: 'Beater', correct: false},
           {text: 'Keeper', correct: false}
       ]
    },
    {
       question: 'What keeps the three-headed dog asleep?',
       answers: [
           {text: 'An enchanted music box', correct: true},
           {text: 'A potion', correct: false},
           {text: 'Gillyweed', correct: false},
           {text: 'A parseltongue lullaby', correct: false}
       ]
    },
    {
       question: 'How do you close the Marauder’s Map?',
       answers: [
           {text: '“I promise to create mischief”', correct: false},
           {text: '“I’m ready to make trouble”', correct: false},
           {text: '“Mischief managed”', correct: true},
           {text: '“I solemnly swear I am up to no good”', correct: false}
       ]
    },
    {
       question: 'How many presents did Dudley get on his 11th birthday?',
       answers: [
           {text: '36', correct: true},
           {text: '9', correct: false},
           {text: '22', correct: false},
           {text: '5', correct: false}
       ]
    },
    {
       question: 'Ron Weasley had a phobia of what?',
       answers: [
           {text: 'Snakes', correct: false},
           {text: 'Bats', correct: false},
           {text: 'Dragons', correct: false},
           {text: 'Spiders', correct: true},

       ]
    },
    {
       question: 'What is the name of Harry’s Owl?',
       answers: [
           {text: 'Hedwig', correct: true},
           {text: 'Scabbers', correct: false},
           {text: 'Crookshanks', correct: false},
           {text: 'Henwen', correct: false}
       ],
    }
   ]

   function setTimer(){
    timeId=setInterval(function() {
        quizTime--;
        time.textContent= quizTime;
        if (quizTime<=0){
            quizTime=0;
            time.textContent="Time's up!";
            clearInterval(timeId);
        }
    },1000)
}


startButton.addEventListener('click', startGame); 

function startGame () {
    setTimer();

startButton.classList.add('hide')
mixQuestions = questions.sort(() => Math.random() - .5)

currentQuestionIndex = 0
questionContainerElement.classList.remove('hide')
setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(mixQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton   = e.target
    var correct = selectedButton.dataset.correct
    setQuestionClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setQuestionClass(button, button.dataset.correct)
    })
    if(correct) { count++

    } else { 
        if (quizTime-15 < 0) {
            quizTime = 0
        } else {
            quizTime = quizTime - 15; 
        } 
    } 
    if (quizTime < 0) {
        endGame();
    }
    if (mixQuestions.length > currentQuestionIndex + 1 && quizTime > 0) {
        console.log(quizTime) 
        showQuestion
     } else {
       endGame();
     }
    currentQuestionIndex++;

    setTimeout(setNextQuestion, 1000);
}

function endGame() {
    questionBoxElement.classList.add('hide');
    endScreenElement.classList.remove('hide');
    clearInterval(timeId);
    time.textContent =  "Game Over";
    endScreenElement.innerHTML = "Game Over! Score: " + quizTime;

    var gameOverSubmission = document.createElement("p");
    gameOverSubmission.textContent="Submit your Highscore!"
    var nameInput = document.createElement("input");
    nameInput.setAttribute("placeholder", "First Name");
    nameInput.setAttribute("id", "name");
    var submitButton = document.createElement("button");
    submitButton.textContent="Submit!";
    submitButton.addEventListener("click", scoreSubmission);
    endScreenElement.append(gameOverSubmission);
    endScreenElement.append(nameInput);
    endScreenElement.append(submitButton);
}
function scoreSubmission(){
    var scoreArr = JSON.parse(localStorage.getItem("Highscores"));
    var addScore = {
        name: document.getElementById("name").value,
        score: quizTime
    }
    if(scoreArr){
        scoreArr.push(addScore);
    } else {
        scoreArr=[addScore];
    }
    localStorage.setItem("Highscores", JSON.stringify(scoreArr));
    viewHighscores();
}

function setQuestionClass(element, correct) {
    clearQuestionClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearQuestionClass(element) {
    element.classList.remove('remove')

}
function viewHighscores(){
    let scoreArr = JSON.parse(localStorage.getItem("Highscores"));
    questionContainerElement.classList.add('hide');
    endScreenElement.classList.remove('hide');
    endScreenElement.innerHTML="";
    if(scoreArr.length>1){
        scoreArr.sort((a, b) => (a.score - b.score) ? true : false);
    }
    for(let i=0; i<scoreArr.length; i++){
        var HighScoreP = document.createElement("p");
        HighScoreP.textContent=scoreArr[i].name+": "+scoreArr[i].score;
        endScreenElement.append(HighScoreP);
    }

    var redoButton = document.createElement("button");
    redoButton.textContent="Try Again?"
    redoButton.addEventListener("click", function (){
        location.reload()
    });
    endScreenElement.append(redoButton);
}
console.log(document.getElementById("Highscores"))
document.getElementById("Highscores").addEventListener("click", viewHighscores)


