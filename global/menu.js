document.addEventListener("DOMContentLoaded", function() {
  // 1. Création de la structure HTML du menu sous forme de chaîne de caractères
    const navbarHTML = `
        <nav class="navbar">
        <!-- Bouton avec les 3 barres -->
        <button class="hamburger" id="hamburger" aria-label="Menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>

        <div class="logo">Jeu de Société score</div>
    
        <!-- Liste des liens de navigation -->
        <ul class="nav-menu" id="nav-menu">
            <li class="nav-item"><a href="/" class="nav-link">Accueil</a></li>
            <li class="nav-item"><a href="skull_king.html" class="nav-link">skull king</a></li>
            <!--<li class="nav-item"><a href="#a-propos" class="nav-link">À propos</a></li>-->
            <!--<li class="nav-item"><a href="#contact" class="nav-link">Contact</a></li>-->
        </ul>
        </nav>
    `;

    // 2. Recherche de la zone cible dans la page
      const targetZone = document.getElementById('zone_de_préparation_pour_le_menu');

    if (targetZone) {
      // Si la zone existe, on insère le menu juste après elle
      targetZone.insertAdjacentHTML('afterend', navbarHTML);
    } else {
      // Sécurité : si la zone n'est pas trouvée, on l'ajoute au début du body par défaut
      document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    }
    // 3. Gestion de l'interactivité (JS du menu hamburger)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Ouvre/ferme le menu lors du clic sur l'icône
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Ferme automatiquement le menu lorsqu'on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        });
    });
});