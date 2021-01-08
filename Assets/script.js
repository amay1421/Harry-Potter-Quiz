var startButton = document.getElementById('start-btn')

var questionContainerElement = document.getElementById
('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var endScreenElement = document.getElementById('game-over')

var mixQuestions, currentQuestionIndex
var mixAnswers, currentQuestionIndex

var count = 0;
timeLeft= 80;
console.log(count);

var timeLeft = parseInt(document.getElementById('time').textContent);

var questions = [
    {
        question: 'What house was Harry Potter sorted into?',
        answers: [
            {text: 'Gryffindor', correct: true},
            {text: 'Hufflepuff', correct: false},
            {text: 'Ravenclaw', correct: false},
            {text: 'Slytherin', correct: false}
        ]
    },
    {
       question: 'What is Harry’s position on the Quidditch team?',
       answers: [
           {text: 'Seeker', correct: true},
           {text: 'Chaser', correct: false},
           {text: 'Beater', correct: false},
           {text: 'Keepr', correct: false}
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
           {text: '“Mischief managed”', correct: true},
           {text: '“I promise to create mischief”', correct: false},
           {text: '“I’m ready to make trouble”', correct: false},
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
           {text: 'Spiders', correct: true},
           {text: 'Snakes', correct: false},
           {text: 'Bats', correct: false},
           {text: 'Dragons', correct: false}
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

startButton.addEventListener('click', startGame); 

function startGame () {

var timeInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;
}, 1000);
if (time <= 0) {
    clearInterval(timeLeft = 0);
    winGame();
}

    // if (timeLeft === 0) {
    //     console.log("game over"); 
    //     wordDisplay.textContent = "Game Over"
    //     clearInterval(timeInterval)
    // }
    // var startingTime = 1;
    // let time = startingTime * 60;
    // var gameTimeEl = document.getElementById('time');
    // // undefined declaration
    // var timer;
    // function countdownTime() {
    //     const minutes = Math.floor(time / 60);
    //     let seconds = time % 60;
    //     gameTimeEl.innerHTML = seconds;
    //     time--;
    //     if (time <= 0) {
    //             time=0;
    //             clearInterval(timer);
    //             // winGame();
    //         }
    // }


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
    if (mixQuestions.length > currentQuestionIndex + 1 ) {
        showQuestion
    } else {
        questionContainerElement.classList.add('hide')
        endScreenElement.classList.remove('hide')
        clearInterval();
    }
    if(correct) { count++

    } else {
        timeLeft = timeLeft - 15;
    } 
   
    currentQuestionIndex++;

    setTimeout(setNextQuestion, 1000);
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






// var nameInput = document.querySelector("#name");
// var scoreInput = document.querySelector("score");
// var submitButton = document.querySelector("#submit");

// var count = localStorage


// startButton.addEventListener("click", function (event) {
//     event.preventDefault();

//     var AnswerData = {

//     }
// })

// localStorage.setItem("AnswerData", JSON.stringify(AnswerData));
