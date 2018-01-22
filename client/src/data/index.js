import { ajax } from 'rxjs/observable/dom/ajax';

function performRequest(method, url, data, locators, parameters, headers) {
    let modifiedUrl = locators ? applyLocators(url, locators) : url;
    // debugger
    if (parameters) {
        modifiedUrl = addQueryStringParameters(modifiedUrl, parameters);
    }

    let result;
    if (method === 'GET' && data) {
        result = ajax[method.toLowerCase()](modifiedUrl, headers);
    } else if (data) {
      result = ajax[method.toLowerCase()](modifiedUrl, data, headers);
    }

    return result.map(({ response }) => response);
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

export const get = (url, locators, parameters, headers) => 
        performRequest('GET', url, {}, locators, parameters, headers);
        
export const post = (url, data, locators, parameters, headers) => 
        performRequest('POST', url, data, locators, headers);

export const put = (url, data, locators, parameters, headers) => 
        performRequest('PUT', url, data, locators, headers);

export const del = (url, data, locators, parameters, headers) => 
        performRequest('DELETE', url, data, locators, parameters, headers);
