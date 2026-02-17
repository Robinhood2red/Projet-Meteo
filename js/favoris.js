const townContainer = document.getElementById("town-container");
const favouriteInput = document.getElementById("favourite-input");
const favouriteButton = document.getElementById("favourite-button");
let favouriteSuccess = document.getElementById("favourite-success-box");

//? Fait : Sauvegarde des infos dans le local storage
//TODO: Affichage dynamique dans le front en loopant favouriteArray
//TODO: Style 

let favouriteArray = [];

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
  } else {
    console.log("[LocalStorage] Le contenu des favoris n'existe pas.");
  }
}

getFavouritesFromLocalStorage(); //premier appel de la fonction

function addFavouritesToLocalStorage(item) {
    getFavouritesFromLocalStorage();
    favouriteArray.push(item);
    if(favouriteArray.length > 0) console.log(favouriteArray);
    
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
      favouriteSuccess.classList.add("text-emerald-400");
      favouriteSuccess.innerHTML = "La ville a bien été ajoutée aux favoris.";
    }
  }
});
