//Horloge
// function clock() { //
//    const clockSystem = new Date();
//    let h = clockSystem.getHours();
//    let m = clockSystem.getMinutes();
//    let s = clockSystem.getSeconds();

//    h = h<10 ? '0' + h : h;
//    m = m<10 ? '0' + m : m;
//    s = s<10 ? '0' + s : s;

//     const numerictime = h + ' : ' + m + ' : ' + s;
//     document.getElementById('numerictime').innerHTML = numerictime;

// setInterval(clock, 1000);
  
// clock();

// function updateTime() {
//   let timeZone = document.getElementById("time-zone").value;
//   let currentTime = new Date().toLocaleTimeString("en-US", {timeZone: timeZone});
//   document.getElementById("clock").textContent = currentTime;
// }

// updateTime();
// setInterval(updateTime, 1000);
// }
function clock(){
let horlogecomplete = new Date();

let datecomplete = horlogecomplete.toLocaleDateString("fr-FR",{
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric",
    //timeZone:"long"  //  permet de mettre le fuseau 
});

let heure = horlogecomplete.toLocaleTimeString("fr-FR",{
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit",
    hour12:false,
    //timeZone: "value" //  permet de mettre le fuseau horaire geographique "UTC-04:00","UTC+01:00","UTC+09:00" 
});

document.getElementById("date").textContent = datecomplete;
document.getElementById("time").textContent = heure;
//document.getElementById("timezone").textContent = value;
}

setInterval(clock,1000);
clock();

const API_KEY = "b404da580f29405d485306111c750cc9";

async function fetchWeatherData(city) {
    try {
        // Pour lancer la requette
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`);
        
        if (!response.ok) {
            throw new Error("Ville non trouvée");
        }

        // Pour transformer la réponse en objet JSON (lisible par JS)
        const data = await response.json();
        
        // On retourne les données pour que je puisse utiliser
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération :", error);
        return null;
    }
}
function getIntensityCloud (data){
const clouds = data.clouds.all;
let cloudText = ""; // on rentrera la donnée plus tard  et vont accueillir l info
let cloudImage =""; // on rentrera la donnée plus tard  et vont accueillir l image

if(clouds < 10){
   cloudText = "Grand Soleil";
   cloudImage = "/Images/soleil.jpeg";
} else if (clouds < 50){
   cloudText = "variable";
   cloudImage = "/Images/variable.jpg"; 
} else if (clouds < 75){
   cloudText = "nuageux";
   cloudImage = "/Images/nuageux.jpg";
} else {
   cloudText = "Tres nuageux";
   cloudImage = "/Images/neige.jpg";
}
return {cloudText,cloudImage,clouds}; 


};                                     


function displayWeather(data) {
    if (!data) return;

    const intensity = getIntensityCloud(data);

    // 1. Injection du texte dans le span (ID: cloudInfo)
    // On accède à la propriété .cloudtext de l'objet retourné
    document.getElementById("cloudInfo").textContent = intensity.cloudText;

    // 2. Injection de l'image dans la balise img (ID: cloudImgInfo)
    // On utilise .src pour changer le chemin de l'image
    let imageElement = document.getElementById("cloudImgInfo");
    if (imageElement) {
        imageElement.src = intensity.cloudImage;
        imageElement.alt = intensity.cloudText;
        
    }
        const cityElt = document.getElementById("cityName");
        const tempElt = document.getElementById("temp");

        cityElt.textContent = `${data.name}`;
        tempElt.textContent = Math.round(data.main.temp);
}

const btn = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");

btn.addEventListener("click", async () => {
    const town = input.value;
    if (town !== "") { // si ville n est pas vide
        // Appelle la fonction de ton fichier horloge.js
        const weatherData = await fetchWeatherData(town);
        
        // Pour envoyer le résultat à la fonction d'affichage
        displayWeather(weatherData);
    }

});

// Fonction pour ajouter une ville aux favoris
   function savetofavorites(cityName){

    // 1. Récupérer les favoris existants (ou un tableau vide si rien n'existe)
        let favorites = JSON.parse(localStorage.getItem("weather_fav")) || [];
        
        // 2. Vérifier si la ville n'est pas déjà dans la liste (évite les doublons)
        if (!favorites.includes(cityName)) {
        favorites.push(cityName);
        
        // 3. Sauvegarder la nouvelle liste mise à jour
        localStorage.setItem("weather_fav", JSON.stringify(favorites));
        
        displayFavorites(); // On rafraîchit l'affichage
   }

}  
function displayFavorites() {
    const listElt = document.getElementById("favoritesList");
    const favorites = JSON.parse(localStorage.getItem("weather_fav")) || [];

    // On vide la liste actuelle pour ne pas doubler l'affichage
    listElt.innerHTML = "";

    favorites.forEach(city => {
        const li = document.createElement("li");
        li.innerHTML = `
            <button class="fav-btn">${city}</button>
            <span class="delete-fav" data-city="${city}">❌</span>
        `;
        
        // Rendre le nom de la ville cliquable pour relancer une recherche
        li.querySelector(".fav-btn").addEventListener("click", async () => {
            const data = await fetchWeatherData(city);
            displayWeather(data);
        });

        // Ajouter la suppression
        li.querySelector(".delete-fav").addEventListener("click", (e) => {
            removeFavorite(e.target.dataset.city);
        });

        listElt.appendChild(li);
    });
}

function removeFavorite(cityToRemove) {
    let favorites = JSON.parse(localStorage.getItem("weather_fav")) || [];
    favorites = favorites.filter(city => city !== cityToRemove);
    localStorage.setItem("weather_fav", JSON.stringify(favorites));
    displayFavorites();
}
// On récupère l'élément bouton
const addFavBtn = document.getElementById("addFavBtn");

// On écoute le clic
addFavBtn.addEventListener("click", () => {
    // On récupère le nom de la ville qui est actuellement affiché dans ton titre
    // On utilise .replace pour enlever le texte "Météo à: " si tu l'as mis
    const currentCity = document.getElementById("cityName").textContent.replace("--- ", "");
    
    if (currentCity && currentCity !== "---") {
        savetofavorites(currentCity);
    } else {
        alert("Veuillez d'abord rechercher une ville !");
    }
});
// conversion en un objet groupé pour etre utilisé en html
// instruction de retour info et cloture

// function displayWeather (data){
// if(!data) return; // si pas de donnée on ne renvoie rien on stoppe

// const getIntensity = getIntensityCloud(data);

// document.getElementById("cloudInfo").textContent = getIntensity;

// const imageElement = document.getElementById("cloudImgInfo");

// if(imageElement){
//     imageElement.src = getIntensity.cloudImage;
// }

// }
// const btn = document.getElementById("searchBtn");
// const input = document.getElementById("cityInput");

// btn.addEventListener("click", async () => {
//     const city = input.value;
//     if (city !== "") { // si ville n est pas vide
//         // Appelle la fonction de ton fichier horloge.js
//         const weatherData = await fetchWeatherData(city);
        
//         // Pour envoyer le résultat à la fonction d'affichage
//         displayWeather(weatherData);
//     }
// });