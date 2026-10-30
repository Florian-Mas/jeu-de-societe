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

// mise_a_jour_tableau("1",{"1":[20,1,20],"5":[10,0,10]})
// mise_a_jour_tableau_pari_point("1",{"1":[1,20],"5":[0,10]})
function mise_a_jour_tableau_pari_point(round,dictionnaire){
    // array.forEach()
    const ligne_round = document.querySelectorAll(".ligne_tableau_score") 
    // console.log(ligne_round[round].children)
    // console.log(dictionnaire)
    // for (const [key,value] of dictionnaire){
    //     console.log(key,value)
    // }
    const cles = Object.keys(dictionnaire)
    cles.forEach((e)=>{
        // let idElement = `round_${round}_joueur_${e}`;
        // const score_round_joueur = document.getElementById(idElement)
        const score_round_joueur = ligne_round[round].children[e]
        score_round_joueur.replaceChildren();
        // console.log(ligne_round[round].children[e])
        // console.log(dictionnaire[e])

        const div_score_joueur_total = document.createElement("div")
        const div_score_joueur_round = document.createElement("div")
        const div_score_joueur_parie = document.createElement("div")
        const div_score_joueur_point = document.createElement("div")

        div_score_joueur_total.classList.add("score_joueur_total")
        // div_score_joueur_total.innerHTML = dictionnaire[e][0]
        
        div_score_joueur_round.classList.add("score_joueur_round")
        div_score_joueur_parie.classList.add("score_joueur_parie")
        div_score_joueur_parie.innerHTML = dictionnaire[e][0]
        
        div_score_joueur_point.classList.add("score_joueur_point")
        div_score_joueur_point.innerHTML = dictionnaire[e][1]


        score_round_joueur.appendChild(div_score_joueur_total);
        div_score_joueur_round.appendChild(div_score_joueur_parie);
        div_score_joueur_round.appendChild(div_score_joueur_point);
        score_round_joueur.appendChild(div_score_joueur_round);

        // console.log(score_round_joueur)
    })
}

//acutalise les valeurs de score
function mise_a_jour_tableau(){
    joueurs_nom.forEach((value,index)=>{
        index +=1
        let joueur = {}
        let cumul = 0
        let round = 0
        joueur[index] = document.querySelectorAll(`[id^="round_"][id$="_joueur_${index}"]`);
        joueur[index].forEach((box)=>{
            try{
                cumul += Number(box.children[1].children[1].innerHTML)
                joueur[index][round].children[0].innerHTML = cumul
            }
            catch{
                
            }
            round +=1
        })
    
    })
}

//pour les click de bouton d'ajout plis/couleur/noir
function adding_plus_one_on_click(event){
    event.target.parentElement.children[1].innerHTML = Number(event.target.parentElement.children[1].innerHTML) + 1;
}
function remove_minus_one_on_click(event){
    event.target.parentElement.children[1].innerHTML = Number(event.target.parentElement.children[1].innerHTML) - 1;
}

let dernierRadioClique = null;
function restart_radio(){
    const tousLesRadios = document.querySelectorAll('input[name="checkbox_14_noir"]');
    
    tousLesRadios.forEach(function(radio) {
      
      // On écoute le clic (plutôt que change)
      radio.addEventListener("click", function(event) {
        
        // Si on clique sur le radio qui était DÉJÀ sélectionné juste avant...
        if (dernierRadioClique === radio) {
          // ...on le décoche de force
          radio.checked = false;
          dernierRadioClique = null; // On réinitialise la mémoire
        } else {
          // Sinon, on mémorise que c'est lui le dernier cliqué
          dernierRadioClique = radio;
        }
        
      });
    });
}

//cela met en place le tableau avec les point à attribuer
const affichage_du_round = document.querySelectorAll(".affichage_du_round")
function update_affichage_du_round(){
    affichage_du_round.forEach((round)=>{
        round.innerHTML = `Round ${current_round}`
    })
}

function mise_en_place_tableau_de_jeu(dic){
    const enteteTableau = document.getElementById("tableau_de_jeu")

    for (const [index,element] of Array.from(enteteTableau.children).entries()) {
        if (index === 0) {
            continue; // Passe à l'élément suivant si c'est le premier
        }
        element.remove()
    }

    let count = 0
    joueurs_nom.forEach(element => {
        const div_ligne =  document.createElement("div")
        div_ligne.classList.add("ligne_tableau_de_jeu")
        
        //nom
        const div_nom = document.createElement("div")
        div_nom.classList.add("slot_tableau_de_jeu")
        div_nom.innerHTML = element
        
        //pari fait
        const div_pari = document.createElement("div")
        div_pari.classList.add("slot_tableau_de_jeu")
        div_pari.classList.add("tableau_de_jeu_nombre_de_pari")
        try{
            div_pari.innerHTML = dic["pari"][count].innerHTML
        }
        catch{
            div_pari.innerHTML = 0
        }
        
        //pour les plis
        const div_plis = document.createElement("div")
        div_plis.classList.add("slot_tableau_de_jeu")
        
        const div_plis_nombre = document.createElement("div")
        div_plis_nombre.classList.add("tableau_de_jeu_nombre_de_plis")
        try{
            div_plis_nombre.innerHTML = dic["plis"][count].innerHTML
        }
        catch{
            div_plis_nombre.innerHTML = 0
        }
        const button_plis_moins = document.createElement("button")
        button_plis_moins.classList.add("bouton_plus_moins")
        button_plis_moins.innerHTML = "-"
        const button_plis_plus = document.createElement("button")
        button_plis_plus.classList.add("bouton_plus_moins")
        button_plis_plus.innerHTML = "+"

        div_plis.append(button_plis_moins)
        div_plis.append(div_plis_nombre)
        div_plis.append(button_plis_plus)

        button_plis_plus.addEventListener("click",adding_plus_one_on_click)
        button_plis_moins.addEventListener("click",remove_minus_one_on_click)
        
        //pour les 14 de couleur
        const div_couleur14 = document.createElement("div")
        div_couleur14.classList.add("slot_tableau_de_jeu")
        
        const div_couleur14_nombre = document.createElement("div")
        div_couleur14_nombre.classList.add("tableau_de_jeu_nombre_de_couleur14")
        try{
            div_couleur14_nombre.innerHTML = dic["couleur14"][count].innerHTML
        }
        catch{
            div_couleur14_nombre.innerHTML = 0
        }
        const button_couleur14_moins = document.createElement("button")
        button_couleur14_moins.classList.add("bouton_plus_moins")
        button_couleur14_moins.innerHTML = "-"
        const button_couleur14_plus = document.createElement("button")
        button_couleur14_plus.classList.add("bouton_plus_moins")
        button_couleur14_plus.innerHTML = "+"

        div_couleur14.append(button_couleur14_moins)
        div_couleur14.append(div_couleur14_nombre)
        div_couleur14.append(button_couleur14_plus)

        button_couleur14_plus.addEventListener("click",adding_plus_one_on_click)
        button_couleur14_moins.addEventListener("click",remove_minus_one_on_click)

        //pour le 14 noir
        const div_noir14 = document.createElement("div")
        div_noir14.classList.add("slot_tableau_de_jeu")

        const checkbox = document.createElement("input");
        checkbox.type = "radio";
        checkbox.name = "checkbox_14_noir";
        checkbox.value = true;

        div_noir14.append(checkbox)


        //pour construire la ligne
        div_ligne.append(div_nom)
        div_ligne.append(div_pari)
        div_ligne.append(div_plis)
        div_ligne.append(div_couleur14)
        div_ligne.append(div_noir14)
        enteteTableau.append(div_ligne)

        count ++
    
    });
    restart_radio()
}

mise_en_place_tableau_de_jeu([])

//pour la validation des plis
function verifierPlis(round,all_plis) {
    let some_plis = 0
    for (const plis of all_plis) {
        if (plis.innerHTML < 0) {
            console.log("plis négatif")
            return false;
        }
        some_plis += Number(plis.innerHTML)
    }
    if (some_plis!=round){
        console.log("pas le bon nombre de plis")
        return false
    }

    console.log("nombre de pli correct")
    return true
    
}
// pour avoir un système de comptage
function comptage_de_point_round(round,pari,plis,couleur){
    let result = {}
    let dic_final = {}

    let pari_dic = {}
    pari.forEach((value,key)=>{
        key += 1
        pari_dic[key] = value.innerHTML
        dic_final[key] = []
    })
    let plis_dic = {}
    plis.forEach((value,key)=>{
        key += 1
        plis_dic[key] = value.innerHTML
    })
    let couleur_dic = {}
    couleur.forEach((value,key)=>{
        key += 1
        couleur_dic[key] = value.innerHTML
    })

    joueurs_nom.forEach((value,index)=>{
        index +=1

        if(pari_dic[index] == plis_dic[index]){
            if(pari_dic[index] == 0){
                result[index] = round*10
            }
            else{
                result[index] = 20*plis_dic[index]
            }
        }
        else{
            if(pari_dic[index] == 0){
                result[index] = -round*10
            }
            else{
                result[index] = -Math.abs(pari_dic[index] - plis_dic[index])*10
            }
        }

        result[index] += Number(couleur_dic[index]*10)
        
        
    })
    let index_dernierRadioClique = 0
    if (dernierRadioClique){
        const divRadio = dernierRadioClique.parentElement.parentElement
        const divRadioParent = divRadio.parentElement;
        const index = Array.from(divRadioParent.children).indexOf(divRadio);
        result[index] += Number(20)
        index_dernierRadioClique = index

    }


    //pour le résultat final
    for (const [cle, valeur] of Object.entries(dic_final)) {
        dic_final[cle] = [plis_dic[cle],result[cle],couleur_dic[cle]]
        if(index_dernierRadioClique == cle){
            dic_final[cle].push(true)
        }
        else{
            dic_final[cle].push(false)
        }
    }
    return dic_final;
}

function update_score_all_joueurs(round,valeur){
    score_all_joueurs[round] = valeur
    console.log(score_all_joueurs)
}

//switch entre la vue tableau, vue de jeu, vue pari
function afficher_tableau(){
    document.getElementById("tableau_de_jeu_global").style.display = "none"
    document.getElementById("tableau_de_pari_global").style.display = "none"
    document.getElementById("tableau_score_global").style.display = "initial"
}
function afficher_jeu(){
    document.getElementById("tableau_de_jeu_global").style.display = "initial"
    document.getElementById("tableau_score_global").style.display = "none"
    document.getElementById("tableau_de_pari_global").style.display = "none"
    update_affichage_du_round()
}
function afficher_pari(){
    document.getElementById("tableau_de_jeu_global").style.display = "none"
    document.getElementById("tableau_score_global").style.display = "none"
    document.getElementById("tableau_de_pari_global").style.display = "initial"
    update_affichage_du_round()
}

// pour valider les points
let current_round = 1
const validation = document.getElementById("valider_valeur")
validation.addEventListener("click",()=>{
    const all_pari = document.querySelectorAll(".tableau_de_jeu_nombre_de_pari")
    const all_plis = document.querySelectorAll(".tableau_de_jeu_nombre_de_plis")
    const all_couleur = document.querySelectorAll(".tableau_de_jeu_nombre_de_couleur14")
    if (!verifierPlis(current_round,all_plis)) {
        return;
    }
    const valeur_tableau = comptage_de_point_round(current_round,all_pari,all_plis,all_couleur)
    mise_a_jour_tableau_pari_point(current_round,valeur_tableau)
    mise_a_jour_tableau()
    afficher_tableau()
    update_score_all_joueurs(current_round,valeur_tableau)
    
})

//pour aller au prochain tour
let round_started = 1
const prochainTour = document.getElementById("prochain_tour")
prochainTour.addEventListener("click",()=>{
    round_started +=1
    current_round = round_started
    afficher_pari()
    mise_en_place_tableau_de_jeu({})
    mise_en_place_tableau_de_pari({})
})

//tableau des paris
function mise_en_place_tableau_de_pari(dic){
    const enteteTableau = document.getElementById("tableau_de_pari")

    for (const [index,element] of Array.from(enteteTableau.children).entries()) {
        if (index === 0) {
            continue; // Passe à l'élément suivant si c'est le premier
        }
        element.remove()
    }

    joueurs_nom.forEach(element => {
        const div_ligne =  document.createElement("div")
        div_ligne.classList.add("ligne_tableau_de_pari")
        
        //nom
        const div_nom = document.createElement("div")
        div_nom.classList.add("slot_tableau_de_pari")
        div_nom.innerHTML = element
        
        //pari fait
        const div_pari = document.createElement("div")
        div_pari.classList.add("slot_tableau_de_pari")
        
        const div_pari_nombre = document.createElement("div")
        div_pari_nombre.classList.add("tableau_de_pari_nombre_de_pari")
        div_pari_nombre.innerHTML = 0
        const button_pari_moins = document.createElement("button")
        button_pari_moins.classList.add("bouton_plus_moins")
        button_pari_moins.innerHTML = "-"
        const button_pari_plus = document.createElement("button")
        button_pari_plus.classList.add("bouton_plus_moins")
        button_pari_plus.innerHTML = "+"

        div_pari.append(button_pari_moins)
        div_pari.append(div_pari_nombre)
        div_pari.append(button_pari_plus)

        button_pari_plus.addEventListener("click",adding_plus_one_on_click)
        button_pari_moins.addEventListener("click",remove_minus_one_on_click)
        

        //pour construire la ligne
        div_ligne.append(div_nom)
        div_ligne.append(div_pari)

        enteteTableau.append(div_ligne)
    
    });
    restart_radio()
}

mise_en_place_tableau_de_pari({})

//pour valider les paris

const paris_validation = document.getElementById("valider_pari")
paris_validation.addEventListener("click",()=>{
    const all_pari = document.querySelectorAll(".tableau_de_pari_nombre_de_pari")
    console.log(all_pari)
    mise_en_place_tableau_de_jeu({"pari":all_pari})
    afficher_jeu()    
})