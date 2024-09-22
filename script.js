// Your existing code
const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false},
            { text: "Madrid", correct:false},
            { text: "Paris", correct:true},
            { text:"Lisbon", correct:false},
        ],
    },
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "3", correct: false},
            { text: "4", correct: true},
            { text: "5", correct: false},
            { text: "6", correct: false}
        ],
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const downloadButton = document.getElementById('download-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    document.getElementById('download-btn').style.display = "none"; // Hide download button when starting the quiz
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    document.getElementById('download-btn').style.display = "block"; // Show the download button
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

// CSV download functionality
function downloadCSV() {
    const csvRows = [];
    csvRows.push("Question,Your Answer,Correct Answer");

    questions.forEach((q, idx) => {
        let correctAnswer = q.answers.find(ans => ans.correct).text;
        let yourAnswer = Array.from(answerButtons.children).find(btn => btn.classList.contains('correct') || btn.classList.contains('incorrect')).innerText;
        csvRows.push(`"${q.question}","${yourAnswer}","${correctAnswer}"`);
    });

    csvRows.push(`\nTotal Score, ${score}/${questions.length}`);

    // Create a blob from the CSV string
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Create a link to download it
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'quiz_results.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
downloadButton.addEventListener('click', downloadCSV);

startQuiz();
