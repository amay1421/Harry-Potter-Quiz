var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')

var questionContainerElement = document.getElementById
('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')

let mixQuestions, currentQuestionIndex

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

setInterval(() => {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;
}, 1000);

startButton.classList.add('hide')
mixQuestions = questions.sort(() => Math.random() - .5)

console.log(mixQuestions)
currentQuestionIndex = 0
questionContainerElement.classList.remove('hide')
setNextQuestion()
}

function setNextQuestion(){
    console.log('Next Question!')
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
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if(correct) {
       
    } else {
        timeLeft = timeLeft - 15;
    }

    /*if (mixQuestions.length > currentQuestionIndex + 1 ) {
        //nextButton.classList.remove('hide')
    } else {
        //startButton.innerText = 'Restart'
        //startButton.classList.remove('hide')
    }*/
    currentQuestionIndex++;


    setTimeout(setNextQuestion, 3000);
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('renove')

}



// startButton.addEventListener("click", function (e) {
//     e.preventDefault();
//     // alert("working")
//     var timer = 10;
//     var timerid = setInterval(function () {
//         timer--;
//         // console.log(timerCount);
//         timerDisplay.textContent = timer;
//         if (timer === 0) {
//             // console.log("game over");
//             wordDisplay.textContent = "Game Over"
//             clearInterval(timerId);
//         }
//     }, 1000);
