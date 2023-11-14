/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/// <reference types="jquery" />
import * as request from './apiRequests.js';
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
function updatePokemons(rawOffset = 0, amount = 15) {
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
function generateRandomId() {
  const POKEMON_PAGE_AMOUNT = 15;
  const POKEMON_TOTAL = $('#pokemon-now-showing').attr('data-total');
  const RANDOM_ID = Math.floor(Math.random() * POKEMON_TOTAL);
  return RANDOM_ID - POKEMON_PAGE_AMOUNT;
}
function updateTotalPokemon(total) {
  $('#pokemon-now-showing').attr('data-total', total);
}
function updateFirstPokemonIndex(offset) {
  $('#pokemon-now-showing').attr('data-index', offset);
}

function getFirstPokemonOnListId() {
  const offset = Number($('#pokemon-now-showing').attr('data-index'));
  return offset + 1;// offset starts in 0, pokemon list starts in 1
}
function getLastPokemonOnListId() {
  const AMOUNT = $('#pokemon-list li').length;
  const offset = Number($('#pokemon-now-showing').attr('data-index'));
  const TOTAL = $('#pokemon-now-showing').attr('data-total');
  return Math.min(offset + AMOUNT, TOTAL);
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
function updatePageIndicator() {
  const pageIndicator = $('#pokemon-now-showing');
  pageIndicator.text(`pokemon ${getFirstPokemonOnListId()} to ${getLastPokemonOnListId()}`);
}
function addPokemonToList(pokemonFromList, index) {
  const pokemonName = pokemonFromList.name;
  const pokemonButton = $(`<button class="btn btn-link" id="${pokemonName}">${index}. ${pokemonName}</button>`);
  const li = $('<li></li>');
  li.append(pokemonButton);
  $('#pokemon-list').append(li);
  addLoadingToListItem(li);
  request.getPokemonByIdOrName(pokemonName).then((pokemon) => {
    if (!pokemon) {
      return;
    }
    addSprite(pokemon.sprites.front_default, li);
  });
  removeLoadingFromListItem(li);
}
function removeLoadingFromListItem(element) {
  element.children('.lds-dual-ring').remove();
}
function addLoadingToListItem(element) {
  const loading = $('<div class="lds-dual-ring"></div>');
  loading.addClass('lds-dual-ring');
  element.append(loading);
}

function addSprite(sprite, htmlItem) {
  if (!sprite) return;
  const img = $(`<img src="${sprite}" class="list-sprite">`);
  htmlItem.append(img);
}
function clearPokemonList() {
  const list = $('#pokemon-list');
  list.children().remove();
}

// ## construir un pokedex
// Documentacion https://pokeapi.co/
// listar pokemons y poder cambiar de página
// ver detalles de 1 pokemon incluyendo al menos 1 foto
