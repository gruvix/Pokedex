export default function generateRandomId() {
  const POKEMON_PAGE_AMOUNT = 15;
  const POKEMON_TOTAL = $('#pokemon-now-showing').attr('data-total');
  const RANDOM_ID = Math.floor(Math.random() * POKEMON_TOTAL);
  return RANDOM_ID - POKEMON_PAGE_AMOUNT;
}
