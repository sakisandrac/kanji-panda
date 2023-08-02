describe('Users see error messages if something goes wrong', () => {
  beforeEach(() => {
    const kanji = ["s", "f", "g", "v", "b"]
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

  it('Will see loading text if page is still loading data', () => {
    cy.intercept(
      "GET",
      "https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/",
      {
        statusCode: 200,
        fixture: 'data'
      }
    ).as("kanji-fetch");
    cy.visit("http://localhost:3000/?delay=500")
      .get(".loading-text")
      .should("be.visible")
      .should("have.text", "loading...")
  })

  it('will see error message if there is a 400 level error', () => {
    cy.intercept(
      "GET",
      "https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/",
      {
        statusCode: 400,
        body: { "message": "endpoint not found" }
      }
    ).as("kanji-fetch");
    cy.visit('http://localhost:3000/')
      .get('.error-page > h1').should('have.text', 'Error: Bad Request - Please Try Again')
  })

  it('will see error message if there is a 500 level error', () => {
    cy.intercept(
      "GET",
      "https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/",
      {
        statusCode: 500,
        body: { "message": "endpoint not found" }
      }
    ).as("kanji-fetch");
    cy.visit('http://localhost:3000/')
      .get('.error-page > h1').should('have.text', 'Error: Internal Server Error - Please Try Again')
  })

  it('will see 404 message if user goes to a bad route', () => {
 cy.intercept(
      "GET",
      "https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/",
      {
        statusCode: 200,
        fixture: 'data'
      }
    ).as("kanji-fetch");
    cy.visit('http://localhost:3000/alkdfj')
    .get('.dashboard > img').should('have.attr', 'src')
    .should('include', '/static/media/404.f3683dac59925d84539a.png')
  })
})