describe('tests the pokedex', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
  })
  it('should show an error saying the pokemon was not found', () => {
    cy.get('#pokemon-id-input').type('not a pokemon').get('#search-pokemon-button').click()
    cy.get('#pokemon-not-found').should('be.visible')

  })

  it("should get a pokemon and show its info", () => {
    const CAROUSEL_DELAY = 700
    const POKEMON_NAME = 'Pikachu'
    const POKEMON_FIRST_TYPE = 'electric'
    const POKEMON_FIRST_ABILITY = 'static'
    cy.get('#pokemon-id-input').type('pikachu').get('#search-pokemon-button').click()
    cy.get('#pokemon-not-found').should('not.be.visible')
    cy.get('#pokemon-name').should('be.text', POKEMON_NAME)
    cy.get('#pokemon-types').children().should('have.length', 1).first().should('have.text', POKEMON_FIRST_TYPE)
    cy.get('#pokemon-abilities').children().should('have.length', 2).first().should('have.text', POKEMON_FIRST_ABILITY)
  })

  it('should get a random pokemon from the list', () => {
    const POKEMON_LIST_AMOUNT = 15;
    const TOTAL_POKEMON = Cypress.env('totalPokemon')
    const LIST_TOTAL_OFFSET = TOTAL_POKEMON - POKEMON_LIST_AMOUNT;
    const LIST_RANDOM_OFFSET = Math.floor(Math.random() * LIST_TOTAL_OFFSET);
    const FIRST_POKEMON_IN_LIST = LIST_RANDOM_OFFSET + 1;
    cy.window().then((win) => {
      win.getPokemons(LIST_RANDOM_OFFSET, POKEMON_LIST_AMOUNT)
      cy.get("#pokemon-list li").first().invoke('text').should(text => {
        const index = parseInt(text.split('.'));
        expect(index).to.equal(FIRST_POKEMON_IN_LIST)
      });
    }).get("#pokemon-list li").should('have.length', POKEMON_LIST_AMOUNT).then((list) => {
      const randomPokemonIndex = Math.floor(Math.random() * list.length);
      const randomPokemon = list[randomPokemonIndex];
      cy.wrap(randomPokemon).children().first().click();
    }).get("#pokemon-carousel .carousel-inner").children().first().should('not.have.class', 'loader');
    cy.get("#pokemon-name").should('be.visible');
    const CAROUSEL_DELAY = 700
    cy.get('.carousel-inner').children().each((sprite) => {
    cy.wait(CAROUSEL_DELAY).get('.carousel-control-next').click().get(sprite).should('be.visible')
    })
    const DEFAULT_POKEMON_NAME = 'POKEMON'	
    cy.get('#pokemon-name').should('not.be.text', DEFAULT_POKEMON_NAME)
    cy.get('#pokemon-types').children().should('have.length.greaterThan', 0)
    cy.get('#pokemon-abilities').children().should('have.length.greaterThan', 0)
  })

})
