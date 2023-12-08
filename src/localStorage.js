function getPokemonKey(id) {
  return `pokemon-${id}`;
}
export function savePokemonToLocalStorage(pokemon) {
  if (pokemon === undefined) {
    throw new Error('pokemon is undefined');
  }
  try {
    localStorage.setItem(getPokemonKey(pokemon.name), JSON.stringify(pokemon));
  } catch (error) {
    throw new Error(`Failed to save pokemon ${pokemon.name}`);
  }
}
export function removePokemonFromLocalStorage(id) {
  if (id === undefined) {
    throw new Error('id is undefined');
  }
  localStorage.removeItem(getPokemonKey(id));
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
export function saveIndexToLocalStorage(index) {
  localStorage.setItem('index', JSON.stringify(index));
}
export function loadIndexFromLocalStorage() {
  const index = JSON.parse(localStorage.getItem('index'));
  if (index === null) {
    return [];
  }
  return index;
}
