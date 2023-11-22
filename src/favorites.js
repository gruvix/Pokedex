/* eslint-disable import/extensions */
import { getCurrentPokemon } from './currentPokemon.js';
import {
  savePokemonToLocalStorage as storePokemon,
  loadPokemonFromLocalStorage as loadPokemon,
  removePokemonFromLocalStorage as removePokemon,
  loadIndexFromLocalStorage as loadIndex,
  saveIndexToLocalStorage as saveIndex,
} from './localStorage.js';

function toggleIconOn() {
  $('#pokemon-favorite').text('★');
}
function toggleIconOff() {
  $('#pokemon-favorite').text('☆');
}
function toggleAttributeOn() {
  $('#pokemon-favorite').attr('data-favorite', 'true');
}
function toggleAttributeOff() {
  $('#pokemon-favorite').attr('data-favorite', 'false');
}
function hasIndexFreeSlot(index) {
  const MAXIMUN_FAVORITE_POKEMON = 5;
  if (index.lenght === MAXIMUN_FAVORITE_POKEMON) {
    return false;
  }
  return true;
}
export default function toggleFavorite() {
  const $pokemonFavorite = $('#pokemon-favorite');
  const isFavorite = $pokemonFavorite.attr('data-favorite');
  if (isFavorite === 'false') {
    const index = loadIndex();
    hasIndexFreeSlot(index);
    toggleAttributeOn();
    toggleIconOn();
    const pokemon = getCurrentPokemon();
    // add pokemon to index, update stored index
    storePokemon(pokemon);
  } else {
    toggleAttributeOff();
    toggleIconOff();
  }
}
