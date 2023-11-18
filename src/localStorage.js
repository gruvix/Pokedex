function getPokemonKey(id) {
  return `pokemon-${id}`;
}
function getPokemonListKey(offset, amount) {
  return `pokemons-${offset}-to-${amount}`;
}
export function savePokemonToLocalStorage(id, pokemon) {
  if (id === undefined) {
    throw new Error('id is undefined');
  }
  localStorage.setItem(getPokemonKey(id), JSON.stringify(pokemon));
}
export function savePokemonListToLocalStorage(offset, amount, pokemons) {
  if (offset === undefined || amount === undefined || pokemons !== Object) {
    throw new Error('offset, amount or pokemons is undefined');
  }
  localStorage.setItem(getPokemonListKey(offset, amount), JSON.stringify(pokemons));
}
export function loadPokemonFromLocalStorage(id) {
  if (id === undefined) {
    throw new Error('id is undefined');
  }
  const pokemon = JSON.parse(localStorage.getItem(getPokemonKey(id)));
  if (pokemon === null) {
    throw new Error(`pokemon ${id} not found`);
  }
  return pokemon;
}
export function loadPokemonListFromLocalStorage(offset, amount) {
  if (offset === undefined || amount === undefined) {
    throw new Error('offset or amount is undefined');
  }
  const pokemons = JSON.parse(localStorage.getItem(getPokemonListKey(offset, amount)));
  if (pokemons === null) {
    throw new Error(`pokemon list with offset ${offset} and amount ${amount} not found`);
  }
  return pokemons;
}
