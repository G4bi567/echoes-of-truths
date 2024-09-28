document.getElementById('start-button').addEventListener('click', () => {
    // Cacher la page d'ouverture
    document.getElementById('opening-page').style.display = 'none';
    
    // Afficher le dialogue d'intro avec le policier
    startByPolice();
    // Afficher le contenu du jeu
    //document.getElementById('game-content').style.display = 'block';
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
    note: [],
    visitedLocations: {},
    accused: null,
    knownSuspects: [], // Ajouter cette ligne
    completedDialogues: {
        cinema: [],
    }
};

// Ajoute les notes
function addNote(Notes) {
    if (!gameState.knownSuspects.includes(Notes)) {
        gameState.knownSuspects.push(Notes);
    }
}

// Si le detective a les notes
function hasNote(Notes) {
    return gameState.knownSuspects.includes(Notes)
}

// Objets des dialogues et des choix pour chaque lieu
const dialogues = {
    police: {
        name: "Gordon",
        dialogues: [
            {
                id: 0,
                text: "",
                condition: () => true,
                responses: [
                    {}
                ]
            }
        ]
    },
    
    cinema: {
        name: "Esmeralda",
        dialogues: [
            {   
                id: 0,
                text: "Bonjour, Esmeralda ? Je suis Konan, détective privé. Je suis désolé pour votre perte.",
                responses: [
                    {
                        text: "Merci... Pauline était ma meilleure amie. C'est si difficile de croire qu'elle est partie.",
                        next: 1,
                    }
                ]
            },
            {   
                id:1,
                text: "Comment allait Pauline ces derniers temps ?",
                condition: () => true,	
                responses: [
                    {
                        text: "Elle était stressée, mais aussi déterminée. Elle travaillait sur une grande enquête. Elle disait que c'était dangereux, mais qu'elle ne pouvait pas abandonner.",
                        action: () => addNote("Pauline enquêtait sur une association secrète de censure"),
                        next: 2,
                    }
                ]
            },
            {   
                id: 2,
                text: "Avez-vous remarqué quelque chose d'inhabituel autour d'elle ?",
                condition: () => true,
                responses: [
                    {
                        text: "Oui, elle se sentait suivie. Elle m'a dit qu'elle voyait souvent le même homme, grand, avec un manteau sombre, près du cinéma.",
                        action: () => addNote("Un homme mystérieux suit Pauline"),
                        next: 3,
                    }
                ]
            },
            {   
                id: 3,
                text: "Que pouvez-vous me dire sur Philibert  ?",
                condition: () => hasNote("Le journaliste rival ?"),
                responses: [
                    {
                        text: "Philibert et Pauline étaient en compétition. Elle pensait qu'il essayait de saboter son enquête. Ils se sont disputés violemment ici, il y a quelques jours.",
                        action: () => addNote("Pauline soupçonnait Philibert de saboter son travail."),
                        next: 3,
                    }
                ]
            },
        ],
    },

    library: {
        name: "Ingrid",
        dialogues: [
            
        ],
    },

    bar: {
        name: "Pedro",
        dialogues: [

        ]
    },

    hotel: {
        name: "Polnareff",
        dialogues: [

        ]
    },

    cybercafe: {
        name: "Sophie",
        dialogues: [

        ]
    },

    journal: {
        name: "Philibert",
        dialogues: [
            
        ]
    }
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
    choices.innerHTML = '';
    console.log("hello")
    dialogue.responses.forEach((response, index) => {
        const button = document.createElement('button');
        button.innerText = response.text;
        console.log(response.text)
    });

    
};

function closeDialogue() {
    const dialogueBox = document.getElementById('dialogue-box');
    const dialogueContent = document.getElementById('dialogue-content');
    const choices = document.getElementById('choices');

    dialogueContent.innerHTML = '';
    choices.innerHTML = '';
};

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
    // Affiche le dialogue d'intro avec le policier
    document.getElementById('').style.display = 'block';
};

function showCharacter() {
    
};

function moveCharacter() {

};