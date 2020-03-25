import path from "path";
import fs from "fs";
import webdriver from '../node_modules/selenium-webdriver/index.js';
//import Request from "./utils";
import axios from 'axios';
const Builder = webdriver.Builder;
const By = webdriver.By;
const Key = webdriver.Key;
const until = webdriver.until;
const scrapeUrl = "https://www.bing.com/images/search?q=banana";
const driver = new Builder().forBrowser('chrome').build();
const downloadImage = async (url) => {
    try {
        const __dirname = path.resolve();
        const filename = path.basename(url);
        const downloadPath = path.resolve(__dirname, '../images', filename);
        //console.log("| download path: " + downloadPath);
        const fileType = filename.slice(-4);
        if (fileType == ".jpg" || fileType == ".png") {
            const imageWriter = fs.createWriteStream(downloadPath);
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream'
            });
            response.data.pipe(imageWriter);
            return new Promise((resolve, reject) => {
                imageWriter.on('finish', resolve);
                imageWriter.on('error', reject);
            });
        }
        else {
            console.log("| ERROR: FileType is: " + fileType);
        }
    }
    catch (error) {
        //console.log(response)
        console.log("| ERROR:" + url + "\n Status:" + "(" + error.response.status + ")");
    }
};
async function main() {
    try {
        await driver.get('http://www.bing.com/images');
        await driver.findElement(By.name('q')).sendKeys('banana', Key.RETURN);
        const mUrls = new Set();
        const numberOfUrls = 10;
        // scrape urls of the original images
        while (mUrls.size <= numberOfUrls) {
            const imageWebElements = await driver.findElements(By.className('iusc'));
            await Promise.all(imageWebElements.map(async (image) => {
                //const content = await image.getAttribute('outerHTML');
                const imageAttributes = await image.getAttribute("m");
                const murl = JSON.parse(imageAttributes)["murl"];
                mUrls.add(murl);
                console.log("| Scraped: " + path.basename(murl));
            }));
            await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
        }
        console.log("Finished scraping the images. Total images: " + mUrls.size);
        const tmp = Array.from(mUrls);
        await Promise.all(tmp.map(async (murl) => {
            await downloadImage(murl);
        }));
        // process the stored image urls
        driver.quit();
    }
    catch (error) {
        //console.log(error);
        console.log("| ERROR while downloading...");
        driver.quit();
    }
}
main();
