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

describe('Forgot password page', () => {

  it('shoudld display forgot password page', async (done) => {
    await expect(page).toClick('a', 'href="/auth/forgot-password"')
    await page.waitForNavigation()
    await expect(page.url()).toMatch('https://login.thrivehive.com/auth/forgot-password')
    await page.screenshot({ path:'./screenshots/forgot-password.png'})
    done()
  })

  it('shoudld send password reset if email exists', async (done) => {
    await expect(page).toClick('a', 'href="/auth/forgot-password"')
    await page.waitForNavigation()
    await expect(page).toFillForm('form[id="forgotPasswordForm"]', {
      email: 'James@bond.com',
    })
    await expect(page).toClick('button', 'type="submit"')
    await expect(page).toMatch('an email will be sent with password reset instructions')
    await page.screenshot({ path:'./screenshots/reset-password.png'})
    done()
  })

})