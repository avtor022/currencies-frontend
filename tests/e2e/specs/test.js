describe('My First Test', () => {
  const APP = "https://localhost:8080";

  let browser;
  const width = 1920;
  const height = 1080;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 80,
      args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });
  afterAll(() => {
    browser.close();
  });

  test("lead can submit a contact request", async () => {
    await page.waitForSelector("h4[text=Курс валют]");
  }, 16000);
})
