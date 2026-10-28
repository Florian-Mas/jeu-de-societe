const addJoueur = document.getElementById("plus_de_joueurs")
const tabJoueur = document.getElementById("tableau_joueur")
const buttonStart = document.getElementById("commencer")
const players = document.getElementById("joueurs")

// var joueurs_nom = []
var joueurs_nom = ["test1","test2","test3","test4","test5","test6","test7","test8"]

var score_all_joueurs = {}

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
    img_image_pic.setAttribute("src","trash.svg")
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

//pour la partie de score global
const enteteTableau = document.getElementById("round_0_ligne")
const lignes_tableau_score = document.querySelectorAll(".ligne_tableau_score")

function creation_tableu_score(){
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
creation_tableu_score()

//pour commencer la partie
buttonStart.addEventListener("click",()=>{
    players.style.display = "none"
    let ligne_tableau = document.querySelectorAll(".ligne_tableau_joueur")
    ligne_tableau.forEach(element => {
        joueurs_nom.push(element.children[1].firstElementChild.value)
    });
    creation_tableu_score()

})

mise_a_jour_tableau("1",{"1":[20,1,20],"5":[10,0,10]})
function mise_a_jour_tableau(round,dictionnaire){
    // array.forEach()
    const ligne_round = document.querySelectorAll(".ligne_tableau_score") 
    console.log(ligne_round[round].children)
    console.log(dictionnaire)
    // for (const [key,value] of dictionnaire){
    //     console.log(key,value)
    // }
    const cles = Object.keys(dictionnaire)
    cles.forEach((e)=>{
        // let idElement = `round_${round}_joueur_${e}`;
        // const score_round_joueur = document.getElementById(idElement)
        const score_round_joueur = ligne_round[round].children[e]
        score_round_joueur.replaceChildren();
        console.log(ligne_round[round].children[e])
        console.log(dictionnaire[e])

        const div_score_joueur_total = document.createElement("div")
        const div_score_joueur_round = document.createElement("div")
        const div_score_joueur_parie = document.createElement("div")
        const div_score_joueur_point = document.createElement("div")

        div_score_joueur_total.classList.add("score_joueur_total")
        div_score_joueur_total.innerHTML = dictionnaire[e][0]
        
        div_score_joueur_round.classList.add("score_joueur_round")
        div_score_joueur_parie.classList.add("score_joueur_parie")
        div_score_joueur_parie.innerHTML = dictionnaire[e][1]
        
        div_score_joueur_point.classList.add("score_joueur_point")
        div_score_joueur_point.innerHTML = dictionnaire[e][2]


        score_round_joueur.appendChild(div_score_joueur_total);
        div_score_joueur_round.appendChild(div_score_joueur_parie);
        div_score_joueur_round.appendChild(div_score_joueur_point);
        score_round_joueur.appendChild(div_score_joueur_round);

        // console.log(score_round_joueur)
    })
}