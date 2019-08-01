const { setDefaultOptions } = require( 'expect-puppeteer' )
setDefaultOptions({ timeout: 500 }) // set global assertion timeout

jest.setTimeout(10000) // set global timeout based on network/browser

beforeAll(async () => {
  await page.setViewport({width: 1200, height: 900})
  await page.goto('https://login.thrivehive.com/login')
})

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto('https://login.thrivehive.com/login');
})

describe('Login page', () => {

  it('should display login page', async (done) => {
    await page.waitFor('button[type="submit"]')
    await page.screenshot({ path:'./screenshots/blank-login-page.png'})
    await expect(page).toMatch('Sign In')
    done()
  })

  it('should prompt for email when given invalid format input', async (done) => {
    await expect(page).toFillForm('form[action="/auth/user"]', {
      username: 'James',
      password: 'Bond',
    })
    await page.screenshot({ path:'./screenshots/filled-login-page.png'})
    await expect(page).toClick('button', 'type="submit"')
    await page.waitFor(1000)
    await expect(page).toMatch('Enter your email to login')
    await page.screenshot({ path:'./screenshots/invalid-email-login-page.png'})
    done()
  })

  it('shoudld prompt invalid login credentials', async (done) => {
    await expect(page).toFillForm('form[action="/auth/user"]', {
      username: 'James@bond.com',
      password: 'Bond',
    })
    await page.screenshot({ path:'./screenshots/revised-login-page.png'})
    await expect(page).toClick('button', 'type="submit"')
    await page.waitFor(1000)
    await expect(page).toMatch('Invalid user credentials')
    await page.screenshot({ path:'./screenshots/invalid-credentials-login-page.png'})
    done()
  })

})
