import faker from 'faker';

const topicsCount = 100;
const topicsSchema = () => ({
    id: faker.random.uuid(),
    name: faker.name.title()
});

function fillData(schema, count) {
    const data = [];

    for (let i = 0; i < count; i++) {
        data.push(topicsSchema());    
    }

    return data;
}

function performRequest(method, url) {
    let data;

    if (method === 'GET' && url.split('/').slice(-1).pop() === 'topics') {
        data = fillData(topicsSchema, topicsCount);
    }
    
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), 1000);
    });
}

export const get = (url, data, locators, headers) =>
    performRequest('GET', url, data, locators, headers);

export const post = (url, data, locators, headers) =>
    performRequest('POST', url, data, locators, headers);

export const put = (url, data, locators, headers) =>
    performRequest('PUT', url, data, locators, headers);

export const del = (url, data, locators, headers) =>
    performRequest('DELETE', url, data, locators, headers);
