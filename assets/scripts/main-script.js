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
        'key': 'b',
        'question': 'Second letter of the alphabet',
        'a': 'A',
        'b': 'B',
        'c': 'C',
        'd': 'D'
    },{
        'key': 'c',
        'question': 'Third letter of the alphabet',
        'a': 'A',
        'b': 'B',
        'c': 'C',
        'd': 'D'
    },{
        'key': 'd',
        'question': 'Fourth letter of the alphabet',
        'a': 'A',
        'b': 'B',
        'c': 'C',
        'd': 'D'
    }
]

let questionNumber = 1
let amountWrongeAnswers = 0

function updateQuestion() {
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

document.querySelectorAll('#answer').forEach(e => { // add click functions for the answers
    e.addEventListener('click', () => {
        (e.classList.contains('true-answer')) ? rightAnswer() : wrongeAnswer() // run function depending on the answer that was clicked
    })
})

function wrongeAnswer() {
    gsap.fromTo('.answer-flash', {backgroundColor: 'red', opacity: 0.3}, {duration: 0.3, ease: Power1.easeIn, opacity: 0})
    gsap.fromTo('.answer-flash', {color: 'rgba(255, 0, 0, 0.5)'}, {duration: 0.3, ease: Power1.easeIn, color: 'rgba(255, 255, 255, 0.5)'})
    shake(1, 20, 0.2, 'main')
    amountWrongeAnswers++
}

function rightAnswer() { 
    let questionUpdateAnimation = gsap.timeline()

    gsap.fromTo('.answer-flash', {backgroundColor: 'green', opacity: 0.3}, {duration: 0.6, ease: Power1.easeIn, opacity: 0})
    questionUpdateAnimation.to('main', {duration: 1, ease: 'Power2.easeIn', scale: 0.8, filter: 'blur(5px)'})
    questionUpdateAnimation.to('main', {duration: 1, ease: 'Power2.easeIn', x: '-100%', scale: 0.9, filter: 'blur(5px)'}, '<0.7')
    questionUpdateAnimation.set('main', {opacity: 0}) // for some reason this makes it way smoother
    questionUpdateAnimation.set('main', {x: '100%', onComplete: () => updateQuestion()}) // this just sets the questions location to the right side of the screen
    questionUpdateAnimation.set('main', {opacity: 1}) // for some reason this makes it way smoother
    questionUpdateAnimation.to('main', {duration: 1, ease: 'Power3.easeOut', x: 0})
    questionUpdateAnimation.to('main', {scale: 1, filter: 'blur(0px)', duration: 1, ease: 'Power2.easeOut'}, '<0.3')
    // confetti()
}

function startTimer() {
    let deltaStart = Date.now();
    
    setInterval(function() {
        let delta = Date.now() - deltaStart // milliseconds elapsed since start
        let timeRemaining = 1000 - (Math.floor(delta / 100)) - (amountWrongeAnswers * 50)
        if (Number.isInteger(timeRemaining / 10)) {
            (document.getElementById('timer').textContent = `${timeRemaining / 10}.0`)
        } else {
            (document.getElementById('timer').textContent = timeRemaining / 10)
        }
    }, 100)
}

startTimer()
updateQuestion()