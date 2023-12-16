import * as display from './displayList.js';
import * as request from './apiRequests.js';
import * as localStorage from './localStorage.js';
import { parseRawPokemon } from './pokemon.js';
import Pokemon from './entities/Pokemon.js';
import PokemonList from './entities/PokemonList.js';

function updateTotalPokemon(total) {
  $('#pokemon-now-showing').attr('data-total', total);
}
function updateFirstPokemonIndex(offset) {
  $('#pokemon-now-showing').attr('data-index', offset);
}

export function getFirstPokemonOnListId() {
  const offset = Number($('#pokemon-now-showing').attr('data-index'));
  return offset + 1;// offset starts in 0, pokemon list starts in 1
}
export function getLastPokemonOnListId() {
  const AMOUNT = $('#pokemon-list li').length;
  const offset = Number($('#pokemon-now-showing').attr('data-index'));
  const TOTAL = $('#pokemon-now-showing').attr('data-total');
  return Math.min(offset + AMOUNT, TOTAL);
}
function updatePageIndicator() {
  const pageIndicator = $('#pokemon-now-showing');
  pageIndicator.text(`pokemon ${getFirstPokemonOnListId()} to ${getLastPokemonOnListId()}`);
}
function clearPokemonList() {
  const list = $('#pokemon-list');
  list.children().remove();
}
async function addPokemonToList(pokemonName, index) {
  const pokemonButton = $(`<button class="btn btn-link" id="${pokemonName}">${index}. ${pokemonName}</button>`);
  const li = $('<li></li>');
  li.append(pokemonButton);
  $('#pokemon-list').append(li);
  display.addLoadingToListItem(li);
  let pokemon;
  try {
    pokemon = localStorage.loadPokemonFromLocalStorage(pokemonName);
  } catch (error) {
    const rawPokemon = await request.getPokemonByIdOrName(pokemonName);
    const pokemondata = parseRawPokemon(rawPokemon);
    pokemon = new Pokemon(pokemondata);
    if (!pokemon) {
      throw new Error(`Failed to load ${pokemonName}`);
    }
  }
  const FIRST_SPRITE = 0;
  display.addSprite(pokemon.sprites[FIRST_SPRITE], li);
  display.removeLoadingFromListItem(li);
}
function updatePokemonList(pokemonList, offset) {
  clearPokemonList();
  let i = 0;
  pokemonList.names.forEach((pokemonName) => {
    i += 1;
    addPokemonToList(pokemonName, offset + i);
  });
  updatePageIndicator();
}

function parseRawPokemons(rawData) {
  const pokemonData = {
    names: [],
    listAmount: rawData.results.length,
    total: rawData.count,
  };
  rawData.results.forEach((pokemon) => {
    pokemonData.names.push(pokemon.name);
  });
  return pokemonData;
}
/**
 * Updates the list of Pokemon with the given offset and limit.
 * @param {number} [offset=0] - The offset of the first Pokemon to fetch.
 * @param {number} [amount=15] - The maximum number of Pokemon to fetch.
 */
export async function updatePokemons(rawOffset = 0, amount = 15) {
  const LOWEST_POKEMON_OFFSET = 0;
  const offset = Math.max(rawOffset, LOWEST_POKEMON_OFFSET);
  const rawPokemons = await request.getPokemons(offset, amount);
  if (!rawPokemons) {
    throw new Error('Failed to load pokemons');
  }
  const pokemonsData = parseRawPokemons(rawPokemons);
  const pokemons = new PokemonList(pokemonsData);
  updateFirstPokemonIndex(offset);
  updateTotalPokemon(pokemons.total);
  updatePokemonList(pokemons, offset);
}
