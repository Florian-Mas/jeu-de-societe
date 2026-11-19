// On écoute les clics sur l'ensemble de la page
function clickDebug(){
    document.addEventListener("click", (event) => {
        // 1. Récupérer l'élément précis sur lequel on a cliqué
        const elementClique = event.target;
    
        // 2. Récupérer les coordonnées X et Y par rapport à la fenêtre
        const posX = event.clientX;
        const posY = event.clientY;
    
        // 3. Afficher le tout proprement dans la console
        console.log("--- Clic détecté ---");
        console.log("Élément :", elementClique);
        console.log("Balise :", elementClique.tagName);
        console.log("ID de l'élément :", elementClique.id || "Aucun ID");
        console.log("Classe(s) :", elementClique.className || "Aucune classe");
        console.log(`Coordonnées (X: ${posX}px, Y: ${posY}px)`);
    });
}

function setUpNoEmptyPlayer(){
    joueurs_nom = ["joueur 1", "joueur 2"]
}