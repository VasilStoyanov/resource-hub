import { RESOURCES_ACTIONS } from '../constants/ResourcesConstants';
import { containsCaseInsensitive } from '../utilities/contains';
import { orderBy } from '../utilities/orderBy';

const initialState = {
    resources: [{
        id: '',
        name: ''
    }],
    filteredResources: [{
        id: '',
        name: ''
    }]
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case RESOURCES_ACTIONS.USER_INPUT_CHANGED: {
            const filteredResources = !payload || payload === '' ? 
                                        [] :
                                        state.resources.filter(n => containsCaseInsensitive(n.name, payload));
            return {
                ...state,
                filteredResources
            };
        }
        case RESOURCES_ACTIONS.GET_NAMES_FULFILLED: {
            const orderedResources = orderBy(payload, 'name');
            return {
                ...state,
                resources: orderedResources
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
