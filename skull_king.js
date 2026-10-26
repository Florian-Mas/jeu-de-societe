const addJoueur = document.getElementById("plus_de_joueurs")
const tabJoueur = document.getElementById("tableau_joueur")
const buttonStart = document.getElementById("commencer")
const players = document.getElementById("joueurs")

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

//pour commencer la partie
buttonStart.addEventListener("click",()=>{
    players.style.display = "none"
})