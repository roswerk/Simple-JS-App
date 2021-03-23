// IIEF
let pokemonRepository = (function() {

  // Empty Pokemon Data Array
  let pokemons = [];

  // Load API Data
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50";

  // Returns all pokemons as an Array
  function getAll() {
    return pokemons;
  }

  // Adds an "item/pokemon" to the back of the Array
  function add(item) {
    return pokemons.push(item);
  }

  // Display pokemons as a ul/li
  function addListItem(pokemon) {
    // Define pokemonList as a variable using the class selector of the div
    let pokemonlist = document.querySelector(".pokemon-list");
    // Define listPokemon as the li node
    let listPokemon = document.createElement('li');
    // Create a button
    let button = document.createElement('button');
    // Set inner text of button
    button.innerText = pokemon.name;

    // Add event listener to button
    button.addEventListener("click", function(event) {
      // Old version called showDetails which consoled.log the name
      // showDetails(pokemon);
      loadDetails(pokemon).then(function() {
        let pokemonName = pokemon.name;
        let pokemonDesc = pokemon.height;
        let pokemonWeight = pokemon.weight;
        let pokemonUrl = pokemon.imageUrl;
        let pokemonType = pokemon.type;

        showModal(pokemonName, pokemonDesc, pokemonWeight, pokemonType, pokemonUrl);
      })


    })
    // Change class name in button
    button.classList.add("button-class");
    // Append button to listPokemon (li)
    listPokemon.appendChild(button);
    // Append listPokemon to pokemonList (Ul)
    pokemonlist.appendChild(listPokemon);

    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function() {
        console.log(item.name);
      })
    }
  }

  // Load data from the API
  function loadList() {
    showLoadingMessage();

    return fetch(apiUrl).then(function(response) {
        return response.json();
      }).then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).then(function() {
        hideLoadingMessage();
      })
      .catch(function(e) {
        console.error(e);
      })
    hideLoadingMessage();
  }

  // Load pokemon details
  function loadDetails(item) {
    let url = item.detailsUrl;

    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      // Add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.type = details.types[0].type.name;
    }).catch(function(e) {
      console.error(e);
    });

  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

  // Displays Loading GIF in site
  function showLoadingMessage() {
    loadImage = document.querySelector(".loadingImage");
    loadImage.classList.add("show");
  }

  // Hides Loading GIF in site
  function hideLoadingMessage() {
    loadImage = document.querySelector(".loadingImage");
    loadImage.classList.remove("show");
  }


  // Key Values to access the IIEF Local Variables
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
  };
})();

// Get users input and display on screen
function getPokemon() {
  let newPokemon = document.getElementById("newPokemon").value;
  let result = document.getElementById("result");
  let newPokemonHeight = document.getElementById("newPokemonHeight").value;
  pokemonRepository.add(newPokemon)
}

function addPokemon(item){
   // Retrieve data from form imput
   let newPokemon = document.getElementById("newPokemon").value

   if (!newPokemon){
     return alert("Please write a pokemon name");
   };


   // Identify Div container of pokemons list
   let pokemonlist = document.querySelector(".pokemon-list");
   // Create a list container
   let listPokemon = document.createElement('li');
   // // Create a button
   let button = document.createElement('button');
   // // Set inner text of button
   button.innerText = newPokemon;

   button.addEventListener("click", function(event) {

     pokemonDetailsCreator();

   })
   button.classList.add("button-class")
   // pokemonRepository.addListItem(newPokemon);
   listPokemon.appendChild(button);
   // Append listPokemon to pokemonList (Ul)
   pokemonlist.insertBefore(listPokemon, pokemonlist.firstChild);

   function pokemonDetailsCreator(){
     pokemonName = newPokemon
     console.log(pokemonName);
   }
}

pokemonRepository.loadList().then(function() {
   // Displays loading gif in site
  pokemonRepository.showLoadingMessage();
  // Set a 2000 ms timer to simulate a long data loading time
  setTimeout(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon) {
      // Now the data is displayed
      pokemonRepository.addListItem(pokemon);

    })
    // Hides the loading gif
    pokemonRepository.hideLoadingMessage();
    // 2000 ms of delay
  }, 1000)
});

// Filter functionalities

searchPokemonList = document.querySelector(".pokemon-list")

let searchBar = document.forms["filter"].querySelector("input");
searchBar.addEventListener("keyup", function(e){
  let term = e.target.value.toLowerCase();
  let searchPokemons = searchPokemonList.getElementsByTagName("li");
  Array.from(searchPokemons).forEach(function(searchPokemons){
        let poke = searchPokemons.firstElementChild.textContent;
        if ( poke.toLowerCase().indexOf(term) != -1){
          searchPokemons.style.display = "block";
        } else{
          searchPokemons.style.display = "none";
        }
  })
})

// Display pokemons in a Modal format

// Create a DIV container for our modal in PokedexSection and set its id to "modal-container"
let pokedexSection = document.querySelector(".pokedex-section");
let modalContainer = document.createElement("div");
modalContainer.setAttribute("id","modal-container");

// Insert Modal Container before the pikachu image
let pikachuImg = document.querySelector(".pikachuImage")
pokedexSection.insertBefore(modalContainer, pikachuImg);

// Create a function that makes modalContainer visible
function showModal(title, height, weight, type, url){
  modalContainer.classList.add("is-visible");
  modalContainer.innerText = " ";

  let modal = document.createElement("div");
  modal.classList.add("modal")

  let closeButton = document.createElement("button");
  closeButton.classList.add("modal-close");
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", hideModal);

  let modalTitle = document.createElement("h1");
  modalTitle.innerText = title;
  let pokemonHeight = document.createElement("p");
  pokemonHeight.innerText = "Height: " + height;
  let pokemonWeight = document.createElement("p");
  pokemonWeight.innerText = "Weight: " + weight;
  let pokemonType = document.createElement("p");
  pokemonType.innerText = "Types: " + type;
  let modalImage = document.createElement("img");
  modalImage.src = url;
  modalImage.setAttribute("id", "pokemonImage");

  modal.appendChild(closeButton);
  modal.appendChild(modalTitle);
  modal.appendChild(pokemonHeight);
  modal.appendChild(pokemonWeight);
  modal.appendChild(pokemonType);
  modal.appendChild(modalImage);

  modalContainer.appendChild(modal);


  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")){
      hideModal();
    }
  })

  modalContainer.addEventListener("click", (e)=>{

    let target = e.target;
    if(target === modalContainer){
      hideModal();
    };
  })
}


function hideModal(){
  modalContainer.classList.toggle("is-visible");
}
