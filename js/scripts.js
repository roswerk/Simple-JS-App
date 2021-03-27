// IIEF
let pokemonRepository = (function() {

  // Empty Pokemon Data Array
  let pokemons = [];

  // Load API Data
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

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
    // Add bootstrap list-group item class
    listPokemon.classList.add("list-group-item");
    // Create a button
    let button = document.createElement('button');
    // Add Bootstrap btn propperty
    button.classList.add("btn", "btn-outline-secondary");

    // Super low resources solution
    // button.setAttribute("data-target", "#exampleModalCenter")
    // button.setAttribute("data-toggle", "modal")
    // Set inner text of button
    button.innerText = pokemon.name;

    // Add event listener to button
    button.addEventListener("click", function(event) {
      loadDetails(pokemon).then(function() {
        let pokemonName = pokemon.name;
        let pokemonDesc = pokemon.height;
        let pokemonWeight = pokemon.weight;
        let pokemonUrl = pokemon.imageUrl;
        let pokemonType = pokemon.type;

        showModal(pokemonName, pokemonDesc, pokemonWeight, pokemonType, pokemonUrl);
        $('#exampleModalCenter').modal("show")

      })

    })
    // Change class name in button
    button.classList.add("button-class");
    // Add Bootstrap btn class element
    button.classList.add("btn")
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
   // Add Bootstrap btn class
   button.classList.add("btn", "btn-primary");
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

// the showModal Function works with the retrieved data from the API
// and displays it on the bootstrap modal

function showModal(title, height, weight, type, url){

let modalTitle = document.getElementById("modalTitle");
modalTitle.innerText = title;

let pokemonHeight = document.getElementById("exampleModalCenterText1");
pokemonHeight.innerText = "Height: " + height;
pokemonHeight.classList.add("modal-body");

let pokemonWeight = document.getElementById("exampleModalCenterText2");
pokemonWeight.innerText = "Weight: " + weight;
pokemonWeight.classList.add("modal-body");

let pokemonType = document.getElementById("exampleModalCenterText3");
pokemonType.innerText = "Type: " + type;
pokemonType.classList.add("modal-body");

let modalImage = document.getElementById("exampleModalCenterText4");
modalImage.src = url;
modalImage.classList.add("pokemonImage");

}
