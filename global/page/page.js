// let page_a_afficher;
function afficher_cette_page(id){
    const full_boddy = document.getElementById("full_body");
    [...full_boddy.children].forEach(enfant => {
        if(enfant.classList.contains("alaways_keep_that")){
            return;
        }
        else if (enfant.id == id){
            enfant.style.display = "initial"
            return
        }
        
        enfant.style.display = "none"
    });
}