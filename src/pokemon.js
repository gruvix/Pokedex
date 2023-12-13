import displayPokemon from './display.js';
import fakePokemonRaw from './fakePokemon.js';
import { hideError } from './error.js';
import { getPokemonByIdOrName } from './apiRequests.js';
import { setCurrentPokemon } from './currentPokemon.js';
import { updateBackpackIndicator } from './backpack.js';
import { loadPokemonFromLocalStorage as loadPokemon } from './localStorage.js';

class Pokemon {
  constructor(pokemon) {
    this.name = pokemon.name;
    this.abilities = [];
    pokemon.abilities.forEach((ability) => {
      this.abilities.push(ability.ability.name);
    });
    this.types = [];
    pokemon.types.forEach((type) => {
      this.types.push(type.type.name);
    });
    this.moves = [];
    pokemon.moves.forEach((move) => {
      this.moves.push(move.move.name);
    });
    this.sprites = [];
    const sprites = pokemon.sprites.other;
    Object.keys(sprites).forEach((spriteCategory) => {
      Object.keys(sprites[spriteCategory]).forEach((sprite) => {
        if (sprites[spriteCategory][sprite]) {
          this.sprites.push(sprites[spriteCategory][sprite]);
        }
      });
    });
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
  updateBackpackIndicator();
}
function clearPokemon() {
  $('#pokemon-carousel .carousel-inner').children().remove();
  $('#pokemon-name').removeClass();
  $('#pokemon-abilities').children().empty();
  $('#pokemon-types').children().empty();
  $('#pokemon-moves-table').children().empty();
  $('#pokemon-info').addClass('hidden');
}
function generatePokemon(pokemonRaw) {
  const pokemon = new Pokemon(pokemonRaw);
  return pokemon;
}
export default async function getPokemonHandler(pokemonName) {
  clearPokemon();
  addLoadingToPokemon();
  hideError();
  let pokemon;
  if (pokemonName === 'michelin') {
    pokemon = generatePokemon(fakePokemonRaw());
  } else {
    try {
      pokemon = loadPokemon(pokemonName);
    } catch {
      const pokemonRaw = await getPokemonByIdOrName(pokemonName);
      pokemon = generatePokemon(pokemonRaw);
    }
  }
  pokemonHandler(pokemon);
}
