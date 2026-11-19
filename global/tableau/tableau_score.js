let modification = false
let base_affichage;

function afficher_ceci(round,array_element){
    //[[nom/valeur,prorité],[nom/valeur,priorité],etc...]
    const ligne_round = document.getElementById(`round_${round}_ligne`)
    round_affichage_a_zero(round)
    let priorite_premier =[]
    let priorite_deux =[]
    array_element.forEach(element => {
        if (element[1] == 1){
            priorite_premier.push(element[0])
        }
        else if (element[1] == 0){
            priorite_deux.push(element[0])
        }
    });
    
    joueurs_nom.forEach(joueur=>{
        let valeur_priorite_premier = [];
        let valeur_priorite_deux = [];
        priorite_premier.forEach(valeur=>{
            valeur_priorite_premier.push(recuperation_valeur_reel(round,joueur,valeur))
        })
        priorite_deux.forEach(valeur=>{
            valeur_priorite_deux.push(recuperation_valeur_reel(round,joueur,valeur))
        })

        const slot_joueur = ligne_round.querySelector(`[id$=${joueur.replaceAll(" ","_")}]`);
        slot_joueur.appendChild(cree_division(valeur_priorite_premier,true))
        slot_joueur.appendChild(cree_division(valeur_priorite_deux,false))
        remove_last_div_ligne(slot_joueur)
    })

}

//récupère les valeur ou retourne tel quel
function recuperation_valeur_reel(round,joueur,nom_valeur){
    const valeur_score = score_all_joueurs[round][joueur][nom_valeur]
    const valeur_data = data_tableau_de_jeu[round][joueur][nom_valeur]

    if (valeur_score !=null){
        return valeur_score
    }
    if (valeur_data !=null){
        return valeur_data
    }
    return nom_valeur
    
}

function cree_division(arr,prio){
    const div_principal = document.createElement("div")
    div_principal.classList.add("ligne_dans_slot_score_joueur")
    arr.forEach(element=>{
        const div_element = document.createElement("div")
        div_element.classList.add("element_gauche_dans_slot_score_joueur")
        div_element.innerHTML = element
        if (!prio){
            div_element.classList.add("element_segondaire_dans_slote_score_joueur")
        }
        div_principal.appendChild(div_element)
    })
    div_principal.lastChild.classList.remove("element_gauche_dans_slot_score_joueur")

    return div_principal
}

function remove_last_div_ligne(div){
    div.lastChild.style.border = "none"
}

function activation_zone_clickable(n_ligne){
    const ligne = document.getElementById(`round_${n_ligne}_ligne`);
    const zone_clickable_round = ligne.querySelectorAll(".zone_clickable_round");
    console.log(zone_clickable_round)
    zone_clickable_round.forEach((e)=>{
        e.addEventListener("click",(event)=>{
            console.log(event.target.innerHTML)
            current_round = event.target.innerHTML
            modification = true
            setup_logique_tableau_de_jeu()
            afficher_cette_page(page_a_afficher)
        })
    })
}

function tout_update(){
    for (i = 1;i <= round_finish;i++){
        afficher_ceci(i,base_affichage)
    }
}