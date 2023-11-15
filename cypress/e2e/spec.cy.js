describe('tests the pokedex', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
  })
  it('shows an error if the pokemon is not found', () => {
    cy.get('#pokemon-id-input').type('not a pokemon').get('#search-pokemon-button').click()
    cy.get('#pokemon-not-found').should('be.visible')

  })

  it('clicks a random pokemon from the list', () => {
    const POKEMON_LIST_AMOUNT = 15;
    const TOTAL_POKEMON = Cypress.env('totalPokemon')
    const LIST_TOTAL_OFFSET = TOTAL_POKEMON - POKEMON_LIST_AMOUNT;
    const LIST_RANDOM_OFFSET = Math.floor(Math.random() * LIST_TOTAL_OFFSET);
    const FIRST_POKEMON_IN_LIST = LIST_RANDOM_OFFSET + 1;
    cy.window().then((win) => {
      win.getPokemonList(LIST_RANDOM_OFFSET, POKEMON_LIST_AMOUNT)
      cy.get("#pokemon-list li").first().invoke('text').should(text => {
        const index = parseInt(text.split('.'));
        expect(index).to.equal(FIRST_POKEMON_IN_LIST)
      });
    }).get("#pokemon-list li").should('have.length', POKEMON_LIST_AMOUNT).then((list) => {
      const randomPokemonIndex = Math.floor(Math.random() * list.length);
      const randomPokemon = list[randomPokemonIndex];
      cy.wrap(randomPokemon).children().first().click();
    }).get("#pokemon-carousel .carousel-inner").should('have.length.gt', 0);
  })

  it("gets pikachu and scrolls through the pokedex's images", () => {
    const CAROUSEL_DELAY = 700
    cy.get('#pokemon-id-input').type('pikachu').get('#search-pokemon-button').click()
    cy.get('#pokemon-not-found').should('not.be.visible')
    cy.get('.carousel-inner').children().each((sprite) => {
      cy.wait(CAROUSEL_DELAY).get('.carousel-control-next').click().get(sprite).should('be.visible')
    })

  })
})
