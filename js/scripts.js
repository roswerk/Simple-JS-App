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


// Key Values to access the IIEF Local Variables
return {
  add: add,
  getAll: getAll
};

})();

// Add a pokemon to the IIEF varibale pokemons
pokemonRepository.add({name: "Raichu", height: 3, type: "Electricity"});



function printPokemons(pokemonArray2){
  if (pokemonArray2.height > 5){
      document.write("<p>" + pokemonArray2.name + " " + "(" + "Height " + pokemonArray2.height + ")" + " -Wow that Pokemon is HUGE!" + "</p>");
    }

    else{
  document.write("<p>" + pokemonArray2.name + " " + "(" + "Height " + pokemonArray2.height + ")" + "</p>");
   }

}

// Prints out the Local Pokemon Array of the IIEF and filters it out through the
// function printPokemons to output Names and Height
pokemonRepository.getAll().forEach(printPokemons);


// Get users input and display on screen
function getPokemon(){
  let newPokemon = document.getElementById("newPokemon").value;
  let result = document.getElementById("result");
    let newPokemonHeight = document.getElementById("newPokemonHeight").value;
      newPokemonHeight = newPokemonHeight;
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
