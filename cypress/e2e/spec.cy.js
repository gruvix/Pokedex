/* eslint-disable radix */
/// <reference types="cypress" />

describe('tests the pokedex', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/');
  });
  it('should show an error indicating the searched pokemon does not exist', () => {
    cy.get('#pokemon-id-input').type('not a pokemon').get('#search-pokemon-button').click();
    cy.get('#error').should('be.visible').should('be.text', 'The pokemon not a pokemon does not exist');
  });

  it('should get a pokemon and show its info', () => {
    const POKEMON_NAME = 'Pikachu';
    const POKEMON_FIRST_TYPE = 'electric';
    const POKEMON_FIRST_ABILITY = 'static';
    cy.get('#pokemon-id-input').type('pikachu').get('#search-pokemon-button').click();
    cy.get('#error').should('not.be.visible');
    cy.get('#pokemon-name').should('be.text', POKEMON_NAME);
    cy.get('#pokemon-types').children().should('have.length', 1).first()
      .should('have.text', POKEMON_FIRST_TYPE);
    cy.get('#pokemon-abilities').children().should('have.length', 2).first()
      .should('have.text', POKEMON_FIRST_ABILITY);
  });

  // it('should get a pokemon and show its info', () => {
  //   const POKEMON_NAME = 'Pikachu';
  //   const POKEMON_FIRST_TYPE = 'electric';
  //   const POKEMON_FIRST_ABILITY = 'static';
  //   cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/**').as('pokemon');

  //   cy.get('#pokemon-id-input').type('pikachu').get('#search-pokemon-button')
  //     .click()
  //     .wait('@pokemon');

  //   cy.get('#error').should('not.be.visible');
  //   cy.get('#pokemon-name').should('be.text', POKEMON_NAME);
  //   cy.get('#pokemon-types').children().should('have.length', 1).first()
  //     .should('have.text', POKEMON_FIRST_TYPE);
  //   cy.get('#pokemon-abilities').children().should('have.length', 2).first()
  //     .should('have.text', POKEMON_FIRST_ABILITY);
  //   cy.wait(1000);
  // });

  it('should get next and previous pages', () => {
    cy.get('#next-page').click().get('#pokemon-now-showing')
      .should('have.text', 'pokemon 16 to 30');
    cy.get('#previous-page').click().get('#pokemon-now-showing')
      .should('have.text', 'pokemon 1 to 15');
  });

  it('should get a random pokemon from the list', () => {
    const POKEMON_LIST_AMOUNT = 15;
    cy.intercept('GET', 'https://pokeapi.co/api/v2/pokemon/**').as('pokemons');

    cy.get('#random-pokemon-button').click().wait('@pokemons')
      .then(() => {
        cy.get('#pokemon-list li').should('have.length', POKEMON_LIST_AMOUNT)
          .then((list) => {
            const randomPokemonIndex = Math.floor(Math.random() * list.length);
            const randomPokemon = list[randomPokemonIndex];
            cy.wrap(randomPokemon).children().first().click();
          })
          .get('#pokemon-carousel .carousel-inner')
          .children()
          .first()
          .should('not.have.class', 'loader');
        cy.get('#pokemon-name').should('be.visible');
        const CAROUSEL_DELAY = 700;
        cy.get('.carousel-inner').children().each((sprite) => {
          cy.wait(CAROUSEL_DELAY).get('.carousel-control-next').click().get(sprite)
            .should('be.visible');
        });
        const DEFAULT_POKEMON_NAME = 'POKEMON';
        cy.get('#pokemon-name').should('not.be.text', DEFAULT_POKEMON_NAME);
        cy.get('#pokemon-types').children().should('have.length.greaterThan', 0);
        cy.get('#pokemon-abilities').children().should('have.length.greaterThan', 0);
      });
  });
});
