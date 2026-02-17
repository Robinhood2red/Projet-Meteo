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
}
//* -----------CONSOLE LOG-------------------------
fetchWeatherData("Bordeaux").then(data => {
    console.log("Données reçues de l'API :", data);
});
//* -----------------------------------------------

// Ici pour récup le data de l'API
function displayWeather(data) {
    if (!data) return; // Si pas de données, on s'arrête

    // 1. Sélectionner les éléments HTML par leur ID
    const cityElt = document.getElementById("cityName");
    const tempElt = document.getElementById("temp");
    const humidityElt = document.getElementById("humidity");
    const windElt = document.getElementById("wind");
    const feelsElt = document.getElementById("feelsLike");

    // 2. Injecter les données précises de l'API
    cityElt.textContent = `Météo à ${data.name}`;
    tempElt.textContent = Math.round(data.main.temp);
    humidityElt.textContent = data.main.humidity;
    windElt.textContent = Math.round(data.wind.speed * 3.6); // Conversion m/s en km/h
    feelsElt.textContent = Math.round(data.main.feels_like);
}
const btn = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");

btn.addEventListener("click", async () => {
    const ville = input.value;
    if (ville !== "") {
        // Appelle la fonction de ton fichier api.js
        const weatherData = await fetchWeatherData(ville);
        
        // Pour envoyer le résultat à la fonction d'affichage
        displayWeather(weatherData);
    }
});

