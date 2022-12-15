describe('home page', () => {

  describe('when not logged in', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('user should be able to log in', function () {
      cy.login('test@test.com', 'test123');
      cy.visit('/');
      cy.contains('button', 'Logout').should('be.visible');
    });

    it('clicking on like should alert the user they need to login', () => {
      //get first hero and click like
      cy.get('app-card')
        .first()
        .as('firstHero')
        .find('app-icon-button[icon=like]')
        .click();
      cy.contains('You must log in to like.');
      cy.get('button').contains('Ok').click();
      cy.contains('You must log in to like.').should('not.exist');
    });

    it('clicking on hire should alert the user they need to login', () => {
      //get first hero and click like
      cy.get('app-card')
        .first()
        .as('firstHero')
        .find('app-icon-button[icon=money]')
        .click();
      cy.contains('You must log in to hire this hero.');
      cy.get('button').contains('Ok').click();
      cy.contains('You must log in to hire this hero.').should('not.exist');
    });
  });

  describe('when normal user is logged in', () => {
    beforeEach(() => {
      cy.login('test@test.com', 'test123');
      cy.visit('/');
    });

    it('clicking like on a hero should increase their fan count', function () {
      //get current fan count of first hero
      cy.get('app-card')
        .first()
        .as('firstHero')
        .find('[data-cy=fans]')
        .as('fanSpan')
        .then((el) => {
          console.log({ elText: el.text() });
          cy.wrap(el.text()).as('fanCount');
        });
      //click like button
      cy.get('@firstHero').find('app-icon-button[icon=like]').click();
      //assert count increased
      cy.get('@fanCount').then((fanCount) => {
        cy.get('@fanSpan').should('have.text', Number(fanCount) + 1);
      });
    });

    it('user should be able to hire a hero', function () {
      //get current saves count of first hero
      cy.get('app-card')
        .first()
        .as('firstHero')
        .find('[data-cy=saves]')
        .as('saveSpan')
        .then((el) => {
          console.log({ elText: el.text() });
          cy.wrap(el.text()).as('saveCount');
        });
      //click hire button
      cy.get('@firstHero').find('app-icon-button[icon=money]').click();
      //click yes
      cy.get('button').contains('Yes').click();
      //assert count increased
      cy.get('@saveCount').then((saveCount) => {
        cy.get('@saveSpan').should('have.text', Number(saveCount) + 1);
      });
    });

    it('user should be able to decline hiring a hero', function () {
      //get current saves count of first hero
      cy.get('app-card')
        .first()
        .as('firstHero')
        .find('[data-cy=saves]')
        .as('saveSpan')
        .then((el) => {
          console.log({ elText: el.text() });
          cy.wrap(el.text()).as('saveCount');
        });
      //click hire button
      cy.get('@firstHero').find('app-icon-button[icon=money]').click();
      //click no
      cy.get('button').contains('No').click();
      //assert count is the same
      cy.get('@saveCount').then((saveCount) => {
        cy.get('@saveSpan').should('have.text', Number(saveCount));
      });
    });
  });

  describe('when admin user is logged in', () => {
    beforeEach(() => {
      cy.login('admin@test.com', 'test123');
      cy.visit('/');
    });

    it('clicking like on a hero should increase their fan count', function () {
      //get current fan count of first hero
      cy.get('app-card')
        .first()
        .as('firstHero')
        .find('[data-cy=fans]')
        .as('fanSpan')
        .then((el) => {
          console.log({ elText: el.text() });
          cy.wrap(el.text()).as('fanCount');
        });
      //click like button
      cy.get('@firstHero').find('app-icon-button[icon=like]').click();
      //assert count increased
      cy.get('@fanCount').then((fanCount) => {
        cy.get('@fanSpan').should('have.text', Number(fanCount) + 1);
      });
    });

    it('user should be able to hire a hero', function () {
      //get current saves count of first hero
      cy.get('app-card')
        .first()
        .as('firstHero')
        .find('[data-cy=saves]')
        .as('saveSpan')
        .then((el) => {
          console.log({ elText: el.text() });
          cy.wrap(el.text()).as('saveCount');
        });
      //click hire button
      cy.get('@firstHero').find('app-icon-button[icon=money]').click();
      //click yes
      cy.get('button').contains('Yes').click();
      //assert count increased
      cy.get('@saveCount').then((saveCount) => {
        cy.get('@saveSpan').should('have.text', Number(saveCount) + 1);
      });
    });

    it('clicking edit on a hero should redirect to edit page', function () {
      //click edit button
      cy.get('app-card').first().find('[icon=pencil]').click();
      cy.location('pathname').should('match', /\/edit$/);
      cy.screenshot();
    });

    it('clicking delete on a hero should prompt to delete hero', function () {
      //click delete button
      cy.get('app-card').first().find('[icon=trash]').click();
      cy.contains('Delete Hero?');
      //click no
      cy.get('button').contains('No').click();
    });
  });
});
