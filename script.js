const questions = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Lisbon"
        },
        correctAnswer: "c"
    },
    {
        question: "What is 2 + 2?",
        answers: {
            a: "3",
            b: "4",
            c: "5",
            d: "6"
        },
        correctAnswer: "b"
    }
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

let selectedAnswers = [];

// Build quiz
function buildQuiz() {
    const output = [];

    questions.forEach((currentQuestion, questionIndex) => {
        const answers = [];

        for (let letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionIndex}" value="${letter}" onclick="selectAnswer(this, ${questionIndex})">
                    ${letter}: ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

// Show correct answer as soon as the user selects an option
function selectAnswer(selectedInput, questionIndex) {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    const answerContainer = answerContainers[questionIndex];
    const selectedAnswer = selectedInput.value;

    selectedAnswers[questionIndex] = selectedAnswer;

    // Highlight the correct answer and selected answer immediately
    answerContainer.querySelectorAll('label').forEach(label => {
        const input = label.querySelector('input');

        // If it's the correct answer, highlight in green
        if (input.value === questions[questionIndex].correctAnswer) {
            label.classList.add('correct');
            label.classList.remove('incorrect');
        } 
        // If it's the wrong selected answer, highlight in red
        else if (input.value === selectedAnswer) {
            label.classList.add('incorrect');
            label.classList.remove('correct');
        } 
        // Remove any previous highlights from other options
        else {
            label.classList.remove('correct');
            label.classList.remove('incorrect');
        }
    });
}

// Show score after clicking the Submit button
function showResults() {
    let score = 0;

    // Check if the selected answers are correct
    questions.forEach((currentQuestion, questionIndex) => {
        if (selectedAnswers[questionIndex] === currentQuestion.correctAnswer) {
            score++;
        }
    });

    // Display the score
    resultsContainer.innerHTML = `You scored ${score} out of ${questions.length}`;
}

// Initial quiz build
buildQuiz();

// Add event listener to Submit button
submitButton.addEventListener('click', showResults);
