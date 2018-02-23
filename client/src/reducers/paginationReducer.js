import { PENDING_TOPICS_PAGE_LENGTH, PENDING_TOPICS_PAGINATION_DELTA } from '../constants/TopicsConstants';
import { PAGINATION_ACTIONS } from '../constants/PaginationConstants';

const initialState = {
  requests: {
    items: [],
    searchedItems: [],
    selected: [],
    pageNumber: 0,
    pagesCount: 0,
    paginationDelta: PENDING_TOPICS_PAGINATION_DELTA,
    pageSize: PENDING_TOPICS_PAGE_LENGTH,
    selectedStatus: 2,
    searchQuery: '',
    filterBy: '',
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PAGINATION_ACTIONS.GET_ITEMS: {
      const { name, items } = payload;

      const filteredByStatusItems = state[name].selectedStatus
        ? items.filter(n => n.status === state[name].selectedStatus)
        : items;

      const pagesCount = Math.ceil(filteredByStatusItems.length / state[name].pageSize);
      const selected = filteredByStatusItems.slice(0, state[name].pageSize);

      return {
        ...state,
        [name]: {
          ...state[name],
          items,
          filteredByStatusItems,
          searchedItems: filteredByStatusItems,
          selected,
          pagesCount,
        },
      };
    }
    case PAGINATION_ACTIONS.SWITCH_PAGE: {
      const { name, pageNumber } = payload;
      const startIndex = pageNumber * state[name].pageSize;
      const endIndex = startIndex + state[name].pageSize;
      const selected = state[name].searchedItems.slice(startIndex, endIndex);
      return {
        [name]: {
          ...state[name],
          selected,
          items: [...state[name].items],
          searchedItems: [...state[name].searchedItems],
          pageNumber,
        },
      };
    }
    case PAGINATION_ACTIONS.SEARCH: {
      const { name, query, filterBy } = payload;
      const searchedItems = state[name].filteredByStatusItems.filter(n => n[filterBy].includes(query || ''));
      const selected = searchedItems.slice(0, state[name].pageSize);
      const pagesCount = Math.ceil(searchedItems.length / state[name].pageSize);

      return {
        [name]: {
          ...state[name],
          selected,
          items: [...state[name].items],
          filteredByStatusItems: [...state[name].filteredByStatusItems],
          pageNumber: 1,
          pagesCount,
          searchedItems,
          searchQuery: query,
          filterBy,
        },
      };
    }
    case PAGINATION_ACTIONS.SELECT_STATUS: {
      const { name, status } = payload;

      const searchedItems = state[name].items
        .filter(n => n.status === status
                    && (!state[name].filterBy
                    || state[name].filterBy === ''
                    || n[state[name].filterBy].includes(state[name].searchQuery)));

      const selected = searchedItems.slice(0, state[name].pageSize);
      const pagesCount = Math.ceil(searchedItems.length / state[name].pageSize);

      return {
        [name]: {
          ...state[name],
          selected,
          items: [...state[name].items],
          pageNumber: 1,
          pagesCount,
          filteredByStatusItems: searchedItems,
          searchedItems,
          selectedStatus: status,
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
