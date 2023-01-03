import { confetti } from './confetti-script.js'
import { shake } from './shake-script.js'

const quiz = [
    {
        'key': 'a',
        'question': 'When was the first website created?',
        'a': '1991',
        'b': '1984',
        'c': '1987',
        'd': '1993'
    },{
        'key': 'd',
        'question': 'What percent of web usage is on mobile',
        'a': '20%',
        'b': '50%',
        'c': '70%',
        'd': '66%'
    },{
        'key': 'c',
        'question': 'How many google searches are made every day',
        'a': '900 Million',
        'b': '1.5 Billion',
        'c': '2.9 Billion',
        'd': '3.8 Billion'
    },{
        'key': 'd',
        'question': 'Fourth letter of the alphabet',
        'a': 'A',
        'b': 'D',
        'c': 'B',
        'd': 'C'
    }
]

let thisScore = {}
let pastScores = []

let questionNumber = 1
let amountWrongeAnswers = 0
let amountRightAnswers = 0
let selectedComputerSpeed = 2

function updateQuestion() {
    console.log(amountRightAnswers)
    console.log({questionNumber, quizLength: `${quiz.length}`})
    if (questionNumber == quiz.length + 1) { // if you just answered the last question then end the quiz
        endQuiz()
    } else {
        document.getElementById('question-text').textContent = quiz[questionNumber - 1].question // update question text
        document.querySelectorAll('#answer').forEach(e => {
            e.textContent = quiz[questionNumber - 1][`${e.getAttribute('choice')}`] // update answers
            if (quiz[questionNumber - 1].key === e.getAttribute('choice')) {  // toggle true and false answer classes
                e.classList.toggle('true-answer', true)
                e.classList.toggle('false-answer', false)
            } else {
                e.classList.toggle('false-answer', true)
                e.classList.toggle('true-answer', false)
            }
        })
        questionNumber++
    }
}

function wrongeAnswer() {  // execute on wronge answer click
    gsap.fromTo('#timer', {duration: 0.3, ease: Power1.easeIn, color: 'rgba(255, 0, 0, 0.5)'}, {color: '#f7c4a5'})
    gsap.fromTo('.answer-flash', {backgroundColor: 'red', opacity: 0.3}, {duration: 0.3, ease: Power1.easeIn, opacity: 0})
    shake(1, 20, 0.2, 'body')
    amountWrongeAnswers++
}

function rightAnswer() {  // execute on right answer click
    amountRightAnswers++
    console.log(amountRightAnswers)
    let questionUpdateAnimation = gsap.timeline()

    gsap.fromTo ('#timer', {duration: 0.3, ease: Power1.easeIn, color: 'rgba(0, 255, 0, 0.5)'}, {color: '#f7c4a5'}) // timer flashes green
    gsap.fromTo('.answer-flash', {backgroundColor: 'limegreen', opacity: 0.3}, {duration: 0.4, ease: Power1.easeIn, opacity: 0}) // screen flashes green
    questionUpdateAnimation.to('main', {duration: 1, ease: 'Power2.easeIn', scale: 0.8, filter: 'blur(5px)'})
    questionUpdateAnimation.to('main', {duration: 1, ease: 'Power2.easeIn', x: '-100%', scale: 0.9, filter: 'blur(5px)'}, '<0.7')
    questionUpdateAnimation.set('main', {opacity: 0}) // for some reason this makes it way smoother
    if (questionNumber != quiz.length + 1) {
        questionUpdateAnimation.set('main', {x: '100%', onComplete: () => updateQuestion()}) // this just sets the questions location to the right side of the screen
        questionUpdateAnimation.set('main', {opacity: 1}) // for some reason this makes it way smoother
        questionUpdateAnimation.to('main', {duration: 1, ease: 'Power3.easeOut', x: 0})
        questionUpdateAnimation.to('main', {scale: 1, filter: 'blur(0px)', duration: 1, ease: 'Power2.easeOut'}, '<0.3')
    } else {
        updateQuestion()
    }
}

function startTimer() {
    let deltaStart = Date.now(); // get current time when timer is started
    
    let timer = setInterval(function() {
        let delta = Date.now() - deltaStart // milliseconds since timer was started
        let timeRemaining = 1000 - (Math.floor(delta / 100)) - (amountWrongeAnswers * 50) + (amountRightAnswers * 100)
        if (Number.isInteger(timeRemaining / 10)) {
            (document.getElementById('timer').textContent = `${timeRemaining / 10}.0`)
        } else {
            (document.getElementById('timer').textContent = timeRemaining / 10)
        }
        if (timeRemaining <= 0) {
            document.getElementById('timer').textContent = '0.0'
            thisScore['timeLeft'] = '0.0'
            pastScores.unshift(thisScore)
            localStorage.setItem('pastScores', JSON.stringify(pastScores))
            getPastTimes()
            endQuiz()
            clearInterval(timer)
        } 
        if (amountRightAnswers == quiz.length) {
            if (Number.isInteger(timeRemaining / 10)) {
                thisScore['timeLeft'] = `${(timeRemaining / 10) - 10}.0`
            } else {
                thisScore['timeLeft'] = (timeRemaining / 10) - 10
            }
            console.log(thisScore)
            console.log(pastScores)
            pastScores.unshift(thisScore) 
            localStorage.setItem('pastScores', JSON.stringify(pastScores))
            document.querySelector('.past-scores-container').innerHTML = ''
            getPastTimes()
            showPastTimes()
            clearInterval(timer)
        }
    }, 100)
}

function endQuiz() {
    thisScore['currentDate'] = getCurrentDate()
    thisScore['finalScore'] = `${amountRightAnswers} / ${quiz.length}`
    console.log(thisScore)
    console.log(pastScores)
    console.log('1')

    if (amountRightAnswers == quiz.length) {
        confetti(selectedComputerSpeed + 1)
        let quizCompletedAnimation = gsap.timeline()
        quizCompletedAnimation.to('.result-container', {duration: 1, ease: Bounce.easeOut, scale: 1, filter: 'blur(0px) drop-shadow(0 0 20px rgba(0, 0, 0, 0.3))', y: '-50%', top: '50%'})
        document.getElementById('amount-correct').textContent = `${amountRightAnswers} / ${quiz.length} CORRECT!`
        document.getElementById('result').textContent = 'CONGRATS!'
    } else {
        let timerRunOutAnimation = gsap.timeline() 
        document.getElementById('amount-correct').textContent = `${amountRightAnswers} / ${quiz.length} CORRECT!`   
        document.getElementById('result').textContent = "TIME'S UP!"     
        timerRunOutAnimation.to('main', {duration: 1, ease: 'Power2.easeIn', scale: 0.8, filter: 'blur(5px)'})
        timerRunOutAnimation.to('main', {duration: 1, ease: 'Power2.easeIn', y: '100%'}, '<0.2')
        timerRunOutAnimation.set('main', {opacity: 0})
        timerRunOutAnimation.to('.result-container', {duration: 1, ease: Bounce.easeOut, scale: 1, filter: 'blur(0px) drop-shadow(0 0 20px rgba(0, 0, 0, 0.3))', y: '-50%', top: '50%'})
    }
}

function startQuiz() {
    thisScore = {}
    questionNumber = 1
    amountRightAnswers = 0
    amountWrongeAnswers = 0
    startTimer()
    updateQuestion()
    let startQuizAnimation = gsap.timeline()
    startQuizAnimation.set('main', {y: '-100%'})
    startQuizAnimation.to('main', {duration: 1, ease: Bounce.easeOut, y: 0})
}

function restartQuiz() {
    thisScore = {}
    questionNumber = 1
    amountRightAnswers = 0
    amountWrongeAnswers = 0
    startTimer()
    updateQuestion()
    let restartQuizAnimation = gsap.timeline()
    restartQuizAnimation.to('.result-container', {duration: 1, ease: Power3.easeIn, scale: 0.8, filter: 'blur(5px) drop-shadow(0 0 20px rgba(0, 0, 0, 0.3))', y: '-100%', top: '0%'})
    restartQuizAnimation.set('main', {opacity: 1, y: '100%', x: 0})
    restartQuizAnimation.to('main', {duration: 1, ease: 'Power3.easeOut', y: 0})
    restartQuizAnimation.to('main', {scale: 1, filter: 'blur(0px)', duration: 1, ease: 'Power2.easeOut'}, '<0.3')
}

document.getElementById('restart-button').addEventListener('click', () => restartQuiz())

document.querySelectorAll('#answer').forEach(e => { // add click functions for the answers
    e.addEventListener('click', () => {
        if (e.classList.contains('true-answer')) {
            rightAnswer() // run function depending on the answer that was clicked
            e.classList.toggle('true-answer', false) // makes sure nobody is able to add seconds multiple times with the same answer
        }    
        if (e.classList.contains('false-answer')) {
            wrongeAnswer() // run function depending on the answer that was clicked
            e.classList.toggle('false-answer', false) // makes sure nobody is able to remove seconds multiple times with the same answer
        } 
    })
})

function computerSpeed(speed) {
    switch (speed) {
        case 'slow': {
            gsap.to('#animated-selection', {duration: 1, ease: Power4.easeOut, left: '0%', transform: 'translateX(0%)'})
            selectedComputerSpeed = 1
            console.log('slow')
            break
        }
        case 'average': {
            gsap.to('#animated-selection', {duration: 1, ease: Power4.easeOut, left: '50%', transform: 'translateX(-50%)'})
            selectedComputerSpeed = 2
            break
        }
        case 'fast': {
            gsap.to('#animated-selection', {duration: 1, ease: Power4.easeOut, left: '100%', transform: 'translateX(-100%)'})
            selectedComputerSpeed = 3
            console.log('fast')
            break
        }
        default: {
            gsap.to('#animated-selection', {duration: 1, ease: Power4.easeOut, left: '50%', transform: 'translateX(-50%)'})
            selectedComputerSpeed = 2
            break
        }
    }
}

document.querySelectorAll('#computer-speed').forEach(e => {
    let speed = e.dataset.speed
    e.addEventListener('click', () => {
        computerSpeed(speed)
    })
})

function startButtonPressed() {
    let startButtonPressedAnimation = gsap.timeline()

    startButtonPressedAnimation.to('.start-container', {duration: 1, ease: Power1.easeOut, scale: 0, transform: 'translate(-50%, -50%)', filter: 'blur(10px) drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))'})
}

document.getElementById('start-button').addEventListener('click', () => {startQuiz(); startButtonPressed()})

function getPastTimes() {
    let pastTimes = JSON.parse(localStorage.getItem('pastScores'))
    console.log(pastTimes)
    pastTimes.forEach((e, i) => {
        console.log(i)
        let pastScoreEl = document.createElement('div')
        pastScoreEl.classList.add('past-score')
        console.log(pastScoreEl)
        pastScoreEl.innerHTML = `
            <p>${e['currentDate']}</p>
            <p>${e['finalScore']}</p>
            <p>${e['timeLeft']}</p>`
        document.querySelector('.past-scores-container').appendChild(pastScoreEl)
        console.log(pastScoreEl)
    })
}

function showPastTimes() {
    let showPastTimesAnimation = gsap.timeline()

    showPastTimesAnimation.to('.past-score', {duration: 2, transform: 'translateX(0) scale(1)', ease: 'elastic.out(0.8, 0.3)', filter: 'blur(0px)',
        stagger: {
            each: 0.08,
            from: 'start',
            grid: 'auto',
            }
    })
}

function getCurrentDate() {
    const today = new Date()
    const yyyy = today.getFullYear()
    let mm = today.getMonth() + 1 // Months start at 0!
    let dd = today.getDate()

    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm

    const formattedToday = `${dd}/${mm}/${yyyy}`
    return formattedToday
}

getPastTimes()
showPastTimes()

pastScores = JSON.parse(localStorage.getItem('pastScores'))