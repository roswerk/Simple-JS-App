let pokemonRepository=(function(){let pokemons=[];let apiUrl="https://pokeapi.co/api/v2/pokemon/?offset=0&limit=5";function getAll(){return pokemons}
function add(item){return pokemons.push(item)}
function addListItem(pokemon){let pokemonlist=document.querySelector(".pokemon-list");let listPokemon=document.createElement('li');listPokemon.classList.add("list-group-item");let button=document.createElement('button');button.classList.add("btn","btn-outline-secondary");button.innerText=pokemon.name;let previewButton=document.createElement("button");previewButton.classList.add("btn","btn-outline-secondary","btn-sm","float-right");previewButton.innerText="Preview";previewButton.addEventListener("click",function(event){loadDetails(pokemon).then(function(){let pokemonName=pokemon.name;let pokemonDesc=pokemon.height;let pokemonWeight=pokemon.weight;let pokemonUrl=pokemon.imageUrl;let pokemonType=pokemon.type;showPreview(pokemonName,pokemonDesc,pokemonWeight,pokemonType,pokemonUrl)})})
button.addEventListener("click",function(event){loadDetails(pokemon).then(function(){let pokemonName=pokemon.name;let pokemonDesc=pokemon.height;let pokemonWeight=pokemon.weight;let pokemonUrl=pokemon.imageUrl;let pokemonType=pokemon.type;showModal(pokemonName,pokemonDesc,pokemonWeight,pokemonType,pokemonUrl);$('#exampleModalCenter').modal("show")})})
button.classList.add("button-class");button.classList.add("btn")
listPokemon.appendChild(button);listPokemon.append(previewButton);pokemonlist.appendChild(listPokemon);function showDetails(item){pokemonRepository.loadDetails(item).then(function(){console.log(item.name)})}}
function loadList(){showLoadingMessage();return fetch(apiUrl).then(function(response){return response.json()}).then(function(json){json.results.forEach(function(item){let pokemon={name:item.name,detailsUrl:item.url};add(pokemon)})}).then(function(){hideLoadingMessage()}).catch(function(e){console.error(e)})
hideLoadingMessage()}
function loadDetails(item){let url=item.detailsUrl;return fetch(url).then(function(response){return response.json()}).then(function(details){item.imageUrl=details.sprites.front_default;item.height=details.height;item.weight=details.weight;item.type=details.types[0].type.name}).catch(function(e){console.error(e)})}
function showDetails(pokemon){loadDetails(pokemon).then(function(){console.log(pokemon)})}
function showLoadingMessage(){loadImage=document.querySelector(".loadingImage");loadImage.classList.add("show")}
function hideLoadingMessage(){loadImage=document.querySelector(".loadingImage");loadImage.classList.remove("show")}
return{add:add,getAll:getAll,addListItem:addListItem,loadList:loadList,loadDetails:loadDetails,showDetails:showDetails,showLoadingMessage:showLoadingMessage,hideLoadingMessage:hideLoadingMessage}})();pokemonRepository.loadList().then(function(){pokemonRepository.showLoadingMessage();setTimeout(function(){pokemonRepository.getAll().forEach(function(pokemon){pokemonRepository.addListItem(pokemon)})
pokemonRepository.hideLoadingMessage()},1000)});searchPokemonList=document.querySelector(".pokemon-list")
let searchBar=document.forms.filter.querySelector("input");searchBar.addEventListener("keyup",function(e){let term=e.target.value.toLowerCase();let searchPokemons=searchPokemonList.getElementsByTagName("li");Array.from(searchPokemons).forEach(function(searchPokemons){let poke=searchPokemons.firstElementChild.textContent;if(poke.toLowerCase().indexOf(term)!=-1){searchPokemons.style.display="block"}else{searchPokemons.style.display="none"}})})
function showModal(title,height,weight,type,url){let modalTitle=document.getElementById("modalTitle");modalTitle.innerText=title;let pokemonHeight=document.getElementById("exampleModalCenterText1");pokemonHeight.innerText="Height: "+height;pokemonHeight.classList.add("modal-body");let pokemonWeight=document.getElementById("exampleModalCenterText2");pokemonWeight.innerText="Weight: "+weight;pokemonWeight.classList.add("modal-body");let pokemonType=document.getElementById("exampleModalCenterText3");pokemonType.innerText="Type: "+type;pokemonType.classList.add("modal-body");let modalImage=document.getElementById("exampleModalCenterText4");modalImage.src=url;modalImage.classList.add("pokemonImage")}
let addpokemonbutton=document.getElementById("NavAddPokemon");addpokemonbutton.addEventListener("click",function(){$('#addPokemonModal').modal("show")})
let pokemonObject={}
let newPokemonObject;let newPokemonName=document.getElementById("addNewPokemonName");let newPokemonType=document.getElementById("addNewPokemonType");let newPokemonHeight=document.getElementById("addNewPokemonHeight");let newPokemonWeight=document.getElementById("addNewPokemonWeight");let newPokemonImgUrl=document.getElementById("addNewPokemonImg");function getNewPokemon(){Object.assign(pokemonObject,{name:newPokemonName.value});Object.assign(pokemonObject,{type:newPokemonType.value});Object.assign(pokemonObject,{height:newPokemonHeight.value});Object.assign(pokemonObject,{weight:newPokemonWeight.value});Object.assign(pokemonObject,{imageUrl:newPokemonImgUrl.value});let string=JSON.stringify(pokemonObject);newPokemonObject=JSON.parse(string)}
addPokemon.addEventListener("click",function(){getNewPokemon();pokemonRepository.add(newPokemonObject)
pokemonRepository.addListItem(newPokemonObject);$('#addPokemonModal').on('hidden.bs.modal',function(){$(this).find('form').trigger('reset')})})
let preview=document.querySelector(".pokedex-preview");let previewImg=document.createElement("img");let previewBox=document.createElement("div");previewImg.src="img/pokebola.svg";preview.appendChild(previewBox);previewBox.appendChild(previewImg);previewImg.classList.add("icon")
previewImg.classList.add("column","previewImg","col-lg-12","col-md-12","col-sm-12");previewBox.classList.add("pokedexBox","col-lg-12","col-md-12","col-sm-12","previewBox");let previewData=document.createElement("div");previewData.classList.add("previewData")
let previewName=document.createElement("h5");previewName.classList.add("previewTitle")
let previewType=document.createElement("p");previewType.classList.add("previewType")
let previewHeight=document.createElement("p");previewHeight.classList.add("previewHeight")
let previewWidth=document.createElement("p");previewWidth.classList.add("previewWidth")
previewData.appendChild(previewName);previewData.appendChild(previewType);previewData.appendChild(previewHeight);previewData.appendChild(previewWidth);preview.appendChild(previewData);function showPreview(title,height,weight,type,url){let previewTitle=document.querySelector(".previewTitle")
previewTitle.innerText=title;let previewHeight=document.querySelector(".previewHeight");previewHeight.innerText="Height: "+height;let previewWidth=document.querySelector(".previewWidth");previewWidth.innerText="Weight: "+weight;let pokemonType=document.querySelector("previewType");previewType.innerText="Type: "+type;let previewBox=document.querySelector(".previewBox");previewImg.src=url;previewImg.classList.remove("icon")}