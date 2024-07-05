let correctAnswers = 0;
let attempts = 0;

const questions = [
    {
        question: "Pregunta 1: ¿Qué juego saldrá antes?",
        options: ["Hollow Knight Silksong", "Bloodborne PC"],
        correctAnswer: "Ninguno",
        feedback: "La respuesta correcta es Ninguno.",
        incorrectFeedback: "Incorrecto."
    },
    {
        question: "Pregunta 2: ¿Cuál es el mejor juego de mundo abierto?",
        options: ["Zelda BOTW", "Fallout", "Skyrim", "RDR2"],
        correctAnswer: "Zelda BOTW",
        feedback: "¡Correcto! Zelda BOTW es el mejor juego de mundo abierto.",
        incorrectFeedback: "Incorrecto. Vuelva a intentarlo."
    },
    {
        question: "Pregunta 3: Escribe tu nombre sin apellido",
        correctAnswer: "iker joaquin",
        feedback: "Felicidades mariconazo, has completado el quiz. Por cierto mira steam",
        incorrectFeedback: "Incorrecto. Vuelva a intentarlo (je je je)."
    }
];

function checkAnswer(questionIndex, answer, button) {
    const feedbackElement = document.getElementById('feedback');
    const optionsElement = document.getElementById('options');

    button.classList.add('selected');

    if (questionIndex === 1 && answer !== "Ninguno") {
        attempts++;
        feedbackElement.textContent = questions[questionIndex - 1].incorrectFeedback;
        if (attempts >= 2 && !optionsElement.querySelector("button[value='Ninguno']")) {
            const noneButton = document.createElement("button");
            noneButton.textContent = "Ninguno";
            noneButton.setAttribute("onclick", `checkAnswer(1, 'Ninguno', this)`);
            noneButton.value = "Ninguno";
            optionsElement.appendChild(noneButton);
        }
    } else if (questionIndex === 2 && answer !== "Zelda BOTW") {
        feedbackElement.textContent = questions[questionIndex - 1].incorrectFeedback;
        button.textContent = "Zelda BOTW";
        button.setAttribute("onclick", `checkAnswer(2, 'Zelda BOTW', this)`);
    } else if (answer.toLowerCase() === questions[questionIndex - 1].correctAnswer.toLowerCase()) {
        correctAnswers++;
        feedbackElement.textContent = questions[questionIndex - 1].feedback;
        revealCode(correctAnswers);
        if (questionIndex < questions.length) {
            setTimeout(() => loadNextQuestion(questionIndex + 1), 1000);
        } else {
            feedbackElement.textContent += " ¡Has completado el quiz!";
        }
    } else {
        feedbackElement.textContent = questions[questionIndex - 1].incorrectFeedback;
    }
}

function revealCode(part) {
    const codeSnippets = [
        "JJBBB",
        "-5DCMX",
        "-MZET4"
    ];

    document.getElementById('hiddenCode').textContent += codeSnippets[part - 1];
}

function loadNextQuestion(nextQuestionIndex) {
    document.getElementById('question').textContent = questions[nextQuestionIndex - 1].question;
    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';
    if (nextQuestionIndex === 3) {
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.id = "nameInput";
        optionsElement.appendChild(inputElement);
        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.setAttribute("onclick", `checkAnswer(3, document.getElementById('nameInput').value, this)`);
        optionsElement.appendChild(submitButton);
    } else {
        questions[nextQuestionIndex - 1].options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.setAttribute("onclick", `checkAnswer(${nextQuestionIndex}, '${option}', this)`);
            optionsElement.appendChild(button);
        });
    }
    document.getElementById('feedback').textContent = '';
}

// Load the first question initially
window.onload = function() {
    document.getElementById('question').textContent = questions[0].question;
}
