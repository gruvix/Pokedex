/* eslint-disable import/extensions */
import { getCurrentPokemon } from './currentPokemon.js';
import {
  savePokemonToLocalStorage as storePokemon,
  loadPokemonFromLocalStorage as loadPokemon,
  removePokemonFromLocalStorage as removePokemon,
  loadIndexFromLocalStorage as loadIndex,
  saveIndexToLocalStorage as saveIndex,
} from './localStorage.js';
import { pokemonHandler } from './pokemon.js';

function toggleIconOn() {
  $('#pokemon-favorite-button').text('★');
}
function toggleIconOff() {
  $('#pokemon-favorite-button').text('☆');
}
function toggleAttributeOn() {
  $('#pokemon-favorite-button').attr('data-favorite', 'true');
}
function toggleAttributeOff() {
  $('#pokemon-favorite-button').attr('data-favorite', 'false');
}
function hasIndexFreeSlot(index) {
  const MAXIMUN_FAVORITE_POKEMON = 5;
  if (index.lenght >= MAXIMUN_FAVORITE_POKEMON) {
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
export function checkForFavorited(pokemonName) {
  const index = loadIndex();
  if (index.includes(pokemonName)) {
    toggleAttributeOn();
    toggleIconOn();
  } else {
    toggleAttributeOff();
    toggleIconOff();
  }
}
export default function toggleFavorite() {
function clearFavoriteList() {
  $('#favorite-list').empty();
}
function loadFavorites() {
  clearFavoriteList();
  const index = loadIndex();
  index.forEach((pokemonName) => {
    const pokemon = loadPokemon(pokemonName);
    addPokemonButton(pokemon);
  });
}
function showFavoritesModal() {
  $('#pokemon-storage-modal').modal('show');
}
export function launchFavoritesModal() {
  showFavoritesModal();
}
export function closeFavoritesModal() {
  $('#pokemon-storage-modal').modal('hide');
}
export function emptyStoredPokemons() {
  loadIndex().forEach((pokemonName) => {
    removePokemon(pokemonName);
    removePokemonFromIndex(pokemonName, loadIndex());
  });
  toggleAttributeOff();
  toggleIconOff();
  clearFavoriteList();
}
export function toggleFavorite() {
  const index = loadIndex();
  const $pokemonFavorite = $('#pokemon-favorite-button');
  const isFavorite = $pokemonFavorite.attr('data-favorite');
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
