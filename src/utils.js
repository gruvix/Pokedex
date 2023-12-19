import PokemonList from './entities/PokemonList.js';

export default function generateRandomId() {
  const POKEMON_PAGE_AMOUNT = 15;
  const POKEMON_TOTAL = PokemonList.total;
  const RANDOM_ID = Math.floor(Math.random() * POKEMON_TOTAL);
  return RANDOM_ID - POKEMON_PAGE_AMOUNT;
}
