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
    // Add bootstrap list-group item class
    listPokemon.classList.add("list-group-item");
    // Create a button
    let button = document.createElement('button');
    // Add Bootstrap btn propperty
    button.classList.add("btn", "btn-outline-secondary");

    button.innerText = pokemon.name;

    // Testing preview button - not vital code
    let previewButton = document.createElement("button");
    previewButton.classList.add("btn", "btn-outline-secondary" , "btn-sm", "float-right" );
    previewButton.innerText = "Preview";

    previewButton.addEventListener("click", function(event){
      loadDetails(pokemon).then(function() {
        let pokemonName = pokemon.name;
        let pokemonDesc = pokemon.height;
        let pokemonWeight = pokemon.weight;
        let pokemonUrl = pokemon.imageUrl;
        let pokemonType = pokemon.type;

        showPreview(pokemonName, pokemonDesc, pokemonWeight, pokemonType, pokemonUrl);

    })
  })


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

    // Testing Preview
    listPokemon.append(previewButton);

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
  // Create a live preview of pokemons

  let preview = document.querySelector(".pokedex-preview");
  let previewImg = document.createElement("img");
  let previewBox = document.createElement("div");

  previewImg.src = "https://www.flaticon.es/svg/vstatic/svg/188/188965.svg?token=exp=1617047993~hmac=0abfcf07e17abfe5c6319906901f5058";
  preview.appendChild(previewBox);
  previewBox.appendChild(previewImg);
  previewImg.classList.add("icon")

  previewImg.classList.add("column", "previewImg");
  previewBox.classList.add("pokedexBox", "col-lg-12", "col-md-12", "col-sm-12", "previewBox");

  let previewData = document.createElement("div");
  let previewName = document.createElement("h5");
  previewName.classList.add("previewTitle")
  let previewType = document.createElement("p");
  previewType.classList.add("previewType")
  let previewHeight = document.createElement("p");
  previewHeight.classList.add("previewHeight")
  let previewWidth = document.createElement("p");
  previewWidth.classList.add("previewWidth")

  previewData.appendChild(previewName);
  previewData.appendChild(previewType);
  previewData.appendChild(previewHeight);
  previewData.appendChild(previewWidth);

  preview.appendChild(previewData);


  function showPreview(title, height, weight, type, url){

  let previewTitle = document.querySelector(".previewTitle")
  previewTitle.innerText = title;

  let previewHeight = document.querySelector(".previewHeight");
  previewHeight.innerText = "Height: " + height;

  let previewWidth = document.querySelector(".previewWidth");
  previewWidth.innerText = "Weight: " + weight;


  let pokemonType = document.querySelector("previewType");
  previewType.innerText = "Type: " + type;

  let previewBox = document.querySelector(".previewBox");
  previewImg.src = url;
  previewImg.classList.remove("icon")
  }
