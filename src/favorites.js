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
function showFavoritesModal() {
  $('#pokemon-storage-modal').modal('show');
}
export function hideFavoritesModal() {
  $('#pokemon-storage-modal').modal('hide');
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
function addPokemonButton(pokemon) {
  const $pokemonList = $('#favorite-list');
  const $pokemonButton = $(`<button class="btn btn-link" id="${pokemon.name}">${pokemon.name}</button>`);
  $pokemonButton.on('click', () => {
    getPokemon(pokemon.name);//ACA VA UN BOTON PARA ELIMINAR AL POKEMON
    hideFavoritesModal();
  });
  $pokemonList.append($pokemonButton);
}
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
export function launchFavoritesModal() {
  showFavoritesModal();
  loadFavorites();
}
function removeEachFavorite() {
  loadIndex().forEach((pokemonName) => {
    removePokemon(pokemonName);
    removePokemonFromIndex(pokemonName, loadIndex());
  });
}
export function emptyFavorites() {
  removeEachFavorite();
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
