import { Observable } from 'rxjs';
import { URLS, TOPICS_ACTIONS } from '../../constants/TopicsConstants';
import { getTopicsFulfilled, getTopicsRejected } from '../../actions/topics/getTopics';
import { get } from '../../fakeData';


export const getTopicsEpic = action$ =>
  action$.ofType(TOPICS_ACTIONS.GET_ALL)
    .mergeMap(action =>
      get(`${URLS.GET_ALL}`, action.payload)
        .map(response => getTopicsFulfilled(response))
        .catch(error => Observable.of(getTopicsRejected(error)))
    );
