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
        showPokemonNotFoundError(pokemon)
    })
}

function displayPokemon(pokemon){
    console.log(pokemon.base_experience)
}

function showPokemonNotFoundError(pokemon){
    document.querySelector('#pokemonNotFound').classList.remove('hidden');
    document.querySelector('#pokemonNameError').textContent = pokemon;
}
function hidePokemonNotFoundError(){
    document.querySelector('#pokemonNotFound').classList.add('hidden');
}







// ## construir un pokedex
// Documentacion https://pokeapi.co/
// listar pokemons y poder cambiar de página
// ver detalles de 1 pokemon incluyendo al menos 1 foto
