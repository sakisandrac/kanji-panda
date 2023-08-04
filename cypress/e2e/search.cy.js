describe('User can search for kanji', () => {

  beforeEach(() => {
    const kanji = ["s", "f", "g", "v", "b"]
    cy.intercept(
      "GET",
      "https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/",
      {
        statusCode: 200,
        fixture: 'data'
      }
    ).as("kanji-fetch");
  
    kanji.forEach(k => {
      cy.intercept(
        "GET",
        `https://kanjialive-api.p.rapidapi.com/api/public/kanji/${k}`,
        {
          statusCode: 200,
          fixture: `${k}`
        }
      ).as('kanji-details')
    })
  })

  it('should be able to navigate to search page and see header, instructions and search bar', () => {
      
    cy.visit('http://localhost:3000/')
      .wait(['@kanji-fetch', '@kanji-details']).then(intercept => {
        cy.url().should('include', '/')
        .get('.nav-link-container > :nth-child(3)').click()
        .url().should('include', '/search')
        .get('.header').should('have.text', 'Search for Kanji:')
        .get('.kanji-text').should('have.text', 'Search for Kanji by English meaning or by character. Please enter only 1 word or character at a time to search!')
        .get('form').should('be.visible')
      })
  })

  it('should be able to search kanji by meaning and by character', () => {
    cy.visit('http://localhost:3000/search')
    cy.intercept(
      "GET",
      "https://kanjialive-api.p.rapidapi.com/api/public/search/rain",
      {
        statusCode: 200,
        body: [{ "kanji": {"character": "b"}}]
      }
    ).as("kanji-fetch");
    cy.intercept(
      "GET",
      `https://kanjialive-api.p.rapidapi.com/api/public/kanji/b`,
      {
        statusCode: 200,
        fixture: 'b'
      }
    ).as('kanji-details')

    cy.wait(['@kanji-fetch', '@kanji-details']).then(intercept => {
      cy.get('#typeSelect').select('search')
      .get('#searchText').type('rain')
      .get('.save-btn').click()
      cy.wait(['@kanji-fetch', '@kanji-details']).then(intercept => {
        cy.get('.main-kanji').should('be.visible')
        .get('.main-char').should('have.text', '花')
      })
    })

    cy.get('#typeSelect').select('kanji')
    .get('#searchText').clear().type('f')
    .get('form > .save-btn').click()
    .get('.main-kanji').should('be.visible')
    .get('.main-char').should('have.text', '母')
  })
})