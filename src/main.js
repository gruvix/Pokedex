/// <reference types="jquery" />

document.querySelector('#searchPokemonByIdButton').addEventListener('click', function () {
    const pokemon = document.querySelector('#pokemonIdInput').value.toLowerCase();
    getPokemonById(pokemon)
    hidePokemonNotFoundError()
})

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
                addImageToPokemonCarousel(pokemon.sprites.other[spriteCategory][sprite]);
            }
        }
    }
}

function addImageToPokemonCarousel(imageSource){
    const img = document.createElement('img');
    img.src = imageSource;
    const div = document.createElement('div');
    div.appendChild(img);
    document.querySelector('#pokemonCarousel').children[0].appendChild(div);
    div.classList.add('carousel-item');
}

function showPokemonNotFoundError(pokemon){
    document.querySelector('#pokemonNameError').textContent = pokemon;
    document.querySelector('#pokemonNotFound').classList.remove('hidden');
}
function hidePokemonNotFoundError(){
    document.querySelector('#pokemonNotFound').classList.add('hidden');
}







// ## construir un pokedex
// Documentacion https://pokeapi.co/
// listar pokemons y poder cambiar de página
// ver detalles de 1 pokemon incluyendo al menos 1 foto
