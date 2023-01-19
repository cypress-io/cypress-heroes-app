describe('home page', () => {
  const waitTimer = 5;

  afterEach(() => {
    cy.clearAllCookies({ log: false });
    cy.clearAllLocalStorage({ log: false });
    cy.clearAllSessionStorage({ log: false });
  })

  describe('when not logged in', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('clicking on like should alert the user they need to login', () => {
      //get first hero and click like
      cy.get('app-card')
        .first()
        .as('firstHero')
        .find('app-icon-button[icon=like]')
        .click()
        .wait(waitTimer, { log: false });
      cy.contains('You must log in to like.').wait(waitTimer, { log: false });
      cy.get('button').contains('Ok').click().wait(waitTimer, { log: false });
      cy.contains('You must log in to like.')
        .should('not.exist')
        .wait(waitTimer, { log: false });
    });

    it('clicking on hire should alert the user they need to login', () => {
      //get first hero and click like
      cy.get('app-card')
        .first()
        .as('firstHero')
        .find('app-icon-button[icon=money]')
        .click()
        .wait(waitTimer, { log: false });
      cy.contains('You must log in to hire this hero.').wait(waitTimer, {
        log: false,
      });
      cy.get('button').contains('Ok').click().wait(waitTimer, { log: false });
      cy.contains('You must log in to hire this hero.')
        .should('not.exist')
        .wait(waitTimer, { log: false });
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
        })
        .wait(waitTimer, { log: false });
      //click like button
      cy.get('@firstHero')
        .find('app-icon-button[icon=like]')
        .click({ scrollBehavior: false })
        .wait(waitTimer, { log: false });
      //assert count increased
      cy.get('@fanCount')
        .then((fanCount) => {
          cy.get('@fanSpan').should('have.text', Number(fanCount) + 1);
        })
        .wait(waitTimer, { log: false });
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
        })
        .wait(waitTimer, { log: false });
      //click hire button
      cy.get('@firstHero')
        .find('app-icon-button[icon=money]')
        .click({ scrollBehavior: false })
        .wait(waitTimer, { log: false });
      //click yes
      cy.get('button').contains('Yes').click();
      //assert count increased
      cy.get('@saveCount')
        .then((saveCount) => {
          cy.get('@saveSpan').should('have.text', Number(saveCount) + 1);
        })
        .wait(waitTimer, { log: false });
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
        })
        .wait(waitTimer, { log: false });
      //click hire button
      cy.get('@firstHero')
        .find('app-icon-button[icon=money]')
        .click({ scrollBehavior: false })
        .wait(waitTimer, { log: false });
      //click no
      cy.get('button').contains('No').click().wait(waitTimer, { log: false });
      //assert count is the same
      cy.get('@saveCount')
        .then((saveCount) => {
          cy.get('@saveSpan').should('have.text', Number(saveCount));
        })
        .wait(waitTimer, { log: false });
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
        })
        .wait(waitTimer, { log: false });
      //click like button
      cy.get('@firstHero')
        .find('app-icon-button[icon=like]')
        .click({ scrollBehavior: false })
        .wait(waitTimer, { log: false });
      //assert count increased
      cy.get('@fanCount').then((fanCount) => {
        cy.get('@fanSpan')
          .should('have.text', Number(fanCount) + 1)
          .wait(waitTimer, { log: false });
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
        })
        .wait(waitTimer, { log: false });
      //click hire button
      cy.get('@firstHero')
        .find('app-icon-button[icon=money]')
        .click({ scrollBehavior: false })
        .wait(waitTimer, { log: false });
      //click yes
      cy.get('button').contains('Yes').click().wait(waitTimer, { log: false });
      //assert count increased
      cy.get('@saveCount').then((saveCount) => {
        cy.get('@saveSpan')
          .should('have.text', Number(saveCount) + 1)
          .wait(waitTimer, { log: false });
      });
    });

    it('clicking edit on a hero should redirect to edit page', function () {
      //click edit button
      cy.get('app-card')
        .first()
        .find('[icon=pencil]')
        .click({ scrollBehavior: false })
        .wait(waitTimer, { log: false });
      cy.location('pathname')
        .should('match', /\/edit$/)
        .wait(waitTimer, { log: false });
    });

    it('clicking delete on a hero should prompt to delete hero', function () {
      //click delete button
      cy.get('app-card')
        .first()
        .find('[icon=trash]')
        .click({ scrollBehavior: false })
        .wait(waitTimer, { log: false });
      cy.contains('Delete Hero?').wait(waitTimer, { log: false });
      //click no
      cy.get('button').contains('No').click().wait(waitTimer, { log: false });
    });
  });
});
