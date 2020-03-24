import Request from './utils.js';
const scrapeUrl = "https://www.google.com/search?q=hockey&tbm=isch";
//const scrapeUrl= "http://www.lakelandcup.com";
const request = Request.getInstance();
request.get({ url: scrapeUrl }).then((res) => {
    console.log(res);
});
