import { TOPICS_ACTIONS } from '../../constants/TopicsConstants';

export const getTopics = () => ({
        type: TOPICS_ACTIONS.GET_ALL,
        payload: {}
    });

    export const getTopicsFulfilled = (data) => ({
        type: TOPICS_ACTIONS.GET_ALL_FULFILLED,
        payload: data
    });
    
export const getTopicsRejected = () => ({
        type: TOPICS_ACTIONS.GET_ALL_REJECTED,
        payload: {}
    });

