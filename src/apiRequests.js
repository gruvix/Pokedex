import { handleError } from './error.js';

export function getPokemons(offset, amount) {
  return new Promise((resolve, reject) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${amount}`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => {
        handleError('Failed to get pokemons list');
        reject(error);
      });
  });
}

export function getPokemonByIdOrName(pokemonIdOrName) {
  return new Promise((resolve, reject) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => {
        handleError(`The pokemon <strong>${pokemonIdOrName}</strong> does not exist`);
        reject(error);
      });
  });
}
