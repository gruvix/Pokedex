import { handleError } from './error.js';

export function getPokemons(offset, amount) {
  return new Promise((resolve) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${amount}`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(() => {
        handleError('Failed to get pokemons list');
      });
  });
}

export function getPokemonByIdOrName(pokemonIdOrName) {
  return new Promise((resolve) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(() => {
        handleError(`The pokemon <strong>${pokemonIdOrName}</strong> does not exist`);
      });
  });
}
