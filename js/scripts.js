// Pokemon Data Array

let pokemonList = [{name: "Charmander" , height: 4, type: "Fire" },
{name: "Pikachu" , height: 2, type: "Electricity" },
{name: "Bulbasaur", height: 7, type: "Grass"},
{name: "Oddish" , height: 1, type: "Poison" }
];

let pokemonList2 = [{name: "Onix" , height: 6, type: "Stone" },
{name: "Dragonair" , height: 2, type: "Water" },
{name: "Ivysaur", height: 3, type: "Grass"},
{name: "Butterfree" , height: 1, type: ["Poison", "Flying]"]}
];


function printPokemons(pokemonArray2){
  if (pokemonArray2.height > 5){
      document.write("<p>" + pokemonArray2.name + " " + "(" + "Height " + pokemonArray2.height + ")" + " -Wow that Pokemon is HUGE!" + "</p>");
    }

    else{
  document.write("<p>" + pokemonArray2.name + " " + "(" + "Height " + pokemonArray2.height + ")" + "</p>");
   }

}

pokemonList.forEach(printPokemons);








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
