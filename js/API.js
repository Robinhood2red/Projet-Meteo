// La clé API
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
        
        // On retourne les données pour que davy puisse les utiliser
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération :", error);
        return null;
    }
};
//* -----------CONSOLE LOG-------------------------
// fetchWeatherData("Bordeaux").then(data => {
//     console.log("Données reçues de l'API :", data);
// });
//* -----------------------------------------------

function getIntensityDetails(data) { // data pour appeller l'API
    // Intensitée lumineuse
    const clouds = data.clouds.all;
    let sunText = "";
    if (clouds < 15) sunText = "Soleil radieux ☀️";
    else if (clouds < 50) sunText = "Soleil voilé par quelques nuages 🌤️";
    else sunText = "Ciel couvert 🌥️";

    // Récupération de l'ID météo et du volume
    const weatherId = data.weather[0].id;
    const rainVolume = (data.rain && data.rain["1h"]) ? data.rain["1h"] : null;
    let rainText = "Aucune pluie détectée ☁️";

    // Ciblage du volume de nuage
    if (weatherId >= 200 && weatherId < 600) {
        // L'API confirme qu'il pleut ou qu'il y a de l'orage
        if (rainVolume) {
            // Si on a le volume précis, on utilise ton échelle
            if (rainVolume < 2.5) rainText = "Pluie fine / Bruine 🌦️";
            else if (rainVolume < 10) rainText = "Pluie modérée 🌧️";
            else rainText = "Forte pluie / Orage ⛈️";
        } else {
            // Si l'objet rain est vide mais que l'ID dit qu'il pleut
            rainText = "Précipitations en cours 🌧️";
        }
    } else if (weatherId === 804) {
        // 804 est le maximum nuageux
        rainText = "Ciel très chargé, risque d'averse ☁️";
    }

    console.log("ID Météo reçu :", weatherId);
    console.log("Volume pluie :", rainVolume);

    return { sunText, rainText, clouds }; // Renvoie une info et arète la fonction --- Cloture et renvoie la fonction. return est une instruction
};

// Ici pour récup le data de l'API ET afficher coté utilisateur
function displayWeather(data) {
    if (!data) return; // Si pas de données, on s'arrête

    // Récupération des interprétations
    const intensity = getIntensityDetails(data);

    document.getElementById("sunIntensity").textContent = intensity.sunText;
    document.getElementById("rainIntensity").textContent = intensity.rainText;

    // Sélectionne les éléments HTML par leur ID
    const cityElt = document.getElementById("cityName");
    const tempElt = document.getElementById("temp");
    const humidityElt = document.getElementById("humidity");
    const windElt = document.getElementById("wind");
    const feelsElt = document.getElementById("feelsLike");

    // Injecte les données précises de l'API coté utilisateur
    cityElt.textContent = `Météo à ${data.name}`;
    tempElt.textContent = Math.round(data.main.temp);
    humidityElt.textContent = data.main.humidity;
    windElt.textContent = Math.round(data.wind.speed * 3.6); // ! Conversion m/s en km/h
    feelsElt.textContent = Math.round(data.main.feels_like);
}
const btn = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");

btn.addEventListener("click", async () => {
    const town = input.value;
    if (town !== "") {
        // Appelle la fonction de ton fichier api.js
        const weatherData = await fetchWeatherData(town);
        
        // Pour envoyer le résultat à la fonction d'affichage
        displayWeather(weatherData);
    }
});