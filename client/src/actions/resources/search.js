import { RESOURCES_ACTIONS } from '../../constants/ResourcesConstants';

export const searchResources = (userInput, topicId, thematicId) => ({
    type: RESOURCES_ACTIONS.SEARCH,
    payload: { userInput, topicId, thematicId }
});

export const searchResourcesFulfilled = (data) => ({
    type: RESOURCES_ACTIONS.SEARCH_FULFILLED,
    payload: data
});

export const searchResourcesRejected = (error) => ({
    type: RESOURCES_ACTIONS.SEARCH_REJECTED,
    payload: error
});

