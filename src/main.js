/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/// <reference types="jquery" />
import * as request from './apiRequests.js';
import { easterEgg } from './easterEgg.js';
import { hideError } from './error.js';

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
function updateTotalPokemon(total) {
  $('#pokemon-now-showing').attr('data-total', total);
}
function updateFirstPokemonIndex(offset) {
  $('#pokemon-now-showing').attr('data-index', offset);
}
function getPokemonHandler(pokemonName) {
  clearPokemon();
  addLoadingToPokemon();
  hideError();
  if (pokemonName === 'michelin') {
    const pokemon = easterEgg();
    pokemonHandler(pokemon);
  } else {
    request.getPokemonByIdOrName(pokemonName).then((pokemon) => {
      if (!pokemon) {
        return;
      }
      pokemonHandler(pokemon);
    });
  }
  clearPokemon();
}
function addLoadingToPokemon() {
  $('#pokemon-carousel .carousel-inner')
    .append('<div class="loader pokemon-carousel active"></div>');
}
function removeLoadingFromPokemon() {
  $('#pokemon-carousel .loader.pokemon-carousel').remove();
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

function pokemonHandler(pokemon) {
  showPokemonInfo();
  removeLoadingFromPokemon();
  updateName(pokemon);
  updateTypes(pokemon.types);
  updateAbilities(pokemon.abilities);
  updateMoves(pokemon.moves);
  displayPokemon(pokemon.sprites.other);
}
function showPokemonInfo() {
  $('#pokemon-info').removeClass('hidden');
}
function updateTypes(types) {
  types.forEach((type) => {
    const div = $(`<div><i class="type-${type.type.name}">${type.type.name}</i></div>`);
    $('#pokemon-types').append(div);
  });
}
function updateAbilities(abilities) {
  abilities.forEach((ability) => {
    const div = $(`<div><i class="pokemon-ability">${ability.ability.name}</i></div>`);
    $('#pokemon-abilities').append(div);
  });
}
function updateMoves(moves) {
  const COMPLETE_PAIR = 2;
  let currentRow = $('<tr></tr>');
  $('#pokemon-moves-table').append(currentRow);
  moves.forEach((move) => {
    const td = $(`<td style="width: 60%;">${move.move.name}</td>`);
    if (currentRow.children().length === COMPLETE_PAIR) {
      currentRow = $('<tr></tr>');
      $('#pokemon-moves-table').append(currentRow);
    }
    currentRow.append(td);
  });
}
function updateName(pokemon) {
  const { name } = pokemon;
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const nameElement = $('#pokemon-name');
  nameElement.text(capitalizedName).addClass(`type-${pokemon.types[0].type.name}`);
}
function displayPokemon(sprites) {
  Object.keys(sprites).forEach((spriteCategory) => {
    Object.keys(sprites[spriteCategory]).forEach((sprite) => {
      if (sprites[spriteCategory][sprite]) {
        addImageToCarousel(sprites[spriteCategory][sprite]);
      }
    });
  });
}

function addImageToCarousel(imageSource) {
  const img = document.createElement('img');
  img.src = imageSource;
  const div = document.createElement('div');
  div.appendChild(img);
  const carousel = document.querySelector('#pokemon-carousel .carousel-inner');
  carousel.appendChild(div);
  div.classList.add('carousel-item');
  if (carousel.children.length === 1) {
    div.classList.add('active');
  }
}

function clearPokemon() {
  $('#pokemon-carousel .carousel-inner').children().remove();
  $('#pokemon-name').removeClass();
  $('#pokemon-abilities').children().empty();
  $('#pokemon-types').children().empty();
  $('#pokemon-moves-table').children().empty();
  $('#pokemon-info').addClass('hidden');
}

// ## construir un pokedex
// Documentacion https://pokeapi.co/
// listar pokemons y poder cambiar de página
// ver detalles de 1 pokemon incluyendo al menos 1 foto
