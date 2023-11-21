export default function toggleFavorite() {
  const pokemonFavorite = $('#pokemon-favorite');
  if (pokemonFavorite.attr('data-favorite') === 'true') {
    pokemonFavorite.attr('data-favorite', 'false');
    pokemonFavorite.text('☆');
  } else {
    pokemonFavorite.attr('data-favorite', 'true');
    pokemonFavorite.text('★');
  }
}
