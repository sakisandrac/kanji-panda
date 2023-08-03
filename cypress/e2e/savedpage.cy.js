describe('User should be able to save kanji', () => {
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

  it('should be able to click on kanji and save them, view saved, and unsave them', () => {
    cy.wait(['@kanji-fetch', '@kanji-details']).then(intercept => {
      cy.get('.main-kanji > .save-btn').should('have.text', 'Save Kanji').click()
      .get('.kanji-set-box > :nth-child(1)').click()
      .get('.main-kanji > .save-btn').should('be.visible')
      .get('.nav-link-container > :nth-child(2)').click()
      .get('.header').should('have.text', 'My Saved Kanji')
      .get('.saved-container').children().should('have.length', 1)
      .get('.main-kanji').get('.save-btn').should('have.text', 'Unsave Kanji')
      .click().get('.saved-container').get('.error-page > h1').should('be.visible')
      .get('.error-page > h1').should('have.text', 'You have not saved any kanji yet!')
    })
  })
})