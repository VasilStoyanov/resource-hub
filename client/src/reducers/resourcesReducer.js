import { RESOURCES_ACTIONS } from '../constants/ResourcesConstants';
import { containsCaseInsensitive } from '../utilities/contains';
import { orderBy } from '../utilities/orderBy';

const PAGE_SIZE = 6;

const initialState = {
    pagesCount: 0,
    pageNumber: 0,
    selectedResources: [],
    resources: [],
    resourcesNames: [{
        id: '',
        name: ''
    }],
    filteredResourcesNames: [{
        id: '',
        name: ''
    }]
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case RESOURCES_ACTIONS.USER_INPUT_CHANGED: {
            const filteredResourcesNames = !payload || payload === '' ? 
                                        [] :
                                        state.resourcesNames.filter(n => containsCaseInsensitive(n.name, payload));
            return {
                ...state,
                filteredResourcesNames
            };
        }
        case RESOURCES_ACTIONS.GET_NAMES_FULFILLED: {
            const orderedResources = orderBy(payload, 'name');
            return {
                ...state,
                resourcesNames: orderedResources
            };
        }
        case RESOURCES_ACTIONS.SEARCH_FULFILLED: {
            const orderedResources = orderBy(payload, 'name');
            const pagesCount = Math.floor(orderedResources.length / PAGE_SIZE); 

            return {
                ...state,
                resources: orderedResources,
                selectedResources: orderedResources.slice(0, 6),
                pagesCount,
                pageNumber: 0,
            };
        }
        case RESOURCES_ACTIONS.SWTICH_PAGE: {
            const startIndex = payload * PAGE_SIZE;
            const endIndex = startIndex + PAGE_SIZE;
            const selectedResources = state.resources.slice(startIndex, endIndex);

            return {
                ...state,
                selectedResources,
                pageNumber: payload
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
