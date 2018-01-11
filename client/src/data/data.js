import axios from 'axios';

function performRequest(method, url, data, locators, headers) {
    const modifiedUrl = locators ? applyLocators(url, locators) : url;

    const httpRequest = {
            method,
            url: modifiedUrl,
        };

    if (headers) {
        Object.assign(httpRequest.headers, headers);
    }

    if (method === 'GET' && data) {
        httpRequest.parameters = data;
    } else if (data) {
        httpRequest.data = data;
    }

    return axios(httpRequest)
        .catch(err => Promise.reject(err));
}


function applyLocators(url, locators) {
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
