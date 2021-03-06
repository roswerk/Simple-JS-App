// GLOBAL Pokemon Data Array

let pokemonList = [{name: "Charmander" , height: 4, type: "Fire" },
{name: "Pikachu" , height: 2, type: "Electricity" },
{name: "Bulbasaur", height: 7, type: "Grass"},
{name: "Oddish" , height: 1, type: "Poison" }
];


// IIEF
let pokemonRepository = (function (){

// Local Pokemon Data Array
let pokemons = [{name: "Onix", height: 6, type: "Stone"},
{name: "Dragonair", height: 2, type: "Water" },
{name: "Ivysaur", height: 3, type: "Grass"},
{name: "Butterfree", height: 1, type: ["Poison", "Flying]"]}
];

// Returns all pokemons as an Array
function getAll(){
  return pokemons;
}

// Adds an "item/pokemon" to the back of the Array
function add(item){
  return pokemons.push(item);
}


// Display pokemons as a ul/li
function addListItem(pokemon){
  // Define pokemonList as a variable using the class selector of the Ul
  let pokemonlist = document.querySelector(".pokemon-list");
    // Define listPokemon as the li node
  let listPokemon = document.createElement('li');
  // Create a button
  let button = document.createElement('button');
  // Set inner text of button
  button.innerText = pokemon.name;

  // Add event listener to button
  button.addEventListener("click", showDetails);
  // Change class name in button
  button.classList.add("button-class");
  // Append button to listPokemon (li)
  listPokemon.appendChild(button);
  // Append listPokemon to pokemonList (Ul)
  pokemonlist.appendChild(listPokemon)

  function showDetails(pokemon){
    console.log(button.innerText);
  };
}


// Key Values to access the IIEF Local Variables
return {
  add: add,
  getAll: getAll,
  addListItem: addListItem
};


})();





// Get users input and display on screen
function getPokemon(){
  let newPokemon = document.getElementById("newPokemon").value;
  let result = document.getElementById("result");
    let newPokemonHeight = document.getElementById("newPokemonHeight").value;

    if (newPokemonHeight !== ""){
      newPokemon = [ newPokemon +  " (height: " + newPokemonHeight + ")"]
    }
    else {
    newPokemon = [ newPokemon ]
    }

    pokemonRepository.add(newPokemon)
    if (newPokemonHeight > 5){
    result.textContent = newPokemon + "-Wow that Pokemon is HUGE!"
  } else{
    result.textContent = newPokemon
    }
  }


pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);

});
