export default class PokemonList {
  static index = 0;

  static total = 0;

  constructor(data) {
    this.names = data.names;
    this.listAmount = data.listAmount;
    PokemonList.total = data.total;
  }
}
