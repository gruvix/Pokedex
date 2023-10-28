/// <reference types="jquery" />

document.querySelector('#search-pokemon-button').addEventListener('click', function () {
    const pokemon = $('#pokemon-id-input').val().toLowerCase();
    getPokemonHandler(pokemon)

})
document.querySelector('#previous-page').addEventListener('click', function () {
    const PREVIOUS_PAGE_OFFSET = 16;
    const previousPage = firstPokemonOnListId - PREVIOUS_PAGE_OFFSET;
    getPokemonList(previousPage)
})
document.querySelector('#next-page').addEventListener('click', function () {
    const nextPage = lastPokemonOnListId;
    getPokemonList(nextPage)
})
$('#pokemon-list').on('click', function (event) {
    const pokemon = event.target.id;
    if(pokemon === '') return;
    getPokemonHandler(pokemon)
})
getPokemonList();

/**
 * Fetches a list of Pokemon with the given offset and limit.
 * @param {number} [offset=0] - The offset of the first Pokemon to fetch.
 * @param {number} [amount=10] - The maximum number of Pokemon to fetch.
 */
function getPokemonList(offset = 0, amount = 15){
    const LOWEST_POKEMON_OFFSET = 0;
    offset = Math.max(offset, LOWEST_POKEMON_OFFSET);
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${amount}`)
    .then(response => response.json())
    .then(data => {
        updateFirstAndLastPokemon(offset, amount, data.count);
        updatePokemonList(data.results, offset);
    })
    .catch(() => {
        alert('Could not get pokemons list');
    })
}
function getPokemonHandler(pokemon){
    clearPokemon();
    getPokemonByIdOrName(pokemon);
    hidePokemonNotFoundError()
}
let firstPokemonOnListId;
let lastPokemonOnListId;
function updateFirstAndLastPokemon(offset, amount, maximumPokemonId){
    firstPokemonOnListId = offset + 1;//first offset is 0 but first pokemon is 1
    lastPokemonOnListId = offset + amount;
    if(lastPokemonOnListId > maximumPokemonId)//makes sure it doesen't go further from last pokemon
    lastPokemonOnListId = maximumPokemonId;
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
    const pageIndicator = $('#pokemon-list-page');
    pageIndicator.text(`pokemon ${firstPokemonOnListId} to ${lastPokemonOnListId}`);
}
function addPokemonToList(pokemon, index){
    const pokemonButton = $(`<button class="btn btn-link" id="${pokemon.name}">${index}. ${pokemon.name}</button>`);
    const li = $('<li></li>')
    li.append(pokemonButton);
    $('#pokemon-list').append(li);
    addLoading(li)
    fetchSpriteToList(li, pokemon);
}
function addLoading(element){
    const loading = $(`<div class="lds-dual-ring"></div>`);
    loading.addClass('lds-dual-ring');
    element.append(loading);
}
function removeLoading(element){
    element.children('.lds-dual-ring').remove();
}
function fetchSpriteToList(element, pokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    .then(response => response.json())
    .then(data => {
        addSprite(data.sprites.front_default, element)
        removeLoading(element)
    })
    .catch(() => {
        alert('Could not get pokemon for sprite list');
    })
}
function addSprite(sprite, htmlItem){
    if(sprite === null) return;
    const img = $(`<img src="${sprite}" class="list-sprite">`);
    htmlItem.append(img);
}
function clearPokemonList(){
    const list = $('#pokemon-list');
    list.children().remove();
}

function getPokemonByIdOrName(pokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => response.json())
    .then(data => {
        displayPokemon(data);
    })
    .catch(() => {
        showPokemonNotFoundError(pokemon);
    });
}
function displayPokemon(pokemon){
    for(const spriteCategory in pokemon.sprites.other){
        for(const sprite in pokemon.sprites.other[spriteCategory]){//only other (best) sprites, main sprites are too small
            if(pokemon.sprites.other[spriteCategory][sprite] !== null){
                addImageToCarousel(pokemon.sprites.other[spriteCategory][sprite]);
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
    const carousel = $('#pokemon-carousel .carousel-inner');
    carousel.children().remove();
}







// ## construir un pokedex
// Documentacion https://pokeapi.co/
// listar pokemons y poder cambiar de página
// ver detalles de 1 pokemon incluyendo al menos 1 foto
