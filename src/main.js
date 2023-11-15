/// <reference types="jquery" />

document.querySelector('#search-pokemon-button').addEventListener('click', function () {
    const pokemon = $('#pokemon-id-input').val().toLowerCase();
    getPokemonHandler(pokemon)

})
document.querySelector('#previous-page').addEventListener('click', function () {
    const previousPage = firstPokemon - 16;
    getPokemonList(previousPage)
})
document.querySelector('#next-page').addEventListener('click', function () {
    const nextPage = lastPokemon;
    getPokemonList(nextPage)
})
$('#pokemon-list').on('click', function (event) {
    const pokemon = event.target.textContent.toLowerCase();
    getPokemonHandler(pokemon)
})
getPokemonList();

/**
 * Fetches a list of Pokemon with the given offset and limit.
 * @param {number} [offset=0] - The offset of the first Pokemon to fetch.
 * @param {number} [amount=10] - The maximum number of Pokemon to fetch.
 */
function getPokemonList(offset = 0, amount = 15){
    offset = Math.max(offset, 0);
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${amount}`)
    .then(response => response.json())
    .then(data => {
        updateFirstAndLastPokemon(offset, amount);
        updatePokemonList(data.results);
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
let firstPokemon;
let lastPokemon;
function updateFirstAndLastPokemon(offset, amount){
    firstPokemon = offset + 1;//first pokemon is 1 but first offset is 0
    lastPokemon = offset + amount;
}
function updatePokemonList(pokemonList){
    clearPokemonList();
    for(const pokemon of pokemonList){
        addPokemonToList(pokemon);
    }
    updatePageIndicator();
}
function updatePageIndicator(){
    const pageIndicator = $('#pokemon-list-page');
    pageIndicator.text(`pokemon ${firstPokemon} to ${lastPokemon}`);
}
function addPokemonToList(pokemon){
    const pokemonButton = $(`<button class="btn btn-link">${pokemon.name}</button>`);
    const li = $('<li></li>')
    li.append(pokemonButton);
    $('#pokemon-list').append(li);
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







// ## construir un pokedex
// Documentacion https://pokeapi.co/
// listar pokemons y poder cambiar de página
// ver detalles de 1 pokemon incluyendo al menos 1 foto
