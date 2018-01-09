const host = 'localhost';
const port = 5000;
export const url = `http://${host}:${port}/`;

const HttpRequest = {
    mode: 'cors',
    // credentials: 'include',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    }
};

export const HttpPost = {
    ...HttpRequest,
    method: 'POST'
};

export const HttpGet = {
    ...HttpRequest,
    method: 'GET'
};

export const HttpDelete = {
    ...HttpRequest,
    method: 'DELETE'
};
