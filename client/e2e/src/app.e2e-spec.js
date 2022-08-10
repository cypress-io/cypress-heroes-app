const { browser, by, element } = require('protractor')

describe('Angular App', () => {
    it('checks title', () => {
        browser.get(browser.baseUrl)
        expect(browser.getTitle()).toEqual('CyHeroes')
    })

    it('can login', () => {
        expect(element(by.buttonText('Login')).getText()).toEqual('Login')
        browser.actions().click(element(by.buttonText('Login'))).perform()
        element(by.id('login-email')).sendKeys('test@test.com')
        element(by.id('login-password')).sendKeys('test123')
        browser.actions().click(element(by.buttonText('Sign in'))).perform()
        expect(element(by.buttonText('Logout')).getText()).toEqual('Logout')
    })

    it('displays heroes', () => {
        expect(element.all(by.tagName('li')).count()).toBeGreaterThan(4)
    })
})