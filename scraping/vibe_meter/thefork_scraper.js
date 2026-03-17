const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');

const url = 'https://www.thefork.pt/restaurantes/lisboa-c665920';

async function scrapeTheFork() {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(url, { waitUntil: 'networkidle2' });

        const content = await page.content();
        fs.writeFileSync('thefork.html', content);
        console.log('Saved HTML to thefork.html');

    } catch (error) {
        console.error('Error scraping TheFork:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

scrapeTheFork();
