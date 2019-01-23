describe('Currencies test', () => {
 it('shows error', function () {
    cy.server();
    cy.route('GET', '/', {});
    cy.visit('/');
    cy.get("[data-test='error']").should('be.visible');
    cy.get("[data-test='currencyTable']").should('not.be.visible');
    cy.server({ enable: false })
  })
  it('shows error on 404', function () {
    cy.server({status: '404'});
    cy.route('GET', '/', {});
    cy.visit('/');
    cy.get("[data-test='error']").should('be.visible');
    cy.get("[data-test='currencyTable']").should('not.be.visible');
    cy.server({ enable: false })
  })
  it('shows currencies', function () {
    const dollar = 1.2,
      euro = 2.3;
    cy.server();
    cy.route('GET', '/', {
        success: true,
        currencies: {
          dollar: dollar,
          euro: euro
        }
      });
    cy.visit('/');
    cy.get("[data-test='currencyTable']").contains(dollar).should('be.visible')
    cy.get("[data-test='currencyTable']").contains(euro).should('be.visible')
  })
})
