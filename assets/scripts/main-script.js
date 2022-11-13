const quiz = [
    {
        'key': 'a',
        'question': 'First letter of the alphabet',
        'a': 'A',
        'b': 'B',
        'c': 'C',
        'd': 'D'
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

const answers = document.querySelectorAll('#answer')

function updateQuestion() {
    document.getElementById('question-text').textContent = quiz[questionNumber - 1].question
    document.querySelectorAll('#answer').forEach(e => {
        e.textContent = quiz[questionNumber - 1][`${e.getAttribute('choice')}`]
        if (quiz[questionNumber - 1].key === e.getAttribute('choice')) {
            e.classList.toggle('true-answer', true)
            e.classList.toggle('false-answer', false)
        } else {
            e.classList.toggle('false-answer', true)
            e.classList.toggle('true-answer', false)
        }
        e.addEventListener('click', () => {
            if (e.classList.value == 'true-answer') {
                console.log('correct answer')
                questionNumber++
                updateQuestion()
            } else {
                console.log('wronge answer')
            }
        })
    })
}



updateQuestion()