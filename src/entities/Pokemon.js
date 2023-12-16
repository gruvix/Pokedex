export default class Pokemon {
  constructor(pokemonData) {
    this.name = pokemonData.name;
    this.abilities = pokemonData.abilities;
    this.types = pokemonData.types;
    this.moves = pokemonData.moves;
    this.sprites = pokemonData.sprites;
  }
}
