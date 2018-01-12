import { ajax } from 'rxjs/observable/dom/ajax';

function performRequest(method, url, data, locators, headers) {
    let modifiedUrl = locators ? applyUrlModifications(url, locators) : url;
    let result;

    if (method === 'GET' && data) {
        let temp = Object.keys(data);
        if (temp.lenght >= 0) {
            modifiedUrl = applyUrlModifications(data);
        }
        result = ajax[method.toLowerCase()](modifiedUrl, headers);
    } else if (data) {
      result = ajax[method.toLowerCase()](modifiedUrl, data, headers);
    }

    return result;
}

function applyUrlModifications(url, locators) {
    const keys = Object.keys(locators);
    let modifiedUrl = url;

    keys.forEach(key => {
        modifiedUrl = modifiedUrl.replace(`{${key}}`, locators[key]);
    });

    return modifiedUrl;
}

export const get = (url, data, locators, headers) => 
        performRequest('GET', url, data, locators, headers);
        
export const post = (url, data, locators, headers) => 
        performRequest('POST', url, data, locators, headers);

export const put = (url, data, locators, headers) => 
        performRequest('PUT', url, data, locators, headers);

export const del = (url, data, locators, headers) => 
        performRequest('DELETE', url, data, locators, headers);
