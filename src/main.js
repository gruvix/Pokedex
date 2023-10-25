/// <reference types="jquery" />

document.querySelector('#searchPokemonByIdButton').addEventListener('click', function () {
    const pokemon = document.querySelector('#pokemonIdInput').value
    getPokemonById(pokemon)
    hidePokemonNotFoundError()
})

function getPokemonById(pokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayPokemon(data);
    })
    .catch(() => {
        console.log('pokeapi server error')
    })
}








// ## construir un pokedex
// Documentacion https://pokeapi.co/
// listar pokemons y poder cambiar de página
// ver detalles de 1 pokemon incluyendo al menos 1 foto
