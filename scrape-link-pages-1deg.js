const puppeteer = require('puppeteer');
const fs = require("fs");
const path = require("path");

(async () => {
    // Initiate the browser
    const browser = await puppeteer.launch();

    // Create a new page with the default browser context
    const page = await browser.newPage();

    // Go to the target website
    await page.goto("https://books.toscrape.com/catalogue/category/books/classics_6/index.html");

    // Get the base domain of the target website
    const targetUrl = new URL(page.url());
    const baseDomain = targetUrl.hostname;

    // Get links on the specified page only
    const links = await page.evaluate((baseDomain) => {
        return Array.from(document.querySelectorAll('a'))
            .filter(link => new URL(link.href).hostname === baseDomain)
            .map(link => ({
                text: link.textContent,
                href: link.href
            }));
    }, baseDomain);

    // Create a folder to store the files
    const folderPath = path.join(__dirname, 'userfiles');
    fs.mkdirSync(folderPath, { recursive: true });

    // Loop through each link
    for (const link of links) {
        // Open a new page for each link
        const newPage = await browser.newPage();

        // Navigate to the link
        await newPage.goto(link.href);

        // Get the title of the page
        const title = await newPage.title();

        // Generate a filename based on the page title
        const fileName = title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase() + ".txt";

        // Get the content of the page
        const content = await newPage.$eval("*", (el) => el.innerText);

        // Save the content to a file in the userfiles folder
        const filePath = path.join(folderPath, fileName);
        fs.writeFileSync(filePath, content);

        // Close the new page
        await newPage.close();
    }

    // Close the browser
    await browser.close();
})();

