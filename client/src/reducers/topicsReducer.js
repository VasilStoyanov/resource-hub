import { toast } from 'react-toastify';
import { TOPICS_ACTIONS, MESSAGES } from '../constants/TopicsConstants';
import { THEMATICS_ACTIONS } from '../constants/ThematicsConstants';
import { RESOURCES_ACTIONS } from '../constants/ResourcesConstants';

const initialState = {
  selectedTopic: {
    thematics: [],
  },
  selectedThematic: {
    id: '',
    name: '',
    filteredResources: [],
    resources: [],
  },
  topics: [{
    id: '',
    name: '',
  }],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOPICS_ACTIONS.GET_ALL_FULFILLED: {
      return {
        ...state,
        topics: payload,
      };
    }
    case TOPICS_ACTIONS.GET_ALL_REJECTED: {
      toast(payload.error || MESSAGES.GET_ALL_FAILED, { className: 'red-toast' });

      return {
        ...initialState,
      };
    }
    case TOPICS_ACTIONS.SELECT: {
      return {
        ...state,
        selectedTopic: payload || {
          thematics: [],
        },
      };
    }
    case THEMATICS_ACTIONS.SELECT: {
      return {
        ...state,
        selectedThematic: {
          ...initialState.selectedThematic,
          ...payload,
        },
      };
    }
    case RESOURCES_ACTIONS.USER_INPUT_CHANGED_FULFILLED: {
      return {
        ...state,
        selectedThematic: {
          ...state.selectedThematic,
          filteredResources: payload,
        },
      };
    }

    case RESOURCES_ACTIONS.GET_NAMES_FULFILLED: {
      return {
        ...state,
        selectedThematic: {
          resources: payload,
          filteredResources: [],
        },
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
