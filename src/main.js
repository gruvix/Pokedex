/* eslint-disable import/extensions */
/// <reference types="jquery" />
import * as pokeList from './pokemonList.js';
import getPokemonHandler from './pokemon.js';
import generateRandomId from './utils.js';

$('#random-pokemon-button').on('click', () => {
  const random = generateRandomId();
  pokeList.updatePokemons(random);
});
$('#search-pokemon-button').on('click', () => {
  const pokemon = $('#pokemon-id-input').val().toLowerCase();
  getPokemonHandler(pokemon);
});
$('#previous-page').on('click', () => {
  const PREVIOUS_PAGE_OFFSET = 16;
  const previousPage = pokeList.getFirstPokemonOnListId() - PREVIOUS_PAGE_OFFSET;
  pokeList.updatePokemons(previousPage);
});
$('#next-page').on('click', () => {
  const nextPage = pokeList.getLastPokemonOnListId();
  pokeList.updatePokemons(nextPage);
});
$('#pokemon-list').on('click', (event) => {
  const pokemon = event.target.id;
  if (!event.target.classList.contains('btn-link')) return;
  getPokemonHandler(pokemon);
});
$('#pokemon-storage').on('click', () => {
  $('#pokemon-storage-modal').modal('show');
});
$('#pokemon-favorite').on('click', () => {
  const pokemonFavorite = $('#pokemon-favorite');
  if (pokemonFavorite.attr('data-favorite') === 'true') {
    pokemonFavorite.attr('data-favorite', 'false');
    pokemonFavorite.text('☆');
  } else {
    pokemonFavorite.attr('data-favorite', 'true');
    pokemonFavorite.text('★');
  }
});
pokeList.updatePokemons();
// ## construir un pokedex
// Documentacion https://pokeapi.co/
// listar pokemons y poder cambiar de página
// ver detalles de 1 pokemon incluyendo al menos 1 foto
