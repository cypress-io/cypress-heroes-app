import { browser, by, element } from 'protractor';

describe('Angular App', () => {
    it('checks title', async () => {
        browser.get(browser.baseUrl)

        const expected = "CyHeroes"
        const actual = await browser.getTitle()

        expect(actual).toEqual(expected)
    })

    it('can login', async () => {
        const loginButton = await element(by.buttonText('Login')).getText()
        expect(loginButton).toEqual('Login')
        await browser.actions().click(element(by.buttonText('Login'))).perform()
        element(by.id('login-email')).sendKeys('test@test.com')
        element(by.id('login-password')).sendKeys('test123')
        await browser.actions().click(element(by.buttonText('Sign in'))).perform()
        const logoutButton = await element(by.buttonText('Logout')).getText()
        expect(logoutButton).toEqual('Logout')
    })


    it('displays heroes', async () => {
        const heroes = await element.all(by.tagName('li')).count()
        expect(heroes).toBeGreaterThan(4)
    })
})