/* eslint-disable import/extensions */
import displayPokemon from './display.js';
import easterEgg from './easterEgg.js';
import { hideError } from './error.js';
import { getPokemonByIdOrName } from './apiRequests.js';

function showPokemonInfo() {
  $('#pokemon-info').removeClass('hidden');
}
function addLoadingToPokemon() {
  $('#pokemon-carousel .carousel-inner')
    .append('<div class="loader pokemon-carousel active"></div>');
}
function removeLoadingFromPokemon() {
  $('#pokemon-carousel .loader.pokemon-carousel').remove();
}
function updateName(pokemon) {
  const { name } = pokemon;
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const nameElement = $('#pokemon-name');
  nameElement.text(capitalizedName).addClass(`type-${pokemon.types[0].type.name}`);
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
function updateAbilities(abilities) {
  abilities.forEach((ability) => {
    const div = $(`<div><i class="pokemon-ability">${ability.ability.name}</i></div>`);
    $('#pokemon-abilities').append(div);
  });
}
function updateTypes(types) {
  types.forEach((type) => {
    const div = $(`<div><i class="type-${type.type.name}">${type.type.name}</i></div>`);
    $('#pokemon-types').append(div);
  });
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
function clearPokemon() {
  $('#pokemon-carousel .carousel-inner').children().remove();
  $('#pokemon-name').removeClass();
  $('#pokemon-abilities').children().empty();
  $('#pokemon-types').children().empty();
  $('#pokemon-moves-table').children().empty();
  $('#pokemon-info').addClass('hidden');
}
export default function getPokemonHandler(pokemonName) {
  clearPokemon();
  addLoadingToPokemon();
  hideError();
  if (pokemonName === 'michelin') {
    const pokemon = easterEgg();
    pokemonHandler(pokemon);
  } else {
    getPokemonByIdOrName(pokemonName).then((pokemon) => {
      if (!pokemon) {
        return;
      }
      pokemonHandler(pokemon);
    });
  }
}