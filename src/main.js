/// <reference types="jquery" />
import * as pokeList from './pokemonList.js';
import getPokemonHandler from './pokemon.js';
import generateRandomId from './utils.js';
import {
  toggleCaptured,
  launchBackpack,
  hideBackpack,
  wipeCapturedPokemon,
  updateBackpackAmountIndicators,
  updateBackpackIndicator,
} from './backpack.js';

$('#random-pokemon-button').on('click', () => {
  const random = generateRandomId();
  pokeList.updatePokemons(random);
});
$('#search-pokemon-button').on('click', () => {
  const pokemon = $('#pokemon-id-input').val().toLowerCase();
  getPokemonHandler(pokemon, updateBackpackIndicator);
});
$('#previous-page-button').on('click', () => {
  const PREVIOUS_PAGE_OFFSET = 16;
  const previousPage = pokeList.getFirstPokemonOnListId() - PREVIOUS_PAGE_OFFSET;
  pokeList.updatePokemons(previousPage);
});
$('#next-page-button').on('click', () => {
  const nextPage = pokeList.getLastPokemonOnListId();
  pokeList.updatePokemons(nextPage);
});
$('#pokemon-list').on('click', (event) => {
  const pokemon = event.target.id;
  if (!event.target.classList.contains('btn-link')) return;
  getPokemonHandler(pokemon, updateBackpackIndicator);
});
$('#launch-pokemon-backpack-button').on('click', () => {
  launchBackpack();
});
$('#empty-backpack-button').on('click', () => {
  wipeCapturedPokemon();
});
$('#close-pokemon-backpack-button').on('click', () => {
  hideBackpack();
});
$('#pokemon-catch-button').on('click', () => {
  toggleCaptured();
});

function initialize() {
  pokeList.updatePokemons();
  updateBackpackAmountIndicators();
}
initialize();
