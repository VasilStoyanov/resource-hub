/* eslint-disable */

import faker from 'faker';
import { Observable } from 'rxjs';

const resourcesCount = 200;
const resourcesSchema = () => ({
    id: faker.random.uuid(),
    name: faker.name.title(),
    description: faker.lorem.text().substring(0,100),
    href: faker.internet.url(),
    imageUrl: 'data:image/png;base64,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'
});

const resourcesNamesCount = 10000;
const resourcesNamesSchema = () => ({
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
        data.push(schema());    
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
        data = fillData(resourcesNamesSchema, resourcesNamesCount);
    }else if (method === 'GET' && url.split('/').slice(-1).pop() === 'resources') {
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
