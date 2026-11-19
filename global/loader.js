// /global/loader.js

// 1. les variables globales de base

//---------------------------------------
//page

let page_a_afficher;

//---------------------------------------
//set_up_joueur

var joueurs_nom = []

var score_all_joueurs = {}

let current_round = 1
let round_started = 0
let round_finish = 0

//---------------------------------------
//compte

let btn_retour_var;
let btn_valider_var;
const radio_list = []

let tableau_de_jeu_entete_nom_taille =[]
let tableau_de_jeu_type = {}
let data_tableau_de_jeu = {}

let valeur_compte_ligne = null;

//---------------------------------------
//tableau_score

let modification = false
let base_affichage;
let id_debut_ancien_round;

//---------------------------------------


// 2. Liste des CSS à injecter dans le <head>
const cssFiles = [
    "/global/menu/menu.css",
    "/global/page/page.css",
    "/global/set_up_joueur/set_up_joueur.css",
    "/global/compte/compte.css",
    "/global/tableau/tableau_score.css"
];

cssFiles.forEach(href => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
});

// 3. Liste des JS à charger dans l'ordre exact
const jsFiles = [
    "/debug.js",
    "/global/menu/menu.js",
    "/global/page/page.js",
    "/global/set_up_joueur/set_up_joueur.js",
    "/global/compte/compte.js",
    "/global/tableau/tableau_score.js"
];

// Chargement séquentiel : attend la fin de chaque script avant de lancer le suivant
window.loaderReady = jsFiles.reduce((chaine, src) => {
    return chaine.then(() => new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    }));
}, Promise.resolve())