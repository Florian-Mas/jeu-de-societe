// let modification = false
// let base_affichage;

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

        for (let i = 0; i < joueurs_nom.length; i++) {
            const div_joueur = document.createElement("div");
            div_joueur.classList.add("slot_score_joueur");
            div_joueur.id = `round_${index}_joueur_${joueurs_nom[i].replaceAll(" ","_")}`
            element.append(div_joueur)
        }
    }

}

function add_round(){

    const num = document.querySelectorAll(".ligne_tableau_score").length
    const Tableau = document.getElementById("tableau_score")

    const div_ligne = document.createElement("div");
    div_ligne.id = `round_${num}_ligne`;
    div_ligne.classList.add("ligne_tableau_score");
    div_ligne.classList.add("zone_clickable_round");
    Tableau.append(div_ligne)

    const div_first_num =  document.createElement("div")
    div_first_num.id = `round_${num}_numero`;
    div_first_num.classList.add("slot_score_joueur")
    div_first_num.classList.add("zone_clickable_round")
    div_first_num.innerHTML = num

    div_ligne.append(div_first_num)

    for (let i = 0; i < joueurs_nom.length; i++) {
        const div_joueur = document.createElement("div");
        div_joueur.classList.add("slot_score_joueur");
        div_joueur.id = `round_${num}_joueur_${joueurs_nom[i].replaceAll(" ","_")}`
        div_ligne.append(div_joueur)
    }

}

function round_affichage_a_zero(round){
    const ligne_round = document.getElementById(`round_${round}_ligne`)
    for (const [index,element] of Array.from(ligne_round.children).entries()) {
        if (index === 0) {
            continue;
        }
        element.replaceChildren()
    }

}

function rm_last_round(){
    [...document.querySelectorAll(".ligne_tableau_score")].at(-1).remove();
}

function initialize_round(num){
    for(i=0;i<num;i++){
        add_round()
    }
}

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
    zone_clickable_round.forEach((e)=>{
        e.addEventListener("click",(event)=>{
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