describe('tests the pokedex', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
  })
  it('shows an error if the pokemon is not found', () => {
    cy.get('#pokemonIdInput').type('not a pokemon').get('#searchPokemonByIdButton').click()
    cy.get('#pokemonNotFound').should('be.visible')

  })
  it("gets a pokemon and scrolls through the pokedex's images", () => {
    const CAROUSEL_DELAY = 700
    cy.get('#pokemonIdInput').type('pikachu').get('#searchPokemonByIdButton').click()
    cy.get('#pokemonNotFound').should('not.be.visible')
    cy.get('.carousel-inner').children().each((sprite, index) => {
      cy.wait(CAROUSEL_DELAY).get('.carousel-control-next').click().get(sprite).should('be.visible')
    })

  })
})
