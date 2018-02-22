import { Observable } from 'rxjs';
import { URLS, TOPICS_ACTIONS } from '../../constants/TopicsConstants';
import { get } from '../../fakeData';
import { getTopicsFulfilled,
  getTopicsRejected,
  getTopicRequestsFulfilled,
  getTopicRequestsRejected } from '../../actions/topics';
import { getItems } from '../../actions/pagination/';


export const getTopicsEpic = action$ =>
  action$.ofType(TOPICS_ACTIONS.GET_ALL)
    .mergeMap(action =>
      get(`${URLS.GET_ALL}`, action.payload)
        .do(response => getTopicsFulfilled(response))
        .catch(error => Observable.of(getTopicsRejected(error))));

export const getTopicRequestsEpic = action$ =>
  action$.ofType(TOPICS_ACTIONS.GET_TOPIC_REQUESTS)
    .mergeMap(action =>
      get(`${URLS.GET_PENDING}`, action.payload)
        .map((response) => { getTopicRequestsFulfilled(response); return response; })
        .map(response => getItems({ name: 'requests', items: response }))
        .catch(error => Observable.of(getTopicRequestsRejected(error))));
