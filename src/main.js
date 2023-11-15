/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/// <reference types="jquery" />
import updatePokemons from './pokemonList.js';
import getPokemonHandler from './pokemon.js';

document.querySelector('#random-pokemon-button').addEventListener('click', () => {
  const random = generateRandomId();
  updatePokemons(random);
});
document.querySelector('#search-pokemon-button').addEventListener('click', () => {
  const pokemon = $('#pokemon-id-input').val().toLowerCase();
  getPokemonHandler(pokemon);
});
document.querySelector('#previous-page').addEventListener('click', () => {
  const PREVIOUS_PAGE_OFFSET = 16;
  const previousPage = getFirstPokemonOnListId() - PREVIOUS_PAGE_OFFSET;
  updatePokemons(previousPage);
});
document.querySelector('#next-page').addEventListener('click', () => {
  const nextPage = getLastPokemonOnListId();
  updatePokemons(nextPage);
});
$('#pokemon-list').on('click', (event) => {
  const pokemon = event.target.id;
  if (!event.target.classList.contains('btn-link')) return;
  getPokemonHandler(pokemon);
});
updatePokemons();
/**
 * Updates the list of Pokemon with the given offset and limit.
 * @param {number} [offset=0] - The offset of the first Pokemon to fetch.
 * @param {number} [amount=15] - The maximum number of Pokemon to fetch.
 */

// ## construir un pokedex
// Documentacion https://pokeapi.co/
// listar pokemons y poder cambiar de página
// ver detalles de 1 pokemon incluyendo al menos 1 foto
