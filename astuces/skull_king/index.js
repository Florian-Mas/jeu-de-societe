const sirene = document.getElementById("Sirène")
const pirate = document.getElementById("Pirate")
const skull_king = document.getElementById("Skull_king")
const tigresse = document.getElementById("tigresse")

const sirene_avantage = document.getElementById("Sirene_avantage")
const pirate_avantage = document.getElementById("Pirate_avantage")
const skull_king_avantage = document.getElementById("Skull_king_avantage")
const tigresse_avantage = document.getElementById("tigresse_avantage")

sirene.addEventListener("click",()=>{
  sirene.classList.add("selectionner");
  pirate.classList.remove("selectionner");
  skull_king.classList.remove("selectionner");
  tigresse.classList.remove("selectionner")
  sirene_avantage.hidden = false;
  pirate_avantage.hidden = true;
  skull_king_avantage.hidden = true;
  tigresse_avantage.hidden = true;
})
pirate.addEventListener("click",()=>{
  pirate.classList.add("selectionner")
  sirene.classList.remove("selectionner");
  skull_king.classList.remove("selectionner");
  tigresse.classList.remove("selectionner")
  sirene_avantage.hidden = true;
  pirate_avantage.hidden = false;
  skull_king_avantage.hidden = true;
  tigresse_avantage.hidden = true;
})
skull_king.addEventListener("click",()=>{
  skull_king.classList.add("selectionner")
  pirate.classList.remove("selectionner");
  sirene.classList.remove("selectionner");
  tigresse.classList.remove("selectionner")
  sirene_avantage.hidden = true;
  pirate_avantage.hidden = true;
  skull_king_avantage.hidden = false;
  tigresse_avantage.hidden = true;
})

tigresse.addEventListener("click",()=>{
  skull_king.classList.remove("selectionner")
  pirate.classList.remove("selectionner");
  sirene.classList.remove("selectionner");
  tigresse.classList.add("selectionner")
  sirene_avantage.hidden = true;
  pirate_avantage.hidden = true;
  skull_king_avantage.hidden = true;
  tigresse_avantage.hidden = false;
})



