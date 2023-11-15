describe('tests the pokedex', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
  })
  it('shows an error if the pokemon is not found', () => {
    cy.get('#pokemon-id-input').type('not a pokemon').get('#search-pokemon-button').click()
    cy.get('#pokemon-not-found').should('be.visible')

  })
  it("gets a pokemon and scrolls through the pokedex's images", () => {
    const CAROUSEL_DELAY = 700
    cy.get('#pokemon-id-input').type('pikachu').get('#search-pokemon-button').click()
    cy.get('#pokemon-not-found').should('not.be.visible')
    cy.get('.carousel-inner').children().each((sprite) => {
      cy.wait(CAROUSEL_DELAY).get('.carousel-control-next').click().get(sprite).should('be.visible')
    })

  })
})
