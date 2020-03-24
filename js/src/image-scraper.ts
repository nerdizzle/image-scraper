import Request from "./utils";
import XMLHttpRequest from '../node_modules/xmlhttprequest/lib/XMLHttpRequest'


// tbm: to be matched, isch: image search
//const scrapeUrl= "https://www.google.com/search?q=hockey&tbm=isch";
const scrapeUrl="https://www.google.co.in/search?q=banana&source=lnms&tbm=isch"
const request = Request.getInstance();

request.get({url: scrapeUrl}).then((res) => {
    console.log(res);
});


