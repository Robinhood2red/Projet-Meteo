const townContainer = document.getElementById("town-container");
const favouriteInput = document.getElementById("favourite-input");
const favouriteButton = document.getElementById("favourite-button");
const towns = document.getElementById("towns");
let townsError = document.getElementById("towns_error");
let favouriteSuccess = document.getElementById("favourite-success-box");

const API_KEY = "b404da580f29405d485306111c750cc9";

let favouriteArray = [];

//? Fait : Sauvegarde des infos dans le local storage
//TODO: Affichage dynamique dans le front en loopant favouriteArray
//TODO: Style

async function fetchWeatherData(city) {
  try {
    // Pour lancer la requette
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`,
    );

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

function removeTownFromFavourite(city){
  favouriteArray = favouriteArray.filter(i => i !== city);
  localStorage.setItem("favouriteList", JSON.stringify(favouriteArray));
  displayFavouriteTown();
}


async function displayFavouriteTown() {
  towns.textContent = "";
  if (favouriteArray.length > 0){
    townsError.textContent = "";
    for (const city of favouriteArray) {
      
        const tempData = await fetchWeatherData(city);

        if(tempData){

        let town = document.createElement("span");
        let title = document.createElement("h3");
        let degree = document.createElement("p");
        let deleteButton = document.createElement("button");
        let deleteIcon = document.createElement("i");

        title.textContent = city;
        degree.textContent = Math.round(tempData.main.temp)+"°C";
        deleteIcon.classList.add("fa-solid", "fa-trash-arrow-up");
        deleteButton.appendChild(deleteIcon);
        deleteButton.classList.add("text-[#FFB7FF]","hover:text-red-500", "delay-50", "transition-colors", "cursor-pointer");
        deleteButton.addEventListener("click", () => {
          removeTownFromFavourite(city);
        });
        

        town.classList.add("town", "flex", "gap-2", "justify-center");
        town.setAttribute('id', city);
        town.append(title, degree, deleteButton);

        towns.appendChild(town);
        }
      };
    
  } else {
    townsError.textContent = "Aucune ville n'a été mise en favorite pour le moment.";
  }
}

function isInLocalStorage() {
  try {
    return localStorage.getItem("favouriteList") !== null;
  } catch (error) {
    console.error(
      "[LocalStorage] Erreur lors de la tentative d'accès à cet objet : ",
      error,
    );
    return false;
  }
}

function getFavouritesFromLocalStorage() {
  if (isInLocalStorage()) {
    favouriteArray = JSON.parse(localStorage.getItem("favouriteList"));
    displayFavouriteTown();
  } else {
    console.log("[LocalStorage] Le contenu des favoris n'existe pas.");
    displayFavouriteTown();
  }
}

getFavouritesFromLocalStorage(); //premier appel de la fonction

function addFavouritesToLocalStorage(item) {
  favouriteArray.push(item);
  if (favouriteArray.length > 0) console.log(favouriteArray);

  localStorage.setItem("favouriteList", JSON.stringify(favouriteArray));
}



favouriteButton.addEventListener("click", () => {
  let newFavoriteTown = favouriteInput.value;
  if (newFavoriteTown) {
    if (favouriteArray.includes(newFavoriteTown)) {
      favouriteSuccess.classList.add("text-red-500");
      favouriteSuccess.innerHTML =
        "Cette ville est déjà répertoriée dans les favoris.";
      return;
    } else {
      addFavouritesToLocalStorage(newFavoriteTown);
      displayFavouriteTown();
      favouriteSuccess.classList.add("text-emerald-400");
      favouriteSuccess.classList.remove("text-red-500");
      favouriteSuccess.innerHTML = "La ville a bien été ajoutée aux favoris.";
    }
  }
});

//TODO: afficher dynamiquement les villes
