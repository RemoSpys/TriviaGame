let players = []; // Mängijad
let playerNames = []; // Mängijate nimed
let currentPlayer = 0; // Praegune mängija
let playerCount = 1; // Mängijate arv
let playerScores = [0, 0, 0]; // Mängijate skoorid
let usedQuestions = []; // Kasutatud küsimused
let questionsPerPlayer = 5; // Küsimuste arv mängija kohta

// Jälgib mängijate arvu muutust
document.getElementById('playerCount').addEventListener('change', displayPlayerNameInputs); 
// Jälgib "Start" nupu vajutamist
document.getElementById('startGame').addEventListener('click', startGame); 
// Jälgib "Restart" nupu vajutamist
document.getElementById('restartGame').addEventListener('click', restartGame);

// Kuvab sisendväljad mängijate nimede sisestamiseks vastavalt mängijate arvule
function displayPlayerNameInputs() {
    const count = parseInt(document.getElementById('playerCount').value); // Mängijate arv
    const playerNamesDiv = document.getElementById('playerNames'); // Mängijate nimede ala
    playerNamesDiv.innerHTML = `   
        <label class="block text-xl">Player 1 Name:</label>
        <input type="text" id="playerName1" class="border-2 rounded p-2 text-black w-full max-w-xs mx-auto mb-4" placeholder="Enter Player 1 Name">
    `;

    // Lisab sisendväljad teiste mängijate nimede jaoks
    for (let i = 2; i <= count; i++) {
        playerNamesDiv.innerHTML += `
            <label class="block text-xl">Player ${i} Name:</label> 
            <input type="text" id="playerName${i}" class="border-2 rounded p-2 text-black w-full max-w-xs mx-auto mb-4" placeholder="Enter Player ${i} Name">
        `;
    }
}

// Käivitab mängu ja algatab kõik vajalikud muutujad
function startGame() {
    playerCount = parseInt(document.getElementById('playerCount').value); // Mängijate arv
    questionsPerPlayer = parseInt(document.getElementById('questionCount').value); // Küsimuste arv mängija kohta
    players = [];
    playerNames = [];
    usedQuestions = [];
    playerScores = [0, 0, 0]; // Nullib skoorid

    // Kogub mängijate nimed
    for (let i = 1; i <= playerCount; i++) {
        const playerName = document.getElementById(`playerName${i}`).value || `Player ${i}`; // Kui nimi on tühi, lisab "Player X"
        playerNames.push(playerName);
    }

    // Kuvab mänguala ja peidab mängijate seadistuse ala
    document.getElementById('playerSetup').classList.add('hidden');
    document.getElementById('gameArea').classList.remove('hidden');
    currentPlayer = 0; // Algatab esimese mängija
    document.getElementById('playerTurn').textContent = `${playerNames[currentPlayer]}'s Turn`; // Kuvab, kelle kord on
    loadQuestion(); // Laadib küsimuse
}

// Laadib küsimuse ja kuvab selle
function loadQuestion() {
    const selectedCategory = document.getElementById('category').value; // Valitud kategooria
    let questionSet = shuffleQuestions().filter(q => !usedQuestions.includes(q)); // Segab küsimused ja eemaldab juba kasutatud küsimused

    // Filtreerib küsimused vastavalt valitud kategooriale
    if (selectedCategory !== "All") {
        questionSet = questionSet.filter(q => q.category === selectedCategory);
    }

    // Kui rohkem küsimusi pole, näitab tulemustetahvlit
    if (questionSet.length === 0) {
        showScoreboard();
        return;
    }

    let playerQuestion = questionSet[0]; // Võtab esimese küsimuse
    usedQuestions.push(playerQuestion); // Lisab küsimuse kasutatud küsimuste hulka
    displayQuestion(playerQuestion); // Kuvab küsimuse
}

// Kuvab küsimuse ja vastuse valikud
function displayQuestion(questionObj) {
    document.getElementById('questionArea').textContent = questionObj.question; // Kuvab küsimuse
    document.getElementById('answerOptions').innerHTML = ''; // Tühjendab vanad vastuse valikud
    questionObj.options.forEach((option, index) => {
        const btn = document.createElement('button'); // Loob vastuse nupu
        btn.classList.add('bg-green-500', 'text-white', 'p-2', 'm-2', 'rounded', 'btn-option'); // Lisab stiili nupule
        btn.textContent = option; // Lisab vastuse teksti nupule
        btn.addEventListener('click', () => handleAnswer(index, questionObj.answer)); // Lisab vastuse klõpsu sündmuse
        document.getElementById('answerOptions').appendChild(btn); // Lisab nupu DOM-i
    });
}

// Kontrollib, kas vastus on õige ja haldab mängijate käike
function handleAnswer(selected, correct) {
    document.querySelectorAll('.btn-option').forEach((btn, index) => {
        if (index === correct) {
            btn.classList.add('correct'); // Õige vastuse korral roheline taust
        } else if (index === selected) {
            btn.classList.add('selected-incorrect'); // Vale valitud vastuse korral sinine taust
        } else {
            btn.classList.add('incorrect'); // Ülejäänud valedel vastustel punane taust
        }
        btn.disabled = true; // Keelab nuppude edasise klõpsamise
    });

    // Kui vastus on õige, lisab skoori
    if (selected === correct) {
        playerScores[currentPlayer]++;
    }
    currentPlayer++; // Liigub järgmise mängija juurde
    if (currentPlayer >= playerCount) {
        currentPlayer = 0;
    }

    // Ootab 2 sekundit ja kas kuvab uue küsimuse või tulemused
    setTimeout(() => {
        if (usedQuestions.length >= playerCount * questionsPerPlayer) {
            showScoreboard(); // Kuvab tulemused, kui kõik küsimused on vastatud
        } else {
            document.getElementById('playerTurn').textContent = `${playerNames[currentPlayer]}'s Turn`; // Kuvab, kelle kord on
            loadQuestion(); // Laadib järgmise küsimuse
        }
    }, 2000); 
}

// Kuvab tulemuste tahvli pärast mängu lõppu
function showScoreboard() {
    document.getElementById('gameArea').classList.add('hidden'); // Peidab mänguala
    document.getElementById('scoreboard').classList.remove('hidden'); // Kuvab tulemuste ala
    let scoreDisplay = '';
    for (let i = 0; i < playerCount; i++) {
        scoreDisplay += `${playerNames[i]}: ${playerScores[i]} points<br>`; // Kuvab iga mängija punktid
    }
    document.getElementById('finalScores').innerHTML = scoreDisplay; // Kuvab lõplikud tulemused
}

// Restardib mängu
function restartGame() {
    document.getElementById('scoreboard').classList.add('hidden'); // Peidab tulemuste ala
    document.getElementById('playerSetup').classList.remove('hidden'); // Kuvab mängu seadistamise ala
    displayPlayerNameInputs(); // Kuvab mängijate nimede sisendi
}

// Segab küsimused juhuslikus järjekorras
function shuffleQuestions() {
    return questions.sort(() => Math.random() - 0.5);
}
