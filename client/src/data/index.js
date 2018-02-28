import { ajax } from 'rxjs/observable/dom/ajax';

function applyLocators(url, locators) {
  const keys = Object.keys(locators);
  let modifiedUrl = url;

  keys.forEach((key) => {
    modifiedUrl = modifiedUrl.replace(`{${key}}`, locators[key]);
  });

  return modifiedUrl;
}

function addQueryStringParameters(url, parameters) {
  let modifiedUrl = `${url}?`;
  const keys = Object.keys(parameters);

  keys.forEach((key) => {
    modifiedUrl = `${modifiedUrl}${key}=${parameters[key]}&`;
  });

  return modifiedUrl;
}

function performRequest(method, url, data, locators, parameters, headers) {
  let modifiedUrl = locators ? applyLocators(url, locators) : url;

  if (parameters) {
    modifiedUrl = addQueryStringParameters(modifiedUrl, parameters);
  }

  let result;
  if (method === 'GET' && data) {
    result = ajax[method.toLowerCase()](modifiedUrl, headers);
  } else if (data) {
    result = ajax[method.toLowerCase()](modifiedUrl, data, headers);
  }

  return result;
}

export const get = (url, locators, parameters, headers) =>
  performRequest('GET', url, {}, locators, parameters, headers);

export const post = (url, data, locators, parameters, headers) =>
  performRequest('POST', url, data, locators, headers);

export const put = (url, data, locators, parameters, headers) =>
  performRequest('PUT', url, data, locators, headers);

export const del = (url, headers, locators, parameters) =>
  performRequest('DELETE', url, headers, locators, parameters);
