/// <reference types="jquery" />

document.querySelector('#searchPokemonByIdButton').addEventListener('click', function () {
    const pokemonId = document.querySelector('#pokemonIdInput').value
    getPokemonById(pokemonId)
})








// ## construir un pokedex
// Documentacion https://pokeapi.co/
// listar pokemons y poder cambiar de página
// ver detalles de 1 pokemon incluyendo al menos 1 foto
