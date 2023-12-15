import displayPokemon from './display.js';
import fakePokemonRaw from './fakePokemon.js';
import { hideError } from './error.js';
import { getPokemonByIdOrName } from './apiRequests.js';
import { setCurrentPokemon } from './currentPokemon.js';
import { loadPokemonFromLocalStorage as loadPokemon } from './localStorage.js';

class Pokemon {
  constructor(pokemonData) {
    this.name = pokemonData.name;
    this.abilities = pokemonData.abilities;
    this.types = pokemonData.types;
    this.moves = pokemonData.moves;
    this.sprites = pokemonData.sprites;
  }
}

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
function updateName(name) {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const nameElement = $('#pokemon-name');
  nameElement.text(capitalizedName);
}
function updateMoves(moves) {
  const COMPLETE_PAIR = 2;
  let currentRow = $('<tr></tr>');
  $('#pokemon-moves-table').append(currentRow);
  moves.forEach((move) => {
    const td = $(`<td style="width: 60%;">${move}</td>`);
    if (currentRow.children().length === COMPLETE_PAIR) {
      currentRow = $('<tr></tr>');
      $('#pokemon-moves-table').append(currentRow);
    }
    currentRow.append(td);
  });
}
function updateAbilities(abilities) {
  abilities.forEach((ability) => {
    const div = $(`<div><i class="pokemon-ability">${ability}</i></div>`);
    $('#pokemon-abilities').append(div);
  });
}
function updateTypes(types) {
  types.forEach((type) => {
    const div = $(`<div><i class="type-${type}">${type}</i></div>`);
    $('#pokemon-types').append(div);
  });
  $('#pokemon-name').addClass(`type-${types[0]}`);
}
function pokemonHandler(pokemon) {
  showPokemonInfo();
  removeLoadingFromPokemon();
  updateName(pokemon.name);
  updateTypes(pokemon.types);
  updateAbilities(pokemon.abilities);
  updateMoves(pokemon.moves);
  displayPokemon(pokemon.sprites);
  setCurrentPokemon(pokemon);
}
function clearPokemon() {
  $('#pokemon-carousel .carousel-inner').children().remove();
  $('#pokemon-name').removeClass();
  $('#pokemon-abilities').children().empty();
  $('#pokemon-types').children().empty();
  $('#pokemon-moves-table').children().empty();
  $('#pokemon-info').addClass('hidden');
}
function parseRawPokemon(pokemonRaw) {
  const abilities = [];
  pokemonRaw.abilities.forEach((ability) => {
    abilities.push(ability.ability.name);
  });
  const types = [];
  pokemonRaw.types.forEach((type) => {
    types.push(type.type.name);
  });
  const moves = [];
  pokemonRaw.moves.forEach((move) => {
    moves.push(move.move.name);
  });
  const sprites = [];
  Object.keys(pokemonRaw.sprites.other).forEach((spriteCategory) => {
    Object.keys(pokemonRaw.sprites.other[spriteCategory]).forEach((sprite) => {
      if (pokemonRaw.sprites.other[spriteCategory][sprite]) {
        sprites.push(pokemonRaw.sprites.other[spriteCategory][sprite]);
      }
    });
  });
  const pokemonData = {
    name: pokemonRaw.name,
    abilities,
    types,
    moves,
    sprites,
  };
  return pokemonData;
}
function generatePokemon(pokemonData) {
  const pokemon = new Pokemon(pokemonData);
  return pokemon;
}
export default async function getPokemonHandler(pokemonName) {
  clearPokemon();
  addLoadingToPokemon();
  hideError();
  let pokemon;
  if (pokemonName === 'michelin') {
    const pokemonData = parseRawPokemon(fakePokemonRaw());
    pokemon = generatePokemon(pokemonData);
  } else {
    try {
      pokemon = loadPokemon(pokemonName);
    } catch {
      const pokemonRaw = await getPokemonByIdOrName(pokemonName);
      const pokemonData = parseRawPokemon(pokemonRaw);
      pokemon = generatePokemon(pokemonData);
    }
  }
  pokemonHandler(pokemon);
}
