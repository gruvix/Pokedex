/* eslint-disable import/extensions */
import { getCurrentPokemon } from './currentPokemon.js';
import {
  savePokemonToLocalStorage as storePokemon,
  loadPokemonFromLocalStorage as loadPokemon,
  removePokemonFromLocalStorage as removePokemon,
  loadIndexFromLocalStorage as loadIndex,
  saveIndexToLocalStorage as saveIndex,
} from './localStorage.js';
import getPokemon from './pokemon.js';

function toggleIconOn() {
  $('#pokemon-catch-button').text('★');
}
function toggleIconOff() {
  $('#pokemon-catch-button').text('☆');
}
function toggleAttributeOn() {
  $('#pokemon-catch-button').attr('data-caught', 'true');
}
function toggleAttributeOff() {
  $('#pokemon-catch-button').attr('data-caught', 'false');
}
function showBackpack() {
  $('#pokemon-backpack-modal').modal('show');
}
export function hideBackpack() {
  $('#pokemon-backpack-modal').modal('hide');
}
function hasIndexFreeSlot(index) {
  const MAXIMUN_BACKPACK_POKEMON = 5;
  if (index.length >= MAXIMUN_BACKPACK_POKEMON) {
    return false;
  }
  return true;
}
function addPokemonToIndex(pokemonName, index) {
  index.push(pokemonName);
  saveIndex(index);
}
function removePokemonFromIndex(pokemonName, index) {
  index.splice(index.indexOf(pokemonName), 1);
  saveIndex(index);
}
export function checkForBackpackedAndToggle(pokemonName) {
  const index = loadIndex();
  if (index.includes(pokemonName)) {
    toggleAttributeOn();
    toggleIconOn();
  } else {
    toggleAttributeOff();
    toggleIconOff();
  }
}
function addPokemonButton(pokemon) {
  const $pokemonList = $('#backpack-list');
  const $pokemonButton = $(`<button class="btn btn-link" id="${pokemon.name}">${pokemon.name}</button>`);
  $pokemonButton.on('click', () => {
    getPokemon(pokemon.name);// TODO: button to remove pokemon from backpack
    hideBackpack();
  });
  $pokemonList.append($pokemonButton);
}
function emptyBackpack() {
  $('#backpack-list').empty();
}
function disableEmptyBackpackButton() {
  $('#empty-backpack-button').attr('disabled', 'disabled');
}
function enableEmptyBackpackButton() {
  $('#empty-backpack-button').removeAttr('disabled');
}
function loadBackpack() {
  const index = loadIndex();
  if (index.length === 0) {
    const $emptyModalText = $('<div>Your bag is empty</div>');
    $('#backpack-list').append($emptyModalText);
    disableEmptyBackpackButton();
    return;
  }
  enableEmptyBackpackButton();
  index.forEach((pokemonName) => {
    const pokemon = loadPokemon(pokemonName);
    addPokemonButton(pokemon);
  });
}
export function launchBackpack() {
  emptyBackpack();
  loadBackpack();
  showBackpack();
}
function removeEachCaptured() {
  loadIndex().forEach((pokemonName) => {
    removePokemon(pokemonName);
    removePokemonFromIndex(pokemonName, loadIndex());
  });
}
export function wipeCapturedPokemon() {
  removeEachCaptured();
  toggleAttributeOff();
  toggleIconOff();
  emptyBackpack();
  hideBackpack();
}
export function toggleCaptured() {
  const index = loadIndex();
  const $pokemonFavorite = $('#pokemon-catch-button');
  const isFavorite = $pokemonFavorite.attr('data-caught');
  const pokemon = getCurrentPokemon();

  if (isFavorite === 'false') {
    if (!hasIndexFreeSlot(index)) {
      throw new Error('Index is full');
      //  here it shows a message to the user telling that there is no space left in the pokedex
    }
    toggleAttributeOn();
    toggleIconOn();
    addPokemonToIndex(pokemon.name, index);
    storePokemon(pokemon);
  } else {
    toggleAttributeOff();
    toggleIconOff();
    removePokemonFromIndex(pokemon.name, index);
    removePokemon(pokemon.name);
  }
}
