document.getElementById('start-button').addEventListener('click', () => {
    // Cacher la page d'ouverture
    document.getElementById('opening-page').style.display = 'none';
    // Afficher le contenu du jeu
    document.getElementById('game-content').style.display = 'block';
});


function showCustomAlert(title, message) {
    document.getElementById('alert-title').innerText = title;
    document.getElementById('alert-message').innerText = message;
    document.getElementById('custom-alert').style.display = 'block';
}

function closeCustomAlert() {
    document.getElementById('custom-alert').style.display = 'none';
}

// Déclarations des variables globales
let gameState = {
    // flags ou notes
    visitedLocations: {},
    accused: null,
    knownSuspects: [], // Ajouter cette ligne
};

// Objets des dialogues et des choix pour chaque lieu
const dialogues = {
    cinema: {
        name: "Esmeralda",
        dialogues: [
            {
                text: "Bonjour, Esmeralda ? Je suis Konan, détective privé. Je suis désolé pour votre perte.",
                responses: [
                    {
                        text: "Merci... Pauline était ma meilleure amie. C'est si difficile de croire qu'elle est partie.",
                        next: 1,
                    }
                ]
            },
            {
                text: "Quelle était votre relation avec Pauline ?",
                condition: () => true,
                responses: [
                    {
                        text: "Elle venait de temps en temps. On discutait, c'est tout.",
                        next: 2,
                    }
                ]
            },

        ],
        library: {
            name: "Ingrid",
            dialogues: [
                
            ],
        },
    },
};

// Gestionnaire d'événements pour les lieux
const locations = document.querySelectorAll('.location');
locations.forEach(location => {
    location.addEventListener("click", () => {
        console.log(location.id)
        const locationId = location.id;
        if (locationId == "police") {
            accuseSuspect();
        } else {
            startDialogue(locationId);
        }
    });
});

// Fonction pour démarrer un dialogue
function startDialogue(locationId) {
    const location = dialogues[locationId];
    if (!location) return;

    // Ajouter le suspect à la liste des suspects connus
    const personDialogue = location.name
    if (!gameState.knownSuspects.includes(personDialogue)) {
        gameState.knownSuspects.push(personDialogue);
    }

    gameState.currentDialogue = location.dialogues[0]

    showDialogue(locationId);
}


function showDialogue(locationId) {
    const dialogueBox = document.getElementById('dialogue-box');
    const dialogueContent = document.getElementById('dialogue-content');
    const choices = document.getElementById('choices');

    const location = dialogues[locationId];
    const dialogue = gameState.currentDialogue;


    // Afficher le texte du dialogue
    dialogueContent.innerHTML = `<p><strong>Vous :</strong> ${dialogue.text}</p>`;

}

function closeDialogue() {
    const dialogueBox = document.getElementById('dialogue-box');
    const dialogueContent = document.getElementById('dialogue-content');
    const choices = document.getElementById('choices');

    dialogueContent.innerHTML = '';
    choices.innerHTML = '';
}

// Fonction pour accuser un suspect
function accuseSuspect() {
    if (gameState.knownSuspects.length === 0) {
        showCustomAlert("Erreur", "Vous n'avez encore rencontré personne à accuser.");
        return;
    }

    let suspectList = gameState.knownSuspects.join(', ');
    const suspect = prompt(`Qui voulez-vous accuser ? (${suspectList})`);

    if (gameState.knownSuspects.includes(suspect)) {
        checkAccusation(suspect);
    } else {
        showCustomAlert("Erreur", "Cet personne n'est pas dans liste.");
    }
};

// Fonction pour vérifier si l'accusation est correcte
function checkAccusation(suspect) {
    const culprit = 'choisie';
    if (suspect === culprit) {
        alert("Félicitations ! Vous avez trouvé le véritable coupable : .");
    } else {
        alert("Désolé, ce n'est pas le bon coupable. Vous êtes un mauvais détective.");
        // Recharger la page pour réinitialiser le jeu
        setTimeout(function() {
            window.location.reload();
        }, 3000); // 3000 millisecondes = 3 secondesw
    }
};

function startByPolice() {

};

function showCharacter() {
    
};

function moveCharacter() {

};