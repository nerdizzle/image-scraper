import Request from "./utils";
import XMLHttpRequest from '../node_modules/xmlhttprequest/lib/XMLHttpRequest'

const scrapeUrl= "https://www.google.com/search?q=hockey&tbm=isch";
//const scrapeUrl= "http://www.lakelandcup.com";


const request = Request.getInstance();
request.get({url: scrapeUrl}).then((res) => {
    console.log(res);
});


