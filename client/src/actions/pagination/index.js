import { PAGINATION_ACTIONS } from '../../constants/PaginationConstants';

export const switchPage = data => ({
  type: PAGINATION_ACTIONS.SWITCH_PAGE,
  payload: data,
});

export const getItems = data => ({
  type: PAGINATION_ACTIONS.GET_ITEMS,
  payload: data,
});

export const paginationSearch = data => ({
  type: PAGINATION_ACTIONS.SEARCH,
  payload: data,
});

export const selectStatus = data => ({
  type: PAGINATION_ACTIONS.SELECT_STATUS,
  payload: data,
});

