import { TOPICS_ACTIONS, PENDING_TOPICS_PAGE_LENGTH as PAGE_SIZE, PENDING_TOPICS_PAGINATION_DELTA as PAGINATION_DELTA } from '../constants/TopicsConstants';

const initialState = {
  requests: [],
  selectedRequests: [],
  pageNumber: 0,
  pagesCount: 0,
  paginationDelta: PAGINATION_DELTA,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOPICS_ACTIONS.GET_TOPIC_REQUESTS_FULFILLED: {
      const pagesCount = Math.ceil(payload.length / PAGE_SIZE);

      return {
        ...state,
        requests: payload,
        selectedRequests: payload.slice(0, PAGE_SIZE),
        pagesCount,
      };
    }
    case TOPICS_ACTIONS.SWITCH_PAGE: {
      const startIndex = payload * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const selectedRequests = state.requests.slice(startIndex, endIndex);
      return {
        ...state,
        selectedRequests,
        requests: [...state.requests],
        pageNumber: payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
