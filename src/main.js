/* eslint-disable import/extensions */
/// <reference types="jquery" />
import * as pokemonList from './pokemonList.js';
import getPokemonHandler from './pokemon.js';
import generateRandomId from './utils.js';

$('#random-pokemon-button').on('click', () => {
  const random = generateRandomId();
  pokemonList.updatePokemons(random);
});
$('#search-pokemon-button').on('click', () => {
  const pokemon = $('#pokemon-id-input').val().toLowerCase();
  getPokemonHandler(pokemon);
});
$('#previous-page').on('click', () => {
  const PREVIOUS_PAGE_OFFSET = 16;
  const previousPage = pokemonList.getFirstPokemonOnListId() - PREVIOUS_PAGE_OFFSET;
  pokemonList.updatePokemons(previousPage);
});
$('#next-page').on('click', () => {
  const nextPage = pokemonList.getLastPokemonOnListId();
  pokemonList.updatePokemons(nextPage);
});
$('#pokemon-list').on('click', (event) => {
  const pokemon = event.target.id;
  if (!event.target.classList.contains('btn-link')) return;
  getPokemonHandler(pokemon);
});
pokemonList.updatePokemons();

// ## construir un pokedex
// Documentacion https://pokeapi.co/
// listar pokemons y poder cambiar de página
// ver detalles de 1 pokemon incluyendo al menos 1 foto
