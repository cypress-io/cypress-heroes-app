const { browser, by, element } = require('protractor')

describe('Angular App', () => {
    it('checks title', () => {
        browser.get("/")
        expect(browser.getTitle()).toEqual('CyHeroes')
    })

    it('can login', () => {
        expect(element(by.id('login')).getText()).toEqual('Login')
        browser.actions().click(element(by.id('login'))).perform()
        element(by.id('login-email')).sendKeys('test@test.com')
        element(by.id('login-password')).sendKeys('test123')
        browser.actions().click(element(by.buttonText('Sign in'))).perform()
        expect(element(by.id('logout')).getText()).toEqual('Logout')
    })

    it('displays heroes', () => {
        expect(element.all(by.tagName('li')).count()).not.toEqual(0)
    })
})