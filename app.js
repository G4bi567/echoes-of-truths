document.getElementById('start-button').addEventListener('click', () => {
    // Cacher la page d'ouverture
    document.getElementById('opening-page').style.display = 'none';
    // Afficher le contenu du jeu
    document.getElementById('game-content').style.display = 'block';
});

// Déclarations des variables globales
let gameState = {
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
        alert("Vous n'avez encore rencontré personne à accuser.");
        return;
    }

    let suspectList = gameState.knownSuspects.join(', ');
    const suspect = prompt(`Qui voulez-vous accuser ? (${suspectList})`).toLowerCase();

    if (suspect) {
        checkAccusation(suspect);
    }
}

