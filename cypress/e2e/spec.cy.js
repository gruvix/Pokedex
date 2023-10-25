const { get } = require("jquery")

describe('tests the pokedex', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
  })
  it('shows an error if the pokemon is not found', () => {
    cy.get('#pokemonIdInput').type('not a pokemon').get('#searchPokemonByIdButton').click()
    cy.get('#pokemonNotFound').should('be.visible')

  })
