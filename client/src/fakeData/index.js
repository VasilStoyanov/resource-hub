/* eslint-disable */

import faker from 'faker';
import { Observable } from 'rxjs';

const resourcesCount = 10;
const resourcesSchema = () => ({
    id: faker.random.uuid(),
    name: faker.name.title()
});

const thematicsCount = 10;
const thematicSchema = () => ({
    id: faker.random.uuid(),
    name: faker.name.title()
});

const topicsCount = 30;
const topicSchema = () => ({
    id: faker.random.uuid(),
    name: faker.name.title(),
    thematics: []
});

function fillData(schema, count) {
    const data = [];

    for (let i = 0; i < count; i++) {
        data.push(topicSchema());    
    }

    return data;
}

function performRequest(method, url) {
    let data;

    if (method === 'GET' && url.split('/').slice(-1).pop() === 'topics') {
        data = fillData(topicSchema, topicsCount);
        data.forEach(element => {
             element.thematics = element.thematics.concat(fillData(thematicSchema, thematicsCount));
        });
    }else if (method === 'GET' && url.split('/').slice(-1).pop() === 'names') {
        data = fillData(resourcesSchema, resourcesCount);
    }
    return Observable.fromPromise(new Promise((resolve) => {
        setTimeout(() => resolve(data), 1000);
    }));
}

export const get = (url, data, locators, headers) =>
    performRequest('GET', url, data, locators, headers);

export const post = (url, data, locators, headers) =>
    performRequest('POST', url, data, locators, headers);

export const put = (url, data, locators, headers) =>
    performRequest('PUT', url, data, locators, headers);

export const del = (url, data, locators, headers) =>
    performRequest('DELETE', url, data, locators, headers);