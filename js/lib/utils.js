import XMLHttpRequest from '../node_modules/xmlhttprequest/lib/XMLHttpRequest.js';
;
;
export default class Request {
    // prevent direct construction with the new operator 
    constructor() { }
    static getInstance() {
        if (!Request.instance) {
            Request.instance = new Request();
        }
        return Request.instance;
    }
    post(options) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest.XMLHttpRequest();
            xhr.open("POST", options.url, true);
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText);
                }
                else {
                    reject(new Error(xhr.statusText));
                }
            };
            xhr.onerror = () => reject(new Error(xhr.statusText));
            xhr.send(options.body);
        });
    }
    get(options) {
        const xhr = new XMLHttpRequest.XMLHttpRequest();
        xhr.open("GET", options.url, true);
        console.log(xhr);
        return new Promise((resolve, reject) => {
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText);
                }
                else {
                    reject(new Error(xhr.statusText));
                }
            };
            xhr.onerror = () => {
                console.log("xhr");
                reject(new Error(xhr.statusText));
            };
            xhr.send();
        });
    }
}
;
