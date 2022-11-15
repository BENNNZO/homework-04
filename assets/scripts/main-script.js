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

function wrongeAnswer() {
    shake(1, 20, 0.2, 'body')
}

function rightAnswer() {
    let questionUpdateAnimation = gsap.timeline()
    questionUpdateAnimation.to('main', {duration: 1, ease: 'Power2.easeIn', scale: 0.8, filter: 'blur(5px)'})
    questionUpdateAnimation.to('main', {duration: 1, ease: 'Power2.easeIn', x: '-100%', scale: 0.9, filter: 'blur(5px)'}, '<0.7')
    questionUpdateAnimation.set('main', {x: '100%', onComplete: () => updateQuestion()})
    questionUpdateAnimation.to('main', {duration: 1, ease: 'Power3.easeOut', x: 0})
    questionUpdateAnimation.to('main', {scale: 1, filter: 'blur(0px)', duration: 1, ease: 'Power2.easeOut'}, '<0.3')
    // confetti()
}

document.querySelectorAll('#answer').forEach(e => { // add click functions for the answers
    e.addEventListener('click', () => {
        (e.classList.contains('true-answer')) ? rightAnswer() : wrongeAnswer()
    })
})

updateQuestion()