# Projet-M-t-o

Voici un cahier des charges structuré pour votre groupe de trois. J'ai pris soin de diviser les tâches pour que chacun puisse progresser en JavaScript à son rythme tout en restant synchronisé.

📄 Cahier des Charges : "Horizon Dashboard"
1. Présentation du Projet
Objectif : Créer une interface web permettant de consulter la météo d'une ville en temps réel, d'afficher des conseils de voyage adaptés (ex: "Prenez un parapluie") et de sauvegarder des destinations favorites.

2. Spécifications Techniques
Langages : HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+).

Données : Utilisation de l'API OpenWeatherMap (Gratuite).

Stockage : localStorage pour les favoris.

3. Répartition des Missions (Le "Qui fait quoi")
🛠️ Développeur A : Le Maître des Données (Logique API)
Ta mission est de faire le lien entre le monde réel et votre application.

Tâches JS :

S'inscrire et récupérer une clé d'API.

Écrire la fonction fetchData(ville) pour récupérer le JSON de météo.

Gérer les erreurs (ex: ville mal orthographiée) avec un try...catch.

Extraire les données utiles : Température, humidité, icône météo, description.

🎨 Développeur B : L'Architecte de l'Interface (DOM & Dynamisme)
Tu transformes les données brutes en une expérience visuelle fluide.

Tâches JS :

Créer la fonction updateUI(data) qui injecte les résultats dans le HTML.

Changer dynamiquement le fond d'écran selon la météo (ex: image de pluie si data.weather == "Rain").

Gérer les écouteurs d'événements (addEventListener) sur le bouton de recherche.

Ajouter une horloge temps réel qui s'actualise chaque minute.

🗄️ Développeur C : Le Gardien de l'Expérience (Favoris & LocalStorage)
Tu t'assures que l'utilisateur ne perd pas ses données en fermant l'onglet.

Tâches JS :

Créer un bouton "Ajouter aux favoris".

Gérer un tableau favoris stocké dans le localStorage.

Générer une liste cliquable de ces favoris sur le côté de l'écran.

Ajouter une fonction de suppression d'un favori.

4. Structure des Fichiers (Organisation)
Pour ne pas vous marcher sur les pieds, je vous suggère cette structure :

index.html (Commun)

style.css (Commun)

api.js (Développeur A)

dom.js (Développeur B)

storage.js (Développeur C)

app.js (Fichier principal qui fait le lien)

5. Bonus pour le futur Mastère IA (Optionnel)
Si vous avancez vite, vous pourriez ajouter une brique "IA" simple :

Conseil de voyage intelligent : Créer une petite fonction JS qui analyse la météo et suggère un accessoire (ex: "Indice UV élevé, n'oubliez pas la crème solaire").

6. Planning suggéré
Jour 1 : Création du HTML de base et obtention de la clé API.

Jour 2 : Premier console.log des données météo et affichage rudimentaire.

Jour 3 : Mise en place du localStorage et peaufinage du CSS.

Note pour Jérémie : Ce projet démontre votre capacité à travailler en modulaire (fichiers séparés) et à manipuler des objets JSON, ce qui est la base de tout développement d'application moderne.