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
    .get('.info-home-box').should('have.text', 'Click on a Kanji to see more details, and save!')
    .get('.main-kanji').get('.main-char')
    .get('.description').children().should('have.length', 3)
    .get('.description > :nth-child(1) > b').contains('Meaning:')
    .get('.description > :nth-child(2) > b').contains('Onyomi Pronounciation:')
    .get('.description > :nth-child(3) > b').contains('Kunyomi Pronounciation:')
    .get('.main-char').invoke('text').should('be.oneOf', ["母", "花","日", "犬", "猫"])
    .get('.set-header').should('have.text', 'Random Kanji Study Set')
   })
    
  })

  it('should be able to load another random set of kanji', () => {
    cy.wait(['@kanji-fetch', '@kanji-details']).then(intercept => {
      cy.get('.kanji-set-container > .save-btn').should('have.text', 'Get Another Set!')
      .get('.kanji-set-container > .save-btn').click()
      cy.wait(['@kanji-fetch', '@kanji-details']).then(intercept => {
        cy.get('.kanji-set-box').children().should('have.length', 5)
      })
    })
  })

  it('should be able to navigate to saved page and back to home from nav bar', () => {
    cy.wait(['@kanji-fetch', '@kanji-details']).then(intercept => {
      cy.get('.nav-bar').should('be.visible')
      .get('.logo').should('be.visible')
      .get('.nav-link-container > :nth-child(2)').click()
      .url().should('include', '/saved')
      .get('.nav-link-container > :nth-child(1)').click()
      .url().should('include', '/')
      .get('.logo').click()
      .url().should('include', '/')
    })
  })
})