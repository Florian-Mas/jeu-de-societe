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
        rm_last_round()
    }
})