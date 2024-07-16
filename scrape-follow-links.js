const puppeteer = require('puppeteer'); 
const fs = require("fs");
 
(async () => { 
	// Initiate the browser 
	const browser = await puppeteer.launch(); 
	 
	// Create a new page with the default browser context 
	const page = (await browser.pages())[0];
 
	// Go to the target website 
	await page.goto("https://realpython.github.io/fake-jobs/"); 

	// Get links
    const listLinks = await page.$$eval( 
        'a', 
    	links => links.map(link => link.href) 
    ); 
    
	// Closes the browser and all of its pages 
	await browser.close(); 
})();



