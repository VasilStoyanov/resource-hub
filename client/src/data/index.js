import { ajax } from 'rxjs/observable/dom/ajax';

function performRequest(method, url, data, locators, parameters, headers) {
    let modifiedUrl = locators ? applyLocators(url, locators) : url;
    let result;

    if (method === 'GET' && data) {
        if (parameters) {
            modifiedUrl = addQueryStringParameters(modifiedUrl, parameters);
        }
        result = ajax[method.toLowerCase()](modifiedUrl, headers);
    } else if (data) {
      result = ajax[method.toLowerCase()](modifiedUrl, data, headers);
    }

    return result;
}

function addQueryStringParameters(url, parameters) {
    let modifiedUrl = `${url}?`;
    const keys = Object.keys(parameters);

    keys.forEach(key => {
        modifiedUrl = `${modifiedUrl}${key}=${parameters[key]}&`;
    });
    
    return modifiedUrl;
}

function applyLocators(url, locators) {
    const keys = Object.keys(locators);
    let modifiedUrl = url;

    keys.forEach(key => {
        modifiedUrl = modifiedUrl.replace(`{${key}}`, locators[key]);
    });

    return modifiedUrl;
}

export const get = (url, locators, headers) => 
        performRequest('GET', url, {}, locators, headers);
        
export const post = (url, data, locators, headers) => 
        performRequest('POST', url, data, locators, headers);

export const put = (url, data, locators, headers) => 
        performRequest('PUT', url, data, locators, headers);

export const del = (url, data, locators, headers) => 
        performRequest('DELETE', url, data, locators, headers);
