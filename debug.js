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

function exampleUtilisationTableauScore(){

    tableau_de_jeu_entete_nom_taille =[
        ["test0",2],
        ["test1",1],
        ["test2",2],
        ["test3",2],
        ["test4",2],
    ]
    tableau_de_jeu_type = 
    {
        "test1":{
            "fix":0
        },
        "test2":{
            "compteur":[1,10]
        },
        "test3":{
            "choix":"unique"
        },
        "test4":{
            "choix":"multiple"
        }
    }

    //exemple de résultat pour les round avec des noms de joueurs par défault et une valeur sauvegarder
    data_tableau_de_jeu = {
        "round1":{
            "joueur_1":{
                "cumul":0
            },
            "joueur_2":{
                "cumul":0
            }
        },
        "round2":{
            "joueur_1":{
                "cumul":0
            },
            "joueur_2":{
                "cumul":0
            }
        }
    }

}