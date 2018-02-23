import { toast } from 'react-toastify';
import { TOPICS_ACTIONS } from '../constants/TopicsConstants';

const initialState = {
  requests: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOPICS_ACTIONS.GET_TOPIC_REQUESTS_FULFILLED: {
      return {
        ...state,
        requests: payload,
      };
    }
    case TOPICS_ACTIONS.CONFIRM_ACTION_FAILURE: {
      toast.error('Failed to execute action.');
      return {
        ...state,
        requests: [...state.requests],
      };
    }
    case TOPICS_ACTIONS.CONFIRM_ACTION_SUCCESS: {
      toast.error('Request successfully approved.');
      return {
        ...state,
        requests: [...state.requests],
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
