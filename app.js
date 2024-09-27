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
}

// Fonction pour accuser un suspect
function accuseSuspect() {
    if (gameState.knownSuspects.length === 0) {
        showCustomAlert("Erreur", "Vous n'avez encore rencontré personne à accuser.");
        return;
    }

    let suspectList = gameState.knownSuspects.join(', ');
    const suspect = prompt(`Qui voulez-vous accuser ? (${suspectList})`).toLowerCase();

    if (suspect) {
        checkAccusation(suspect);
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