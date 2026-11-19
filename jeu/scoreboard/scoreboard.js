initialize_round(1)

let round_started = 0
const prochainTour = document.getElementById("prochain_tour")
prochainTour.addEventListener("click",()=>{
    round_started +=1
    current_round = round_started
    afficher_tableau_de_jeu()
})