import { getCurrentPokemon } from './currentPokemon.js';
import {
  savePokemonToLocalStorage as storePokemon,
  loadPokemonFromLocalStorage as loadPokemon,
  removePokemonFromLocalStorage as unStorePokemon,
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
function emptyBackpack() {
  $('#backpack-list').empty();
}
function disableEmptyBackpackButton() {
  $('#empty-backpack-button').attr('disabled', 'disabled');
}
function enableEmptyBackpackButton() {
  $('#empty-backpack-button').removeAttr('disabled');
}
export function launchBackpack() {
  emptyBackpack();
  loadBackpack();
  showBackpack();
}
function removeEachCaptured() {
  loadIndex().forEach((pokemonName) => {
    unStorePokemon(pokemonName);
    removePokemonFromIndex(pokemonName, loadIndex());
  });
}
function removePokemon(pokemonName) {
  unStorePokemon(pokemonName);
  removePokemonFromIndex(pokemonName, loadIndex());
}
export function wipeCapturedPokemon() {
  removeEachCaptured();
  toggleAttributeOff();
  toggleIconOff();
  emptyBackpack();
  hideBackpack();
}
function isBackpackEmpty() {
  const index = loadIndex();
  if (index.length === 0) {
    return true;
  }
  return false;
}
function showEmptyBackpackMessage(){
  const $emptyModalText = $('<div>Your bag is empty</div>');
  $('#backpack-list').append($emptyModalText);
}
function addPokemonButton(pokemon) {
  const $pokemonList = $('#backpack-list');
  const $pokemonButton = $(`<button class="btn btn-link" id="${pokemon.name}">${pokemon.name}</button>`);
  $pokemonButton.on('click', () => {
    getPokemon(pokemon.name);
    hideBackpack();
  });
  const $removeButton = $('<button class="btn btn-primary" style="padding: 0.5%;">X</button><div></div>');
  $removeButton.on('click', () => {
    removePokemon(pokemon.name);
    emptyBackpack();
    loadBackpack();
    checkForBackpackedAndToggle(pokemon.name);
  });
  $pokemonList.append($pokemonButton);
  $pokemonList.append($removeButton);
}
function loadBackpack() {
  if (isBackpackEmpty()) {
    showEmptyBackpackMessage();
    disableEmptyBackpackButton();
    return;
  }
  enableEmptyBackpackButton();
  loadIndex().forEach((pokemonName) => {
    const pokemon = loadPokemon(pokemonName);
    addPokemonButton(pokemon);
  });
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
    unStorePokemon(pokemon.name);
  }
}
