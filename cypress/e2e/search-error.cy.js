describe('User should see error messages on search page', () => {

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

  it('should see error message if form is not filled out on search page', () => {
    cy.visit('http://localhost:3000/search')

    cy.wait(['@kanji-fetch', '@kanji-details']).then(intercept => {
      cy.get('#searchText').type('rain')
        .get('.save-btn').click()
        .get('.error-page > h1').should('have.text', 'select search type')
        .get('#searchText').clear()
        .get('.save-btn').click()
        .get('.error-page > h1').should('have.text', 'search cannot be blank!')
    })
  })

  it('should see error message if data is not found', () => {
    cy.intercept(
      "GET",
      "https://kanjialive-api.p.rapidapi.com/api/public/search/rain",
      {
        statusCode: 200,
        body: []
      }
    ).as("kanji-fail");

    cy.visit('http://localhost:3000/search')
    .get('#typeSelect').select('search')
    .get('#searchText').type('rain')
    .get('.save-btn').click()
    cy.wait('@kanji-fail').then(intercept => {
      cy.get('.error-page > h1').should('have.text', 'no results found')
    })
  })

  it('should display message if there is a fetch request error ', () => {
    cy.intercept(
      "GET",
      "https://kanjialive-api.p.rapidapi.com/api/public/search/rain",
      {
        statusCode: 500,
        body: { "message": "endpoint not found" }
      }
    ).as("kanji-fail");
    cy.visit('http://localhost:3000/search')
    .get('#typeSelect').select('search')
    .get('#searchText').type('rain')
    .get('.save-btn').click()
    cy.wait('@kanji-fail').then(intercept => {
    cy.get('.error-page > h1').should('contain', 'Error: Internal Server Error - Please Try Again')
    })
  })

})