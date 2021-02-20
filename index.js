const puppeteer = require('puppeteer');



const crawl = async (rootURL) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(rootURL);

  let urls = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'))
      return links.map(link => link.href);
  });
  console.log('done', urls);

  await browser.close();
}

crawl('http://www.uycnr.com/');