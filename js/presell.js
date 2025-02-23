const questionElement = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const loadingEnd = document.querySelector('.loading');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let scorePercent = 0;

const questions = [
    {
        question: 'Você tem mais de 10 mil seguidores?',
        choice1: 'Sim',
        choice2: 'Não',
        answer: 1 // 1 para a primeira escolha
    },
    {
        question: 'Você usa Instagram para trabalho?',
        choice1: 'Sim',
        choice2: 'Não',
        answer: 1 // 1 para a primeira escolha
    },
];

const MAX_QUESTIONS = questions.length;

const startGame = () => {
    questionCounter = 0;
    scorePercent = 0;
    availableQuestions = [...questions]; // Copia as perguntas
    getNewQuestion();
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        endGame();
        return;
    }

    progressText.innerText = `Questão ${questionCounter + 1}`;
    progressBarFull.style.width = `${((questionCounter) / MAX_QUESTIONS) * 100}%`;
    scoreText.innerText = `${scorePercent}%`;

    currentQuestion = availableQuestions[questionCounter];
    questionElement.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    acceptingAnswers = true;
    questionCounter++;
};

const endGame = () => {
    const game = document.querySelector('#game');
    const border = document.querySelector(".container");
    border.style.border = `none`;
    loadingEnd.style.display = `block`;
    game.style.display = `none`;

    setTimeout(() => {
        window.location.assign('home.html');
    }, 5000);
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 500);
    });
});

startGame(); 