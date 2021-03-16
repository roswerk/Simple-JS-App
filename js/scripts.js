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
  if (typeof item === 'object'){

   if (Object.keys(pokemons[0]).some((key) => key in item)) {
   return pokemons.push(item);
 }
}
 else{
   alert("The pokemon you added is not an object");
 }
}

// Display pokemons as a ul/li
function addListItem(pokemon){
  let pokemonlist = document.querySelector(".pokemon-list");
  let listPokemon = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listPokemon.appendChild(button);
  pokemonlist.appendChild(listPokemon)
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


// Task 1.6 - Add an Ul ----- Unfinished and broken

pokemonRepository.getAll().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);

});
