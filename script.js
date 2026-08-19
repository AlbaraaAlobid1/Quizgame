const questions = [
  {
    category: 'Allgemeinwissen',
    question: 'Wie viele Kontinente gibt es auf der Erde?',
    answers: ['Fünf', 'Sechs', 'Sieben', 'Acht'],
    correctAnswer: 'Sieben'
  },
  {
    category: 'Wissenschaft',
    question: 'Welcher Planet ist der Sonne am nächsten?',
    answers: ['Venus', 'Merkur', 'Mars', 'Jupiter'],
    correctAnswer: 'Merkur'
  },
  {
    category: 'Geografie',
    question: 'Was ist die Hauptstadt von Frankreich?',
    answers: ['Madrid', 'Rom', 'Paris', 'Lissabon'],
    correctAnswer: 'Paris'
  },
  {
    category: 'Geschichte',
    question: 'Wie viele Tage hat ein Schaltjahr?',
    answers: ['364', '365', '366', '367'],
    correctAnswer: '366'
  },
  {
    category: 'Natur',
    question: 'Welches Tier wird oft als König der Tiere bezeichnet?',
    answers: ['Elefant', 'Tiger', 'Löwe', 'Wolf'],
    correctAnswer: 'Löwe'
  }
];

let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;
const savedTheme = localStorage.getItem('quizgame-theme');

const elements = {
  category: document.querySelector('#category'),
  question: document.querySelector('#question'),
  answers: document.querySelector('#answers'),
  score: document.querySelector('#score'),
  counter: document.querySelector('#question-counter'),
  percent: document.querySelector('#progress-percent'),
  progressBar: document.querySelector('#progress-bar'),
  feedback: document.querySelector('#feedback'),
  nextButton: document.querySelector('#next-button'),
  themeButton: document.querySelector('#theme-button')
};

function setTheme(isDarkMode) {
  document.body.classList.toggle('dark-mode', isDarkMode);
  elements.themeButton.textContent = isDarkMode ? '☀' : '☾';
  elements.themeButton.setAttribute('aria-label', isDarkMode ? 'Light Mode aktivieren' : 'Dark Mode aktivieren');
  elements.themeButton.setAttribute('title', isDarkMode ? 'Light Mode aktivieren' : 'Dark Mode aktivieren');
  localStorage.setItem('quizgame-theme', isDarkMode ? 'dark' : 'light');
}

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;
  const progress = Math.round((questionNumber / questions.length) * 100);

  hasAnswered = false;
  elements.category.textContent = currentQuestion.category;
  elements.question.textContent = currentQuestion.question;
  elements.counter.textContent = `Frage ${questionNumber} von ${questions.length}`;
  elements.percent.textContent = `${progress}%`;
  elements.progressBar.style.width = `${progress}%`;
  elements.feedback.textContent = '';
  elements.nextButton.disabled = true;
  elements.nextButton.textContent = questionNumber === questions.length ? 'Ergebnis anzeigen' : 'Nächste Frage';
  elements.answers.replaceChildren();

  currentQuestion.answers.forEach((answer) => {
    const answerButton = document.createElement('button');
    answerButton.className = 'answer-button';
    answerButton.type = 'button';
    answerButton.textContent = answer;
    answerButton.addEventListener('click', () => selectAnswer(answerButton, answer, currentQuestion.correctAnswer));
    elements.answers.append(answerButton);
  });
}

function selectAnswer(selectedButton, answer, correctAnswer) {
  if (hasAnswered) return;
  hasAnswered = true;

  const answerButtons = elements.answers.querySelectorAll('.answer-button');
  answerButtons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === correctAnswer) button.classList.add('correct');
  });

  if (answer === correctAnswer) {
    score += 1;
    elements.score.textContent = score;
    elements.feedback.textContent = 'Richtig!';
  } else {
    selectedButton.classList.add('wrong');
    elements.feedback.textContent = `Leider falsch. Richtig ist: ${correctAnswer}`;
  }

  elements.nextButton.disabled = false;
}

function showResult() {
  elements.category.textContent = 'Quiz beendet';
  elements.question.textContent = `Du hast ${score} von ${questions.length} Punkten erreicht.`;
  elements.answers.replaceChildren();
  elements.feedback.textContent = score === questions.length ? 'Perfekt! Alle Antworten waren richtig.' : 'Gut gemacht! Starte das Quiz erneut und verbessere deinen Punktestand.';
  elements.nextButton.textContent = 'Nochmal spielen';
  elements.nextButton.disabled = false;
  elements.progressBar.style.width = '100%';
  elements.progressPercent.textContent = '100%';
  elements.counter.textContent = 'Ergebnis';
}

elements.nextButton.addEventListener('click', () => {
  if (currentQuestionIndex === questions.length - 1) {
    showResult();
    currentQuestionIndex += 1;
    return;
  }

  if (currentQuestionIndex >= questions.length) {
    currentQuestionIndex = 0;
    score = 0;
    elements.score.textContent = score;
  } else {
    currentQuestionIndex += 1;
  }

  renderQuestion();
});

elements.themeButton.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark-mode'));
});

setTheme(savedTheme === 'dark');
renderQuestion();
