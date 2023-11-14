import displayPokemon from './display';
import easterEgg from './easterEgg';
import { hideError } from './error';
import clearPokemon from './clearPokemon';
import { getPokemonByIdOrName } from './apiRequests';

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