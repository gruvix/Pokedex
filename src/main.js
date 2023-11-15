/// <reference types="jquery" />

document.querySelector('#searchPokemonByIdButton').addEventListener('click', function () {
    const pokemon = document.querySelector('#pokemonIdInput').value.toLowerCase();
    getPokemonById(pokemon)
    hidePokemonNotFoundError()
})
getPokemonList();

/**
 * Fetches a list of Pokemon with the given offset and limit.
 * @param {number} [offset=0] - The offset of the first Pokemon to fetch.
 * @param {number} [amount=10] - The maximum number of Pokemon to fetch.
 */
function getPokemonList(offset = 0, amount = 10){
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${amount}`)
    .then(response => response.json())
    .then(data => {
        updatePokemonList(data.results);
    })
    .catch(() => {
        alert('Could not get pokemons list');
    })
}

function updatePokemonList(pokemonList){
    clearPokemonListExceptHeadline();
    for(const pokemon of pokemonList){
        addPokemonToList(pokemon);
    }
}
function clearPokemonListExceptHeadline(){
    const list = $('#pokemon-list');
    list.children().not('h3').remove();
}

function getPokemonById(pokemon){
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
    console.log(pokemon)
    for(const spriteCategory in pokemon.sprites.other){
        for(const sprite in pokemon.sprites.other[spriteCategory]){
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
    const carousel = document.querySelector('#pokemonCarousel');
    carousel.children[0].appendChild(div);
    div.classList.add('carousel-item');
    if(carousel.children[0].children.length === 1){
        div.classList.add('active');
    }
}

function showPokemonNotFoundError(pokemon){
    $('#pokemonNameOrIdDoesNotExist').text(pokemon);
    $('#pokemonNotFound').removeClass('hidden');
}
function hidePokemonNotFoundError(){
    document.querySelector('#pokemonNotFound').classList.add('hidden');
}







// ## construir un pokedex
// Documentacion https://pokeapi.co/
// listar pokemons y poder cambiar de página
// ver detalles de 1 pokemon incluyendo al menos 1 foto
