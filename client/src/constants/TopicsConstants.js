
export const MESSAGES = {
    GET_ALL_FAILED: 'Get all topics failed!',
    ADD_FAILED: 'Failed to add topic!',
    ADD_SUCCESS: 'Successfully added topic!'
};


export const TOPICS_ACTIONS = {
    GET_ALL: {
        FULFILLED: 'GET_ALL_TOPICS_FULFILLED',
        REJECTED: 'GET_ALL_TOPICS_REJECTED',
    },
    ADD: {
        FULFILLED: 'ADD_TOPIC_FULFILLED',
        REJECTED: 'ADD_TOPIC_REJECTED'
    }
};

export const URLS = {
    GET_ALL: '/api/topics',
    ADD: '/api/topics'
};

