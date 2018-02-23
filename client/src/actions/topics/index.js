import { TOPICS_ACTIONS } from '../../constants/TopicsConstants';

export const getTopics = () => ({
  type: TOPICS_ACTIONS.GET_ALL,
  payload: {},
});

export const getTopicsFulfilled = data => ({
  type: TOPICS_ACTIONS.GET_ALL_FULFILLED,
  payload: data,
});

export const getTopicsRejected = () => ({
  type: TOPICS_ACTIONS.GET_ALL_REJECTED,
  payload: {},
});

export const selectTopic = topic => ({
  type: TOPICS_ACTIONS.SELECT,
  payload: topic,
});

export const getTopicRequests = () => ({
  type: TOPICS_ACTIONS.GET_TOPIC_REQUESTS,
  payload: {},
});

export const getTopicRequestsFulfilled = data => ({
  type: TOPICS_ACTIONS.GET_TOPIC_REQUESTS_FULFILLED,
  payload: data,
});

export const getTopicRequestsRejected = data => ({
  type: TOPICS_ACTIONS.GET_TOPIC_REQUESTS_REJECTED,
  payload: data,
});

export const confirmRequestAction = data => ({
  type: TOPICS_ACTIONS.CONFIRM_ACTION,
  payload: data,
});

export const confirmRequestActionSuccess = data => ({
  type: TOPICS_ACTIONS.CONFIRM_ACTION_SUCCESS,
  payload: data,
});

export const confirmRequestActionFailure = data => ({
  type: TOPICS_ACTIONS.CONFIRM_ACTION_FAILURE,
  payload: data,
});
