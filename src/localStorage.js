function getPokemonKey(id) {
  return `pokemon-${id}`;
}
export function savePokemonToLocalStorage(id, pokemon) {
  if (id === undefined) {
    throw new Error('id is undefined');
  }
  try {
    localStorage.setItem(getPokemonKey(id), JSON.stringify(pokemon));
  } catch (error) {
    throw new Error(`Failed to save pokemon ${id}`);
  }
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
