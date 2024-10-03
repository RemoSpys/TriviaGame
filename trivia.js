//küsimused ja vastused
const questions = [
    { category: "General", question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: 0 },
    { category: "General", question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Tolstoy", "Hemingway", "Fitzgerald"], answer: 0 },
    { category: "General", question: "What planet is closest to the Sun?", options: ["Earth", "Mars", "Mercury", "Venus"], answer: 2 },
    { category: "General", question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
    { category: "General", question: "What is the chemical symbol for water?", options: ["H2O", "O2", "HO", "O3"], answer: 0 },
    { category: "General", question: "In which year did WWI start?", options: ["1914", "1912", "1916", "1920"], answer: 0 },
    { category: "General", question: "Which planet is known as the Red Planet?", options: ["Mars", "Jupiter", "Saturn", "Earth"], answer: 0 },
    { category: "General", question: "What is the hardest natural substance on Earth?", options: ["Iron", "Diamond", "Gold", "Silver"], answer: 1 },
    { category: "General", question: "Which organ pumps blood through the body?", options: ["Brain", "Heart", "Lungs", "Kidney"], answer: 1 },
    { category: "General", question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2 }
];

let players = []; //mängijad
let playerNames = []; //mängijate nimed
let currentPlayer = 0; //kes mängib
let playerCount = 1; //mitu mängijat on
let playerScores = [0, 0, 0]; //skoorid
let usedQuestions = []; //mis küsimused on olnud

// Jälgib mängijate arvu muutust
document.getElementById('playerCount').addEventListener('change', displayPlayerNameInputs); 
document.getElementById('startGame').addEventListener('click', startGame); // Jälgib kui vajutada start nuppu 
document.getElementById('restartGame').addEventListener('click', restartGame); // Jälgib kui vajutada restart nuppu peale mängimist

function displayPlayerNameInputs() {
    const count = parseInt(document.getElementById('playerCount').value); // Mitu mängijat mängib
    const playerNamesDiv = document.getElementById('playerNames'); // Kuvab mängijate nimed
    playerNamesDiv.innerHTML = `   
        <label class="block text-xl">Player 1 Name:</label>
        <input type="text" id="playerName1" class="border-2 rounded p-2 text-black w-full max-w-xs mx-auto mb-4" placeholder="Enter Player 1 Name">
    `;
// Teeb mängijate nimede jaoks kastid
    for (let i = 2; i <= count; i++) {
        playerNamesDiv.innerHTML += `
            <label class="block text-xl">Player ${i} Name:</label>n 
            <input type="text" id="playerName${i}" class="border-2 rounded p-2 text-black w-full max-w-xs mx-auto mb-4" placeholder="Enter Player ${i} Name">
        `;
    }
}

function startGame() { // Kuvab mitu mängijat mängib ja kuvab nende nimed
    playerCount = parseInt(document.getElementById('playerCount').value);
    players = [];
    playerNames = [];

    // Collect player names
    for (let i = 1; i <= playerCount; i++) {
        const playerName = document.getElementById(`playerName${i}`).value || `Player ${i}`;
        playerNames.push(playerName);
    }

    usedQuestions = []; // Lisab  mis küsimus on küsitud
    playerScores = [0, 0, 0]; // Mängijate skoorid
    document.getElementById('playerSetup').classList.add('hidden');  
    document.getElementById('gameArea').classList.remove('hidden'); // Stiil
    currentPlayer = 0; // Näitab kelle kord on
    document.getElementById('playerTurn').textContent = `${playerNames[currentPlayer]}'s Turn`; // Näitab nimeliselt kelle kord on
    loadQuestion(); 
}

function loadQuestion() {  // Funktsioon
    let questionSet = shuffleQuestions().filter(q => !usedQuestions.includes(q)); // Segab küsimused ja filteerib välja kasutatud kpsimused
    let playerQuestion = questionSet[0]; // Esitab 1. küsimuse
    usedQuestions.push(playerQuestion); // Pushib usedQuestionsisse selle küsimuse
    displayQuestion(playerQuestion); // Siis Kuvab küsimuse 
}

function displayQuestion(questionObj) {
    document.getElementById('questionArea').textContent = questionObj.question;
    document.getElementById('answerOptions').innerHTML = '';
    questionObj.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.classList.add('bg-green-500', 'text-white', 'p-2', 'm-2', 'rounded', 'btn-option');
        btn.textContent = option;
        btn.addEventListener('click', () => handleAnswer(index, questionObj.answer));
        document.getElementById('answerOptions').appendChild(btn);
    });
}

function handleAnswer(selected, correct) {
    document.querySelectorAll('.btn-option').forEach((btn, index) => {
        if (index === correct) {
            btn.classList.add('correct');
        } else if (index === selected) {
            btn.classList.add('selected-incorrect');
        } else {
            btn.classList.add('incorrect');
        }
        btn.disabled = true; // Disable buttons after selection
    });

    if (selected === correct) {
        playerScores[currentPlayer]++;
    }
    currentPlayer++;
    if (currentPlayer >= playerCount) {
        currentPlayer = 0;
    }
    setTimeout(() => {
        if (usedQuestions.length >= playerCount * 3) {
            showScoreboard();
        } else {
            document.getElementById('playerTurn').textContent = `${playerNames[currentPlayer]}'s Turn`;
            loadQuestion();
        }
    }, 2000); // 2 second delay for next question
}

function showScoreboard() {
    document.getElementById('gameArea').classList.add('hidden');
    document.getElementById('scoreboard').classList.remove('hidden');
    let scoreDisplay = '';
    for (let i = 0; i < playerCount; i++) {
        scoreDisplay += `${playerNames[i]}: ${playerScores[i]} points<br>`;
    }
    document.getElementById('finalScores').innerHTML = scoreDisplay;
}

function restartGame() {
    document.getElementById('scoreboard').classList.add('hidden');
    document.getElementById('playerSetup').classList.remove('hidden');
    displayPlayerNameInputs();
}

function shuffleQuestions() {
    return questions.sort(() => Math.random() - 0.5);
}
