/// <reference types="jquery" />

document.querySelector('#search-pokemon-button').addEventListener('click', function () {
    const pokemon = $('#pokemon-id-input').val().toLowerCase();
    getPokemonHandler(pokemon)

})
document.querySelector('#previous-page').addEventListener('click', function () {
    const PREVIOUS_PAGE_OFFSET = 16;
    const previousPage = firstPokemonOnListId - PREVIOUS_PAGE_OFFSET;
    getPokemons(previousPage)
})
document.querySelector('#next-page').addEventListener('click', function () {
    const nextPage = lastPokemonOnListId;
    getPokemons(nextPage)
})
$('#pokemon-list').on('click', event => {
    const pokemon = event.target.id;
    if(!event.target.classList.contains("btn-link")) return;
    getPokemonHandler(pokemon)
})
getPokemons()

/**
 * Fetches a list of Pokemon with the given offset and limit.
 * @param {number} [offset=0] - The offset of the first Pokemon to fetch.
 * @param {number} [amount=15] - The maximum number of Pokemon to fetch.
 */
function getPokemons(offset = 0, amount = 15){
    const LOWEST_POKEMON_OFFSET = 0;
    offset = Math.max(offset, LOWEST_POKEMON_OFFSET);
    return fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${amount}`)
    .then(response => response.json())
    .then(pokemons => {
        updatePokemons(pokemons, offset, amount);
    })
    .catch(() => {
        alert('Could not get pokemons list');
    })
}
function updatePokemons(pokemons, offset = 0, amount = 15){
    if(!totalPokemon) { updateTotalPokemon(pokemons.count); };
    updateFirstAndLastPokemon(offset, amount);
    updatePokemonList(pokemons.results, offset);
}
function updateTotalPokemon(total){
    totalPokemon = total;
    try{
        Cypress.env('totalPokemon', total);

    } catch(error){
        console.log(error);
    }
}
function getPokemonHandler(pokemon){
    clearPokemon();
    addLoadingToPokemon();
    hidePokemonNotFoundError()
    getPokemonByIdOrName(pokemon);
}
function addLoadingToPokemon(){
    $('#pokemon-carousel .carousel-inner')
    .append(`<div class="loader pokemon-carousel active"></div>`)
}
function removeLoadingFromPokemon(){
    $('#pokemon-carousel .loader.pokemon-carousel').remove();
}
let totalPokemon // total amount of pokemons is global por testing purposes
let firstPokemonOnListId;
let lastPokemonOnListId;
function updateFirstAndLastPokemon(offset, amount){
    firstPokemonOnListId = offset + 1;//first offset is 0 but first pokemon is 1
    lastPokemonOnListId = offset + amount;
    if(lastPokemonOnListId > totalPokemon)//makes sure it doesen't go further from last pokemon
    lastPokemonOnListId = totalPokemon;
}
function updatePokemonList(pokemonList, offset){
    clearPokemonList();
    let i = 0;
    for(const pokemon of pokemonList){
        i++
        addPokemonToList(pokemon, offset+i);
    }
    updatePageIndicator();
}
function updatePageIndicator(){
    const pageIndicator = $('#pokemon-now-showing');
    pageIndicator.text(`pokemon ${firstPokemonOnListId} to ${lastPokemonOnListId}`);
}
function addPokemonToList(pokemon, index){
    const pokemonButton = $(`<button class="btn btn-link" id="${pokemon.name}">${index}. ${pokemon.name}</button>`);
    const li = $('<li></li>')
    li.append(pokemonButton);
    $('#pokemon-list').append(li);
    addLoadingToListItem(li)
    fetchSpriteToList(li, pokemon);
}
function addLoadingToListItem(element){
    const loading = $(`<div class="lds-dual-ring"></div>`);
    loading.addClass('lds-dual-ring');
    element.append(loading);
}
function removeLoadingFromListItem(element){
    element.children('.lds-dual-ring').remove();
}
function fetchSpriteToList(element, pokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    .then(response => response.json())
    .then(data => {
        addSprite(data.sprites.front_default, element)
        removeLoadingFromListItem(element)
    })
    .catch(() => {
        alert('Could not get pokemon for sprite list');
    })
}
function addSprite(sprite, htmlItem){
    if(!sprite) return;
    const img = $(`<img src="${sprite}" class="list-sprite">`);
    htmlItem.append(img);
}
function clearPokemonList(){
    const list = $('#pokemon-list');
    list.children().remove();
}

function getPokemonByIdOrName(pokemon){
    if(pokemon === 'michelin'){
        easterEgg();
        return;
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => response.json())
    .then(data => {
        pokemonHandler(data);
    })
    .catch(() => {
        showPokemonNotFoundError(pokemon);
        clearPokemon();
    });
}
function easterEgg(){
    const michelin = {
        name: 'michelin',
        types: [
            {
                type: {
                    name: 'normal'
                }
            }
        ],
        abilities: [
            {
                ability: {
                    name: 'strong wheels'
                }
            }
        ],
        moves: [
            {
                move: {
                    name: 'change wheel'
                }
            },
            {
                move: {
                    name: 'wheel slide'
                }
            }
        ],
        sprites: {
            other: {
                michelinWorld: {
                    michelin1: "img/michelin1.jpeg",
                    michelin2: "img/michelin2.jpeg",
                    michelin3: "img/michelin3.jpeg",
                }
            }
        }
    }
    pokemonHandler(michelin);
}
function pokemonHandler(pokemon){
    showPokemonInfo()
    removeLoadingFromPokemon();
    updateName(pokemon);
    updateTypes(pokemon.types)
    updateAbilities(pokemon.abilities)
    updateMoves(pokemon.moves)
    displayPokemon(pokemon.sprites.other);
}
function showPokemonInfo(){
    $('#pokemon-info').removeClass('hidden');
}
function updateTypes(types){
    for(const type of types){
        const div  = $(`<div><i class="type-${type.type.name}">${type.type.name}</i></div>`);
        $('#pokemon-types').append(div);
    }
}
function updateAbilities(abilities){
    for(const ability of abilities){
        const div  = $(`<div><i class="pokemon-ability">${ability.ability.name}</i></div>`);
        $('#pokemon-abilities').append(div);
    }
}
function updateMoves(moves){
    const COMPLETE_PAIR = 2;
    let currentRow = $("<tr></tr>")
    $("#pokemon-moves-table").append(currentRow);
    moves.forEach(move => {  
        const td = $(`<td style="width: 60%;">${move.move.name}</td>`)     
        if(currentRow.children().length === COMPLETE_PAIR)
        {
            currentRow = $("<tr></tr>")
            $("#pokemon-moves-table").append(currentRow);
        }
        currentRow.append(td);
    });
}
function updateName(pokemon){
    const name = pokemon.name;
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const nameElement = $('#pokemon-name');
    nameElement.text(capitalizedName).addClass(`type-${pokemon.types[0].type.name}`);
}
function displayPokemon(sprites){
    for(const spriteCategory in sprites){
        for(const sprite in sprites[spriteCategory]){//only other (best) sprites, main sprites are too small
            if(sprites[spriteCategory][sprite]){
                addImageToCarousel(sprites[spriteCategory][sprite]);
            }
        }
    }
}

function addImageToCarousel(imageSource){
    const img = document.createElement('img');
    img.src = imageSource;
    const div = document.createElement('div');
    div.appendChild(img);
    const carousel = document.querySelector('#pokemon-carousel .carousel-inner');
    carousel.appendChild(div);
    div.classList.add('carousel-item');
    if(carousel.children.length === 1){
        div.classList.add('active');
    }
}

function showPokemonNotFoundError(pokemon){
    $('#pokemon-does-not-exist').text(pokemon);
    $('#pokemon-not-found').removeClass('hidden');
}
function hidePokemonNotFoundError(){
    document.querySelector('#pokemon-not-found').classList.add('hidden');
}
function clearPokemon(){
    $('#pokemon-carousel .carousel-inner').children().remove();
    $('#pokemon-name').removeClass()
    $('#pokemon-abilities').children().empty();
    $('#pokemon-types').children().empty();
    $("#pokemon-moves-table").children().empty();
    $('#pokemon-info').addClass('hidden');

}







// ## construir un pokedex
// Documentacion https://pokeapi.co/
// listar pokemons y poder cambiar de página
// ver detalles de 1 pokemon incluyendo al menos 1 foto
