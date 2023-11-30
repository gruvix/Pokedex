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

  it('should get Pikachu and show its info', () => {
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

  it('should get a random pokemon and mock the result', () => {
    const POKEMON_LIST_AMOUNT = 15;
    cy.intercept('https://pokeapi.co/api/v2/pokemon/?offset**').as('GETpokemons').then(() => {
      cy.get('#random-pokemon-button').click().wait('@GETpokemons')
        .then(() => {
          cy.get('#pokemon-list li').should('have.length', POKEMON_LIST_AMOUNT)
            .then((list) => {
              const randomPokemonIndex = Math.floor(Math.random() * list.length);
              const randomPokemon = list[randomPokemonIndex];
              cy.wrap(randomPokemon).children().first().invoke('attr', 'id')
                .then((id) => {
                  const pokemonName = id;
                  cy.intercept(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, { fixture: 'pikachu.json' }).as('GETpokemon').then(() => {
                    cy.wrap(randomPokemon).children().first().click()
                      .wait('@GETpokemon')
                      .get('#pokemon-name')
                      .should('be.text', 'Pikachu')
                      .get('#pokemon-types')
                      .children()
                      .first()
                      .should('be.text', 'fake');
                  });
                });
            });
        });
    });
  });

  it('should get next and previous pages', () => {
    cy.get('#next-page-button').click().get('#pokemon-now-showing')
      .should('have.text', 'pokemon 16 to 30');
    cy.get('#previous-page-button').click().get('#pokemon-now-showing')
      .should('have.text', 'pokemon 1 to 15');
  });

  it('should catch a pokemon, select another pokemon and then load the first one from the backpack', () => {
    const POKEMON_LIST_AMOUNT = 15;
    cy.intercept('https://pokeapi.co/api/v2/pokemon/?offset**').as('GETpokemons').then(() => {
      cy.get('#random-pokemon-button').click()
        .get('#pokemon-list li').should('have.length', POKEMON_LIST_AMOUNT)
        .then((list1) => {
          const randomPokemonIndex1 = Math.floor(Math.random() * list1.length);
          const randomPokemon1 = list1[randomPokemonIndex1];
          cy.wrap(randomPokemon1).children().first().invoke('attr', 'id')// acá tengo que declarar pokemonName y encadenar todo a
            .then((id) => { // continuación adentro del wrap para que pokemonName no pierda el valor
              const pokemonName = id;
              cy.wrap(randomPokemon1).children().first().click();
              cy.get('#pokemon-catch-button').click();
              cy.get('#random-pokemon-button').click().wait('@GETpokemons').get('#pokemon-list li')
                .then((list2) => {
                  const randomPokemonIndex2 = Math.floor(Math.random() * list2.length);
                  const randomPokemon2 = list2[randomPokemonIndex2];
                  cy.wrap(randomPokemon2).children().first().click();
                })
                .get('#launch-pokemon-backpack-button')
                .click()
                .get('#backpack-list button')
                .invoke('attr', 'id')
                .should('be.equal', pokemonName);
            });
        });
    });
  });

  it('should catch a pokemon and then empty the backpack', () => {
    cy.intercept('https://pokeapi.co/api/v2/pokemon/**').as('GETpokemon');
    cy.get('#pokemon-list li').children().first().click();
    cy.get('#pokemon-catch-button').click();
    cy.get('#launch-pokemon-backpack-button').click();
    cy.get('#backpack-list').children().should('have.length', 1);
    cy.get('#empty-backpack-button').click();
    cy.get('#backpack-list').children().should('have.length', 0);
  });

  it('should get a random pokemon from the list', () => {
    const POKEMON_LIST_AMOUNT = 15;
    cy.intercept('https://pokeapi.co/api/v2/pokemon/**').as('GETpokemons').then(() => {
      cy.get('#random-pokemon-button').click().wait('@GETpokemons')
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
});
