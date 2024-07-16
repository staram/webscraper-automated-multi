const puppeteer = require('puppeteer'); 
const fs = require("fs");
 
(async () => { 
	// Initiate the browser 
	const browser = await puppeteer.launch(); 
	 
	// Create a new page with the default browser context 
	const page = await browser.newPage(); 
 
	// Go to the target website 
	await page.goto("https://americanliterature.com/short-stories-for-children/"); 
 
	// Get pages HTML content 
	// const content = await page.content(); 
	// console.log(content); 

	//get title
	const titleNode = await page.$('h1'); 
	const title = await page.evaluate(el => el.innerText, titleNode);

	// Get links
    const listLinks = await page.$$eval( 
        'a', 
    	links => links.map(link => link.href) 
    ); 

    // Apply stringify to links for saving
    var stringLinks = JSON.stringify(listLinks, null, "\t");

    //save to file
    fs.writeFileSync("SAVEFILE.txt", stringLinks);

 
	// Closes the browser and all of its pages 
	await browser.close(); 
})();



