document.getElementById('start-button').addEventListener('click', () => {
    // Cacher la page d'ouverture
    document.getElementById('opening-page').style.display = 'none';
    
    // Afficher le dialogue d'intro avec le policier
    startByPolice();
    
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
    note: [],
    visitedLocations: {},
    accused: null,
    knownSuspects: [], // Ajouter cette ligne
    completedDialogues: {
        police: [],
        cinema: [],
        library: [],
        bar: [],
        hotel: [],
        cybercafe: [],
        journal: []
    }
};

// Ajoute une note (c'est-à-dire marque un dialogue comme complété) pour une location donnée
function addNote(locationId, note) {
    if (!gameState.note.includes(note)) {
        gameState.note.push(note);
    }
}

function hasNote(locationId, note) {
    return gameState.note.includes(note); // This checks if the note exists in the notes array, not completedDialogues
}


// Objets des dialogues et des choix pour chaque lieu
let dialogues = { 
    police: {
        name: "Commissaire Gordon",
        dialogues: [
            {
                id: 0,
                text: "Konan, nous avons besoin de vos talents. Pauline Geanne, une journaliste respectée, a été retrouvée morte à l'hôtel 'Les Étoiles'. Elle travaillait sur une enquête sensible concernant une association secrète de censure. De plus, le cybercafé 'Le Nexus' a été piraté récemment, et nous pensons que c'est lié. Votre mission est de découvrir la vérité et d'identifier le coupable.",
                responses: [
                    {
                        text: "Je ferai tout mon possible, commissaire. Par où dois-je commencer ?",
                        next: 1,
                    }
                ]
            },
            {
                id: 1,
                text: "Parlez aux personnes proches de Pauline. Peut-être que sa meilleure amie Esmeralda au cinéma 'Le Lumière' pourra vous aider.",
                responses: [
                    {
                        text: "Entendu ! Je pars sur le champ.",
                        next: null,
                    }
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
                        text: "(Déprimée) Merci... Pauline était ma meilleure amie. C'est si difficile de croire qu'elle est partie.",
                        next: 1,
                    }
                ]
            },
            {   
                id: 1,
                text: "Comment allait Pauline ces derniers temps ?",
                condition: () => true,	
                responses: [
                    {
                        text: "Elle était stressée, mais aussi déterminée. Elle travaillait sur une grande enquête. Elle disait que c'était dangereux, mais qu'elle ne pouvait pas abandonner.",
                        action: () => addNote("cinema", "Pauline enquêtait sur une association secrète de censure"),
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
                        action: () => addNote("cinema", "Un homme mystérieux suit Pauline"),
                        next: 3,
                    }
                ]
            },
            {   
                id: 3,
                text: "Que pouvez-vous me dire sur Philibert ?",
                condition: () => hasNote("cinema", "Le journaliste rival ?"),
                responses: [
                    {
                        text: "Philibert et Pauline étaient en compétition. Elle pensait qu'il essayait de saboter son enquête. Ils se sont disputés violemment ici, il y a quelques jours.",
                        action: () => addNote("cinema", "Pauline soupçonnait Philibert de saboter son travail."),
                        next: null,
                    }
                ]
            }
        ]
    },

    library: {
        name: "Ingrid",
        dialogues: [
            {
                id: 0,
                text: "Bonjour, Ingrid ? Je suis Konan, détective privé. J'ai des questions sur Pauline Geanne.",
                responses: [
                    {
                        text: "Je suis désolée pour ce qui lui est arrivé. Comment puis-je vous aider ?",
                        next: 1,
                    }
                ]
            },
            {
                id: 1,
                text: "Que savez-vous de l'association de censure dont Pauline enquêtait ?",
                responses: [
                    {
                        text: "Je ne suis pas au courant de telles choses.",
                        next: 2,
                    }
                ]
            },
            {
                id: 2,
                text: "Pauline fréquentait-elle votre librairie ?",
                responses: [
                    {
                        text: "Oui, elle aimait nos ouvrages rares. Nous avions des discussions intéressantes.",
                        next: 3,
                    }
                ]
            },
            {
                id: 3,
                text: "Avez-vous remarqué quelqu'un la suivre ou s'intéresser à elle ici ?",
                responses: [
                    {
                        text: "Non, je n'ai rien remarqué de tel.",
                        next: null,
                    }
                ]
            }
        ]
    },

    bar: {
        name: "Pedro",
        dialogues: [
            {
                id: 0,
                text: "Bonjour, que puis-je vous servir ?",
                responses: [
                    {
                        text: "Un café, s'il vous plaît.",
                        next: 1,
                    },
                    {
                        text: "Pedro ? Je suis Konan, détective privé. J'ai quelques questions sur Pauline Geanne.",
                        next: 1,
                    }
                ]
            },
            {
                id: 1,
                text: "Qu'est-ce que vous voulez savoir ?",
                responses: [
                    {
                        text: "Quelle était votre relation avec Pauline ?",
                        next: 2,
                    },
                    {
                        text: "Avez-vous remarqué quelqu'un la suivre ou l'observer ici ?",
                        action: () => addNote("bar", "Un homme mystérieux suit Pauline"),
                        next: 2,
                    }
                ]
            },
            {
                id: 2,
                text: "Il y avait un type louche qui venait souvent après elle. Grand, manteau sombre. Il ne commandait rien et restait près de la porte.",
                responses: [
                    {
                        text: "Merci pour votre temps.",
                        next: null,
                    }
                ]
            }
        ]
    },

    hotel: {
        name: "Polnareff",
        dialogues: [
            {
                id: 0,
                text: "Bonjour, je suis Konan, détective privé. J'ai des questions sur le meurtre de Pauline Geanne.",
                responses: [
                    {
                        text: "Je vous ai déjà dit tout ce que je savais.",
                        next: 1,
                    }
                ]
            },
            {
                id: 1,
                text: "Vos caméras étaient prétendument en maintenance le soir du meurtre. Pourquoi ?",
                responses: [
                    {
                        text: "Des problèmes techniques. Cela arrive.",
                        next: 2,
                    }
                ]
            },
            {
                id: 2,
                text: "Cachez-vous des activités illégales à l'hôtel ?",
                responses: [
                    {
                        text: "C'est ridicule. Mon hôtel est un établissement respectable.",
                        next: null,
                    }
                ]
            }
        ]
    },

    cybercafe: {
        name: "Sophie",
        dialogues: [
            {
                id: 0,
                text: "Bonjour, Sophie ? Je suis Konan, détective privé. Je mène une enquête sur Pauline Geanne.",
                responses: [
                    {
                        text: "Oui, j'ai entendu parler de ce qui lui est arrivé. C'est terrible.",
                        next: 1,
                    }
                ]
            },
            {
                id: 1,
                text: "Votre cybercafé a été piraté récemment. Pouvez-vous m'en dire plus ?",
                responses: [
                    {
                        text: "Oui, c'était une intrusion sophistiquée. Ils ont accédé à nos serveurs et volé des données.",
                        next: 2,
                    }
                ]
            },
            {
                id: 2,
                text: "Pauline utilisait-elle vos services ?",
                responses: [
                    {
                        text: "Oui, elle venait souvent pour ses recherches.",
                        next: 3,
                    }
                ]
            },
            {
                id: 3,
                text: "Avez-vous remarqué quelqu'un de suspect récemment ?",
                condition: () => hasNote("cybercafe", "Un homme mystérieux a été vu au cybercafé"),
                responses: [
                    {
                        text: "Il y avait un homme qui venait souvent, sans utiliser les ordinateurs. Grand, manteau sombre. Il semblait observer les clients.",
                        next: null,
                    }
                ]
            }
        ]
    },

    journal: {
        name: "Philibert",
        dialogues: [
            {
                id: 0,
                text: "Bonjour, vous devez être Philibert. Je suis Konan, détective privé.",
                responses: [
                    {
                        text: "Je mène une enquête sur Pauline Geanne.",
                        next: 1,
                    }
                ]
            },
            {
                id: 1,
                text: "J'ai appris que vous vous êtes disputé avec Pauline au café 'Le Port'.",
                responses: [
                    {
                        text: "Qui vous a dit ça ? Ce n'était rien de sérieux.",
                        next: 2,
                        action: () => addNote("journal", "Le journaliste rival ?"),
                    }
                ]
            },
            {
                id: 2,
                text: "Pauline vous accusait de saboter son enquête. Que répondez-vous à cela ?",
                responses: [
                    {
                        text: "Elle était paranoïaque. Je ne ferais jamais ça.",
                        next: null,
                    }
                ]
            }
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
    let location = dialogues[locationId];
    if (!location) return;

    // Ajouter le suspect à la liste des suspects connus
    const personDialogue = location.name
    if (!gameState.knownSuspects.includes(personDialogue) && personDialogue != "Gordon") {
        gameState.knownSuspects.push(personDialogue);
    }

    gameState.currentDialogue = location.dialogues[0]


    displayDialogues(locationId);
}
function displayDialogues(locationId) {
    const dialogueBox = document.getElementById('dialogue-box');
    const dialogueContent = document.getElementById('dialogue-content');
    const choices = document.getElementById('choices');

    dialogueContent.innerHTML = '';
    choices.innerHTML = '';

    const hasAskedInitialQuestion = gameState.completedDialogues[locationId].includes(0);

    // Filter valid dialogues (questions)
    let locationDialogues = dialogues[locationId].dialogues.filter(dialogue => {
        if (!hasAskedInitialQuestion) {
            return dialogue.id === 0;
        }
        return !gameState.completedDialogues[locationId].includes(dialogue.id) && (!dialogue.condition || dialogue.condition());
    });

    if (locationDialogues.length === 0) {
        dialogueContent.innerHTML = `<p>La conversation est terminée avec ${dialogues[locationId].name}.</p>`;
        const endButton = document.createElement('button');
        endButton.innerText = "Terminer la conversation";
        endButton.addEventListener('click', closeDialogue);
        choices.appendChild(endButton);
        return;
    }

    console.log(locationDialogues);

    // Check if location is 'police' (Gordon starts the conversation)
    if (locationId === "police") {
        // Gordon speaks first
        locationDialogues.forEach(dialogue => {
            dialogueContent.innerHTML = `<p><strong>${dialogues[locationId].name}:</strong> ${dialogue.text}</p>`;  // Gordon's dialogue

            // Check if responses exist
            if (dialogue.responses && dialogue.responses.length > 0) {
                dialogue.responses.forEach(response => {
                    const button = document.createElement('button');
                    button.innerText = response.text;  // Safe access to the first response
                    button.classList.add('choice-button');
                    button.addEventListener('click', () => askQuestion(locationId, dialogue.id));
                    choices.appendChild(button);
                });
            } else {
                dialogueContent.innerHTML = `<p>La conversation est terminée avec ${dialogues[locationId].name}.</p>`;
                const endButton = document.createElement('button');
                endButton.innerText = "Terminer la conversation";
                endButton.addEventListener('click', closeDialogue);
                choices.appendChild(endButton);
                return;
            }
        });
    } else {
        // For other locations, the detective starts speaking
        dialogueContent.innerHTML = `<p>Choisissez une question à poser à ${dialogues[locationId].name} :</p>`;

        locationDialogues.forEach(dialogue => {
            const button = document.createElement('button');
            button.innerText = dialogue.text;  // The detective's questions
            button.classList.add('choice-button');
            button.addEventListener('click', () => askQuestion(locationId, dialogue.id));
            choices.appendChild(button);
        });
    }
}


function askQuestion(locationId, dialogueId) {
    console.log("q")
    const dialogueBox = document.getElementById('dialogue-box');
    const dialogueContent = document.getElementById('dialogue-content');
    const choices = document.getElementById('choices');

    let location = dialogues[locationId];
    let dialogue = location.dialogues.find(d => d.id === dialogueId);

    if (!dialogue) {
        showCustomAlert("Erreur", "Cette question n'existe pas.");
        return;
    }

    if (!gameState.completedDialogues[locationId].includes(dialogueId)) {
    gameState.completedDialogues[locationId].push(dialogueId);
    }



    // Afficher le dialogue et la réponse
    let speaker1 = "Vous"
    let speaker2 = dialogues[locationId].name
    if (locationId == "police") {
        speaker2 = speaker1
        speaker1 = "Gordon"
    }
    dialogueContent.innerHTML = `<p><strong>${speaker1} :</strong> ${dialogue.text}</p>`;
    if (dialogue.responses && dialogue.responses.length > 0) {
        dialogue.responses.forEach(response => {
            dialogueContent.innerHTML += `<p><strong>${speaker2} :</strong> ${response.text}</p>`;

            // Exécuter l'action associée, s'il y en a une
            if (response.action) {
                response.action();
            }
        });
    }

    // Mettre à jour les choix
    choices.innerHTML = '';

    // Continue the conversation or end it
    if (dialogue.next === -1) {
        const endButton = document.createElement('button');
        endButton.innerText = "Terminer la conversation";
        endButton.classList.add('choice-button');
        endButton.addEventListener('click', closeDialogue);
        choices.appendChild(endButton);
    } else {
        const continueButton = document.createElement('button');
        continueButton.innerText = "Continuer la conversation";
        continueButton.classList.add('choice-button');
        continueButton.addEventListener('click', () => displayDialogues(locationId)); 
        choices.appendChild(continueButton);
    }

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
    const culprit = 'Ingrid';
    if (suspect === culprit) {
        alert("Félicitations ! Vous avez trouvé le véritable coupable.");
    } else {
        alert("Désolé, ce n'est pas le bon coupable. Vous êtes un mauvais détective.");
        // Recharger la page pour réinitialiser le jeu
    }
    setTimeout(function() {
        window.location.reload();
    }, 3000); // 3000 millisecondes = 3 secondesw
};

function startByPolice() {
    // Affiche le dialogue d'intro avec le policier
    displayDialogues("police");
    
};

function showCharacter() {
    
};

function moveCharacter() {

};