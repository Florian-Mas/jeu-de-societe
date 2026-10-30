const urlSwitch = document.getElementById('urlSwitch');
const labelMode = document.getElementById('labelMode');
const slots = document.querySelectorAll('.slot_de_jeu');

urlSwitch.addEventListener('change', () => {
  if (urlSwitch.checked) {
    // Mode Alternatif activé
    labelMode.textContent = "Mode Règles";
    
    slots.forEach(slot => {
      const altUrl = slot.getAttribute('data-astuce');
      slot.href = altUrl;
    });
  } else {
    // Mode Normal activé
    labelMode.textContent = "Mode Normal";
    
    slots.forEach(slot => {
      const normalUrl = slot.getAttribute('data-normal');
      slot.href = normalUrl;
    });
  }
});