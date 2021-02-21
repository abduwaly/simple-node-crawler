const puppeteer = require('puppeteer')
const fs = require('fs')

const getAllLinks = async (rootURL) => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(rootURL)

    let urls = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'))
      return links.map(link => link.href)
    })

    await browser.close()
    return urls
  } catch (error) {
    console.error('!err: getAllLinks', error)
    await browser.close()
  }
}

const saveAsHTML = async (urls, folderName) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await urls.forEach(async (url, index) => {    
    await page.goto(url)
    let content = await page.content()

    fs.writeFile(
      `./${folderName}/${index}_${new Date().getTime()}.html`,
      content.toString(),
      () => {
        console.log('✅', index, url);
      }
    )
  })
}

(async ()=>{
  const allLinks = await getAllLinks('http://www.uycnr.com/')
  saveAsHTML(allLinks, 'uycnr')  
})();
