describe('Admin test', () => {
  const dateTimeToday = new Date(),
    dateTimeTomorrow = (new Date()).setDate(dateTimeToday.getDate() + 1),
    dateTomorrow = [
      ('0' + new Date(dateTimeTomorrow).getDate()).slice(-2),
      ('0' + new Date(dateTimeTomorrow).getMonth() + 1).slice(-2),
      new Date(dateTimeTomorrow).getFullYear()
    ].join('-'),
    dollar = Math.floor(Math.random() * 101),
    euro = Math.floor(Math.random() * 101),
    currencyList = [
      {
        id: 1,
        currency_type: 'dollar',
        currency_value: dollar,
        forcing_date: dateTomorrow
      },
      {
        id: 2,
        currency_type: 'euro',
        currency_value: euro,
        forcing_date: dateTomorrow
      }
    ];
  describe('GET to API', () => {
    it('shows page', function () {
      cy.server();
      cy.route('GET', '/currency_forcing', {
          success: true,
          currencies: currencyList
        }).as('getForcing');
      cy.visit('/admin');
      cy.get("[data-test='forcingTable']").contains(euro).should('be.visible')
      cy.get("[data-test='forcingTable']").contains(dollar).should('be.visible')
      cy.get("[data-test='error']").should('not.be.visible')
      cy.server({ enable: false })
    })
    it('shows error on 404', function () {
      cy.server({status: '404'});
      cy.route('GET', '/currency_forcing', {});
      cy.visit('/admin');
      cy.get("[data-test='error']").should('be.visible')
      cy.get("[data-test='forcingTable']").should('not.be.visible');
      cy.server({ enable: false })
    })
    it('shows error on success:false', function () {
      cy.server();
      cy.route('GET', '/currency_forcing', {success: false, msg: 'Some ERROR!'});
      cy.visit('/admin');
      cy.get("[data-test='error']").contains('Some ERROR!').should('be.visible')
      cy.get("[data-test='forcingTable']").should('not.be.visible');
      cy.server({ enable: false })
    })
  })
  describe('POST to API', () => {
    it('creates currency forcing', function () {
      const dateTomorrow = [
          new Date(dateTimeTomorrow).getFullYear(),
          ('0' + new Date(dateTimeTomorrow).getMonth() + 1).slice(-2),
          ('0' + new Date(dateTimeTomorrow).getDate()).slice(-2)
        ].join('-'),
        currencyValue = Math.floor(Math.random() * 101),
        currency = ['dollar', 'euro'],
        currencyType = currency[Math.round(Math.random())];
      cy.server();
      cy.route('GET', '/currency_forcing', {
        success: true,
        currencies: currencyList
      });
      const dataForPost = currencyList.slice();
      dataForPost.unshift({
      currency_type: currencyType,
      currency_value: currencyValue,
      forcing_date: dateTomorrow
      });
      cy.route('POST', '/currency_forcing', {
        success: true,
        currencies: dataForPost}).as('postForcing');
      cy.visit('/admin');
      cy.get("input[id='" + currencyType + "']").click();
      cy.get("input[id='currencyValue']").type(currencyValue);
      cy.get("input[id='dateInput']").type(dateTomorrow);
      cy.get("button[type='submit']").click();
      cy.get("[data-test='forcingTable']").find('tr').should('have.length',dataForPost.length + 1);
      cy.server({ enable: false })
    })
  })
  describe('DELETE to API', () => {
    it('deletes currency forcing', function () {
      cy.server();
      cy.route('GET', '/currency_forcing', {
        success: true,
        currencies: currencyList
      });
      const dataForDelete = currencyList.slice();
      dataForDelete.shift();
      cy.route('DELETE', '/currency_forcing/*', {
        success: true,
        currencies: dataForDelete}).as('postDollarForcing');
      cy.visit('/admin');
      cy.get("[data-test='forcingTable']").find("button[data-test='removeForcingBtn']").first().click();
      cy.get("[data-test='forcingTable']").find('tr').should('have.length',dataForDelete.length + 1);
      cy.server({ enable: false })
    })
  })
})
