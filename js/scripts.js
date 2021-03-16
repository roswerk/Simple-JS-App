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

// Key Values to access the IIEF Local Variables
return {
  add: add,
  getAll: getAll
};

})();

// Adds a pokemon to the IIEF varibale pokemons
pokemonRepository.add({name: "Raichu", height: 3});




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








// OLD ForLoop Version
//
// function printArrayDetails(pokemonArray){
// // Print all available pokemons in the DOM
// for (let i=0; i < pokemonArray.length; i++){
//
// // If a pokemon has height over 5, display a message "Wow thats huge next to it" - Only one pokemon should evaluate true
// if (pokemonArray[i].height > 5){
//     document.write("<p>" + pokemonArray[i].name + " " + "(" + "Height " + pokemonArray[i].height + ")" + " -Wow that Pokemon is HUGE!" + "</p>");
//   }
//
//   else{
// document.write("<p>" + pokemonArray[i].name + " " + "(" + "Height " + pokemonArray[i].height + ")" + "</p>");}
// }
//
// }
//
// printArrayDetails(pokemonList);
