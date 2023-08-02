// const kanji = ["母", "花","日", "犬", "猫"]
describe('Users will be able to visit the homepage', () => {

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

    cy.visit('http://localhost:3000/')
  })
  
  it('loads a set kanji on homepage where users are able to click to see more details', () => {
   cy.wait(['@kanji-fetch', '@kanji-details']).then(intercept => {
    cy.url().should('include', '/')
    .get('.header').should('have.text', 'Let\'s Study Kanji!')
    cy.get('.info-home-box').should('have.text', 'Click on a Kanji to see more details, and save!')
    cy.get('.main-kanji').get('.main-char').should('be.oneOf', ["母", "花","日", "犬", "猫"]);
   })
    
  })
})