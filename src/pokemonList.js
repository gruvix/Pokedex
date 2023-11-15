/* eslint-disable import/extensions */
import * as display from './displayList.js';
import * as request from './apiRequests.js';

function updateTotalPokemon(total) {
  $('#pokemon-now-showing').attr('data-total', total);
}
function updateFirstPokemonIndex(offset) {
  $('#pokemon-now-showing').attr('data-index', offset);
}

export function getFirstPokemonOnListId() {
  const offset = Number($('#pokemon-now-showing').attr('data-index'));
  return offset + 1;// offset starts in 0, pokemon list starts in 1
}
export function getLastPokemonOnListId() {
  const AMOUNT = $('#pokemon-list li').length;
  const offset = Number($('#pokemon-now-showing').attr('data-index'));
  const TOTAL = $('#pokemon-now-showing').attr('data-total');
  return Math.min(offset + AMOUNT, TOTAL);
}
function updatePageIndicator() {
  const pageIndicator = $('#pokemon-now-showing');
  pageIndicator.text(`pokemon ${getFirstPokemonOnListId()} to ${getLastPokemonOnListId()}`);
}
function clearPokemonList() {
  const list = $('#pokemon-list');
  list.children().remove();
}
function addPokemonToList(pokemonFromList, index) {
  const pokemonName = pokemonFromList.name;
  const pokemonButton = $(`<button class="btn btn-link" id="${pokemonName}">${index}. ${pokemonName}</button>`);
  const li = $('<li></li>');
  li.append(pokemonButton);
  $('#pokemon-list').append(li);
  display.addLoadingToListItem(li);
  request.getPokemonByIdOrName(pokemonName).then((pokemon) => {
    if (!pokemon) {
      return;
    }
    display.addSprite(pokemon.sprites.front_default, li);
  });
  display.removeLoadingFromListItem(li);
}
function updatePokemonList(pokemonList, offset) {
  clearPokemonList();
  let i = 0;
  pokemonList.forEach((pokemon) => {
    i += 1;
    addPokemonToList(pokemon, offset + i);
  });
  updatePageIndicator();
}
/**
 * Updates the list of Pokemon with the given offset and limit.
 * @param {number} [offset=0] - The offset of the first Pokemon to fetch.
 * @param {number} [amount=15] - The maximum number of Pokemon to fetch.
 */
export function updatePokemons(rawOffset = 0, amount = 15) {
  const LOWEST_POKEMON_OFFSET = 0;
  const offset = Math.max(rawOffset, LOWEST_POKEMON_OFFSET);
  request.getPokemons(offset, amount).then((pokemons) => {
    if (!pokemons) {
      return;
    }
    updateFirstPokemonIndex(offset);
    updateTotalPokemon(pokemons.count);
    updatePokemonList(pokemons.results, offset);
  });
}
