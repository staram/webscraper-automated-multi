const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = (await browser.pages())[0];
    await page.goto("https://www.freechildrenstories.com/how-firefly-got-his-light");

    //get title
    const titleNode = await page.$('h1'); 
    const title = await page.evaluate(el => el.innerText, titleNode);

    //get all text
    const extractedText = await page.$eval("*", (el) => el.innerText);

    //save to file
    fs.writeFileSync(title + ".txt", extractedText);
    

    await browser.close();
})();

