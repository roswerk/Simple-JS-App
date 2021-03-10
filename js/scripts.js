// Pokemon Data Array

let pokemonList = [{name: "Charmander" , height: 4, type: "Fire" },
{name: "Pikachu" , height: 2, type: "Electricity" },
{name: "Bulbasaur", height: 7, type: "Grass"},
{name: "Oddish" , height: 1, type: "Poison" }
];

// Print all available pokemons in the DOM
for (let i=0; i < pokemonList.length; i++){

// If a pokemon has height over 5, display a message "Wow thats huge next to it" - Only one pokemon should evaluate true
if (pokemonList[i].height > 5){
    document.write(pokemonList[i].name + " " + "(" + "Height " + pokemonList[i].height + ")" + " -Wow that Pokemon is HUGE!" + "<br>" + "<br>");
  }

  else{
document.write(pokemonList[i].name + " " + "(" + "Height " + pokemonList[i].height + ")" + "<br>" + "<br>");
}




}









// document.write("The available pokemons are: ");
//
// document.write(pokemonList[0].name + ",", "\n",
// pokemonList[1].name + ",", "\n",
// pokemonList[2].name + ",", "\n",
// pokemonList[3].name + ".", "\n");


// document.write(
// "The available pokemons are: ",
// pokemonList.map((poke) => poke.name)
// );
