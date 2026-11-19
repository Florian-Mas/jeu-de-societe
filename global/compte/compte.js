const tableau_de_jeu_global = document.getElementById("tableau_de_jeu_global")
// let btn_retour_var;
// let btn_valider_var;
// const radio_list = []

// let tableau_de_jeu_entete_nom_taille =[]
// let tableau_de_jeu_type = {}
// let data_tableau_de_jeu = {}

// let valeur_compte_ligne = null;


function basic_setup_tableau_de_jeu(){
    const div_round = document.createElement("div")
    const tableau_de_jeu = document.createElement("div")
    const div_ligne_tableau = document.createElement("div")
    const btn_retour = document.createElement("button")
    const btn_valider = document.createElement("button")

    div_round.classList.add("affichage_du_round")
    div_round.innerHTML = `Round ${current_round}`
    
    tableau_de_jeu.id = "tableau_de_jeu"
    div_ligne_tableau.classList.add("ligne_tableau_de_jeu")
    
    btn_retour.id = "btn_retour"
    btn_retour.classList.add("bouton_bas_de_bage")
    btn_retour.innerHTML = "Retour"
    btn_valider.id = "valider_valeur"
    btn_valider.classList.add("bouton_bas_de_bage")
    btn_valider.innerHTML = "Valider les scores"



    tableau_de_jeu_global.appendChild(div_round)
    tableau_de_jeu_global.appendChild(tableau_de_jeu)
    tableau_de_jeu_global.appendChild(btn_retour)
    tableau_de_jeu_global.appendChild(btn_valider)

    tableau_de_jeu_global.style.display = "none"

    btn_retour_var = btn_retour
    btn_valider_var = btn_valider
}

function setup_logique_tableau_de_jeu(){
    tableau_de_jeu.appendChild(mise_en_place_entete())
    //format : {"nom":"type_dic"}
    //type_dic : {"type":"element"}
    //type : fix,compteur, choix
        //fix : nombre
        //compteur : [première possibilité, deuxieme, etc...]
        //choix : unique,multiple
    const tableau = document.getElementById("tableau_de_jeu")
    document.querySelector(".affichage_du_round").innerHTML = `Round ${current_round}`
    for (const [index,element] of Array.from(tableau.children).entries()) {
        if (index === 0) {
            continue;
        }
        element.remove()
    }
    
    valeur_compte_ligne = recuperer_une_ligne(current_round)
    
    joueurs_nom.forEach((joueur,index_joueur) => {
        const div_ligne =  document.createElement("div")
        div_ligne.classList.add("ligne_tableau_de_jeu")

        const div_nom = document.createElement("div")
        div_nom.classList.add("slot_tableau_de_jeu")
        div_nom.innerHTML = joueur

        div_ligne.appendChild(div_nom)

        tableau_de_jeu_entete_nom_taille.forEach(element => {
            element = element[0]

            try{
                for (const [typeCle, valeur] of Object.entries(tableau_de_jeu_type[element])) {
                    switch (typeCle){
                        case "fix": 
                            div_ligne.appendChild(creation_fix(valeur,element,valeur_compte_ligne[index_joueur]))
                            break;
                        case "compteur": 
                            div_ligne.appendChild(creation_compteur(valeur,element,valeur_compte_ligne[index_joueur]))
                            break;
                        case "choix": 
                            div_ligne.appendChild(creation_choix(valeur,element,valeur_compte_ligne[index_joueur]))
                            break;
                    }
                }
            }
            catch{
                div_ligne.appendChild(creation_fix("N/C","N/C"))
            }

        });
        tableau.appendChild(div_ligne)
    })
    radio_list.forEach(element => {
        restart_radio(element)
    });

    
}

function mise_en_place_entete(){
    const div_entete = document.createElement("div")
    const div_joueur = document.createElement("div")

    div_entete.classList.add("ligne_tableau_de_jeu")
    
    div_joueur.classList.add("slot_tableau_de_jeu")
    div_joueur.innerHTML = "Joueurs"

    div_entete.appendChild(div_joueur)
    
    let taille_colonne = "1fr"
    tableau_de_jeu_entete_nom_taille.forEach(element => {
        const div_element = document.createElement("div")
        div_element.classList.add("slot_tableau_de_jeu")
        div_element.innerHTML = element[0]
        div_entete.appendChild(div_element)
        taille_colonne +=` ${element[1]}fr`
    });

    document.documentElement.style.setProperty('--grille_colonnes_tableau_de_jeu', taille_colonne);

    return div_entete
}



basic_setup_tableau_de_jeu()


function creation_fix(element,nom,sauvegarde){
    const div_element = document.createElement("div")

    div_element.classList.add("slot_tableau_de_jeu")
    div_element.classList.add(`tableau_de_jeu_${String(nom).replaceAll(" ","_")}`)
    try{
        div_element.innerHTML = sauvegarde[nom]
    }
    catch{
        div_element.innerHTML = element
    }


    return div_element
}
function creation_compteur(element,nom,sauvegarde){

    const div_element = document.createElement("div")
    const div_nombre = document.createElement("div")

    div_element.classList.add("slot_tableau_de_jeu")
    div_nombre.classList.add(`tableau_de_jeu_${String(nom).replaceAll(" ","_")}`)
    try{
        div_nombre.innerHTML = sauvegarde[nom]
    }
    catch{
        div_nombre.innerHTML = 0
    }

    div_element.appendChild(div_nombre)

    // return div_element
    element.forEach(numero => {
        const btn_moins  = document.createElement("button")
        const btn_plus  = document.createElement("button")

        btn_moins.classList.add("bouton_plus_moins")
        btn_plus.classList.add("bouton_plus_moins")
        
        btn_moins.innerHTML = `-${numero}`
        btn_plus.innerHTML = `+${numero}`


        btn_moins.addEventListener("click",adding_plus_moins_on_click)
        btn_plus.addEventListener("click",adding_plus_moins_on_click)
        div_element.insertBefore(btn_moins,div_nombre)
        div_element.appendChild(btn_plus)
        
        
    });

    return div_element
}
function creation_choix(valeur,nom,sauvegarde){
    const div_element = document.createElement("div")

    div_element.classList.add("slot_tableau_de_jeu")

    const choix = document.createElement("input");

    choix.value = "true";
    
    if (valeur == "unique"){
        choix.type = "radio";
        const radio_nom = `radio_${String(nom).replaceAll(" ","_")}`
        choix.name = radio_nom
        if (!radio_list.includes(radio_nom)) {
            radio_list.push(radio_nom);
        }

    }
    else if(valeur == "multiple"){
        choix.type = "checkbox";
        choix.name = `checkbox_${String(nom).replaceAll(" ","_")}`;

    }

    choix.classList.add(`tableau_de_jeu_${String(nom).replaceAll(" ","_")}`)
    div_element.append(choix)

    return div_element
}

//pour les click de bouton d'ajout/retrait
function adding_plus_moins_on_click(event){
    const nb = Number(event.target.innerHTML)
    const div_valeur = event.target.parentElement.querySelector(':scope > [class^="tableau_de_jeu_"]');
    let valeur = Number(div_valeur.textContent)

    div_valeur.innerHTML = valeur+nb
}

function restart_radio(name){
    const tousLesRadios = document.querySelectorAll(`input[name="${name}"]`);
    
    tousLesRadios.forEach(function(radio) {
      
        let etaitCoche = false;

        radio.addEventListener("mousedown", (event) => {
            // 1. On sauvegarde l'état AVANT le changement
            etaitCoche = event.target.checked;
        });
        
      // On écoute le clic (plutôt que change)
        radio.addEventListener("click", function(event) {
            if (etaitCoche){
                event.target.checked = false
            }

        });
    });
}

function enregistrer_les_valeurs_dans_score_all_joueurs(){
    //récupère les ligne
    const ligne_tableau = document.querySelectorAll(".ligne_tableau_de_jeu:not(:first-child)")
    //pour chaque ligne
    ligne_tableau.forEach((element,index_ligne) => {
        let liste_joueur_valeur = [];
        // console.log(joueurs_nom[index_ligne]);
        //on récupère chaque éléments
        [...element.children].forEach(enfant => {
            //on vérifie si la div de base à la classe tableau_de_jeu_ qui début
            if([...enfant.classList].some(classe => classe.startsWith("tableau_de_jeu_"))){
                liste_joueur_valeur.push(enfant)
            }
            //on cherche tableau_de_jeu_ dans tous les enfants pour avec juste l'élément intéressant
            else {
                const element_recherche = enfant.querySelector('[class^="tableau_de_jeu_"]')
                if(!element_recherche){
                    return
                }
                liste_joueur_valeur.push(element_recherche)
            }
        });
        liste_joueur_valeur.forEach((valeur,index_valeur)=>{
            let valeur_a_save = null
            if(!valeur.innerHTML){
                valeur_a_save = valeur.checked
            }
            else{
                valeur_a_save = valeur.innerHTML
            }
            score_all_joueurs[current_round] ||= {};
            score_all_joueurs[current_round][joueurs_nom[index_ligne]] ||= {};
            score_all_joueurs[current_round][joueurs_nom[index_ligne]][tableau_de_jeu_entete_nom_taille[index_valeur][0]] = valeur_a_save;

            data_tableau_de_jeu[current_round] ||= {};
            data_tableau_de_jeu[current_round][joueurs_nom[index_ligne]] ||= {};
        })


    });
}

let page_precedente = null

btn_retour_var.addEventListener("click",()=>{
    afficher_cette_page(page_precedente)
})

btn_valider_var.addEventListener("click",()=>{
    page_precedente = "tableau_score_global"
    afficher_cette_page("tableau_score_global")
    enregistrer_les_valeurs_dans_score_all_joueurs()
    round_finish = round_started
    if (!modification){
        activation_zone_clickable(current_round)
    }
    modification = false
})

function recuperer_une_ligne(round){

    const values =[]
    joueurs_nom.forEach(joueur=>{
        try{
            values.push(score_all_joueurs[round][joueur])
        }
        catch{
            values.push(null)
        }
    })
    return values
}

function ajouter_a_data(round,nom,array_valeur){
    joueurs_nom.forEach((valeur,index_valeur)=>{
        data_tableau_de_jeu[round][valeur][nom] = array_valeur[index_valeur]
    })
}