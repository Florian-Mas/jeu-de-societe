const addJoueur = document.getElementById("plus_de_joueurs")
const tabJoueur = document.getElementById("tableau_joueur")
const buttonStart = document.getElementById("commencer")
const players = document.getElementById("joueurs")
const tableau_score_global = document.getElementById("tableau_score_global")

var joueurs_nom = []

var score_all_joueurs = {}

let current_round = 1

//pour réajuster le numéro des joueurs
function reajusteNumber(){
    let ligne_tableau = document.querySelectorAll(".ligne_tableau_joueur")
    let count = 1
    ligne_tableau.forEach(element => {
        element.children[0].innerHTML = count
        count ++
    });
}

//pour supprimer la ligne du joueur
function deleteLine(me){
    me.addEventListener("click",()=>{
        me.parentElement.remove()
        reajusteNumber()
    })
}

//pour ajouter une ligne numéro, nom, supprimer
function addingCoupleNumName(where){
    const div_tab = document.createElement("div")
    const div_num = document.createElement("div")
    const div_nom = document.createElement("div")
    const div_action = document.createElement("div")

    div_tab.classList.add("ligne_tableau_joueur")
    
    div_num.classList.add("joueur_numero")
    div_num.innerHTML = where.children.length +1
    div_nom.classList.add("joueur_nom")
    div_action.classList.add("joueur_action")

    const inputNom = document.createElement("input");
    inputNom.type = "text";
    inputNom.classList.add("input_nom_joueur");
    
    const img_image_pic = document.createElement("img")
    img_image_pic.classList.add("img_trash")
    img_image_pic.setAttribute("src","/img/trash.svg")
    img_image_pic.setAttribute("alt","")

    div_action.addEventListener("click",deleteLine(div_action))
    div_tab.appendChild(div_num)
    div_tab.appendChild(div_nom)
    div_tab.appendChild(div_action)
    div_action.appendChild(img_image_pic)
    div_nom.appendChild(inputNom);


    where.appendChild(div_tab)

}

//pour ajouter une joueur
addJoueur.addEventListener("click",()=>{
    addingCoupleNumName(tabJoueur)
})

function initialize_tableau_score_global(){
    tableau_score_global.style.display="none"

    const div_tab = document.createElement("div")
    div_tab.id = "tableau_score"
    
    const div_first_row =  document.createElement("div")
    div_first_row.id = "round_0_ligne"
    div_first_row.classList.add("ligne_tableau_score")
    
    const div_first_num =  document.createElement("div")
    div_first_num.id = "round_0_numero"
    div_first_num.classList.add("slot_score_joueur")
    div_first_num.classList.add("zone_clickable_round")
    div_first_num.innerHTML = "RD"


    div_first_row.appendChild(div_first_num)
    div_tab.appendChild(div_first_row)


    const btn_next = document.createElement("button")
    btn_next.id = "prochain_tour"
    btn_next.classList.add("bouton_bas_de_bage")
    btn_next.innerHTML = "prochain tour"


    tableau_score_global.appendChild(div_tab)
    tableau_score_global.appendChild(btn_next)

}

initialize_tableau_score_global()

function creation_tableu_score(){
    const enteteTableau = document.getElementById("round_0_ligne")
    const lignes_tableau_score = document.querySelectorAll(".ligne_tableau_score")
    document.documentElement.style.setProperty('--grille_colonnes_tableau_score', `1fr repeat(${joueurs_nom.length}, 2fr)`);
    
    joueurs_nom.forEach(element => {
        const div_joueur =  document.createElement("div")
        div_joueur.classList.add("slot_score_joueur")
        div_joueur.innerHTML = element
        
        enteteTableau.append(div_joueur)
    
    });

    for (const [index, element] of lignes_tableau_score.entries()) {
        if (index === 0) continue;

        for (let i = 1; i < joueurs_nom.length+1; i++) {
            const div_joueur = document.createElement("div");
            div_joueur.classList.add("slot_score_joueur");
            div_joueur.id = `round_${index}_joueur_${i}`
            element.append(div_joueur)
        }
    }

}

buttonStart.addEventListener("click",()=>{
    players.style.display = "none"
    let ligne_tableau = document.querySelectorAll(".ligne_tableau_joueur")
    ligne_tableau.forEach(element => {
        joueurs_nom.push(element.children[1].firstElementChild.value)
    });
    creation_tableu_score()
    afficher_cette_page("tableau_score_global")
    setup_logique_tableau_de_jeu()

})


function add_round(){

    const num = document.querySelectorAll(".ligne_tableau_score").length
    const Tableau = document.getElementById("tableau_score")

    const div_ligne = document.createElement("div");
    div_ligne.id = `round_${num}_ligne`;
    div_ligne.classList.add("ligne_tableau_score");
    Tableau.append(div_ligne)

    const div_first_num =  document.createElement("div")
    div_first_num.id = `round_${num}_numero`;
    div_first_num.classList.add("slot_score_joueur")
    div_first_num.classList.add("zone_clickable_round")
    div_first_num.innerHTML = num

    div_ligne.append(div_first_num)

    for (let i = 1; i < joueurs_nom.length+1; i++) {
        const div_joueur = document.createElement("div");
        div_joueur.classList.add("slot_score_joueur");
        div_joueur.id = `round_${num}_joueur_${i}`
        div_ligne.append(div_joueur)
    }

}

function initialize_round(num){
    for(i=0;i<num;i++){
        add_round()
    }
}