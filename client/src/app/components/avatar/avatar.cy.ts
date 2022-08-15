import { Hero } from 'src/app/services/models';


describe('AvatarComponent', () => {
  const hero: Hero = {
    id: 0,
    name: 'dude man',
    fans: 0,
    saves: 0,
    avatarUrl: '',
    powers: [{ id: 1, name: 'flying'}],
    price: 100,
  }
  it('can mount', () => {
    cy.mount(`<app-avatar [hero]="hero"></app-avatar>`, {
      componentProperties: {
        hero
      }
    });

  });
});


