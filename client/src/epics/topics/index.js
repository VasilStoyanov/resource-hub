import { Observable } from 'rxjs';
import { URLS, TOPICS_ACTIONS } from '../../constants/TopicsConstants';
import { get } from '../../fakeData';
import { put, post, del } from '../../data';
import { getTopicsFulfilled,
  getTopicsRejected,
  getTopicRequestsFulfilled,
  getTopicRequestsRejected,
  confirmRequestActionSuccess,
  confirmRequestActionFailure } from '../../actions/topics';
import { getItems } from '../../actions/pagination/';

const approveTopicRequestAjax = {
  approve: post,
  dissaprove: put,
  delete: del,
};

export const getTopicsEpic = action$ =>
  action$.ofType(TOPICS_ACTIONS.GET_ALL)
    .mergeMap(action =>
      get(`${URLS.GET_ALL}`, action.payload)
        .map(response => getTopicsFulfilled(response))
        .catch(error => Observable.of(getTopicsRejected(error))));

export const getTopicRequestsEpic = action$ =>
  action$.ofType(TOPICS_ACTIONS.GET_TOPIC_REQUESTS)
    .mergeMap(action =>
      get(`${URLS.GET_REQUESTS}`, action.payload)
        .map((response) => { getTopicRequestsFulfilled(response); return response; })
        .map(response => getItems({ name: 'requests', items: response }))
        .catch(error => Observable.of(getTopicRequestsRejected(error))));

export const approveTopicRequest = action$ =>
  action$.ofType(TOPICS_ACTIONS.CONFIRM_ACTION)
    .pluck('payload')
    .mergeMap(payload =>
      approveTopicRequestAjax[payload.actionType](URLS.APPROVE_REQUEST, payload.data)
        .map((response) => { confirmRequestActionSuccess(response); return response; })
        .catch(error => Observable.of(confirmRequestActionFailure(error))));
