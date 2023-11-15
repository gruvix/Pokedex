/* eslint-disable import/extensions */
/// <reference types="jquery" />
import * as pokeList from './pokemonList.js';
import getPokemonHandler from './pokemon.js';
import generateRandomId from './utils.js';

document.querySelector('#random-pokemon-button').addEventListener('click', () => {
  const random = generateRandomId();
  pokeList.updatePokemons(random);
});
document.querySelector('#search-pokemon-button').addEventListener('click', () => {
  const pokemon = $('#pokemon-id-input').val().toLowerCase();
  getPokemonHandler(pokemon);
});
document.querySelector('#previous-page').addEventListener('click', () => {
  const PREVIOUS_PAGE_OFFSET = 16;
  const previousPage = pokeList.getFirstPokemonOnListId() - PREVIOUS_PAGE_OFFSET;
  pokeList.updatePokemons(previousPage);
});
document.querySelector('#next-page').addEventListener('click', () => {
  const nextPage = pokeList.getLastPokemonOnListId();
  pokeList.updatePokemons(nextPage);
});
$('#pokemon-list').on('click', (event) => {
  const pokemon = event.target.id;
  if (!event.target.classList.contains('btn-link')) return;
  getPokemonHandler(pokemon);
});
pokeList.updatePokemons();

// ## construir un pokedex
// Documentacion https://pokeapi.co/
// listar pokemons y poder cambiar de página
// ver detalles de 1 pokemon incluyendo al menos 1 foto
