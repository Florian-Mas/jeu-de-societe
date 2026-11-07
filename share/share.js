// 1. Récupérer automatiquement l'URL de la page actuelle
        // const currentUrl = window.location.href;
        // const currentUrl = "https://score-jeu-de-societe.netlify.app/";
        const Url = window.location.origin;

        // 2. Encoder l'URL pour l'intégrer proprement dans un lien web
        const encodedUrl = encodeURIComponent(Url);

        // 3. Pointer vers une API de génération d'image (aucune bibliothèque JS requise)
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}`;

        // 4. Créer dynamiquement la balise image et l'ajouter au conteneur HTML
        const img = document.createElement('img');
        img.src = qrApiUrl;
        img.alt = "QR Code de la page";

        document.getElementById('qrcode').appendChild(img);