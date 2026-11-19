page_a_afficher = "tableau_de_jeu_global";
initialize_round(1)

const prochainTour = document.getElementById("prochain_tour")
prochainTour.addEventListener("click",()=>{
    round_started +=1
    current_round = round_started
    afficher_cette_page("tableau_de_jeu_global")
    page_precedente = "tableau_score_global"
    setup_logique_tableau_de_jeu()
    initialize_round(1)
})

btn_retour_var.addEventListener("click",()=>{
    if(round_started == current_round){
        round_started = round_finish
    }
})

btn_valider_var.addEventListener("click",()=>{
    cumul_point()
    afficher_ceci(current_round,[["points",1],["cumul",0]])
    
})

tableau_de_jeu_entete_nom_taille =[
    ["points",3]
]
tableau_de_jeu_type = 
{
    "points":{
        "compteur":[1,10,100]
    },
    "cumul":{
            "fix":0
        },
}

function cumul_point(){
    const toutesLesLignes = [...document.querySelectorAll('[id^="round_"][id$="_ligne"]')].length-2;
    let valeur_cumul;
    for (i = 1; i<=toutesLesLignes;i++){
        let valeurs = []
        recuperer_une_ligne(i).forEach(Element=>{
            valeurs.push(Number(Element["points"]))
        })
        if(i==1){
            valeur_cumul = valeurs
        }
        else{
            valeurs.forEach((valeur, i) => {
                valeur_cumul[i] += valeur;
            });
        }
        ajouter_a_data(i,"cumul",valeur_cumul)
    }
  

}