import { Observable } from 'rxjs';
import { get } from '../../fakeData';
import { RESOURCES_ACTIONS, URLS } from '../../constants/ResourcesConstants';
import { searchResourcesFulfilled,
        searchResourcesRejected,
        getResourcesNamesFulfilled, 
        getResourcesNamesRejected } from '../../actions/resources';

export const searchResourceEpic = action$ =>
  action$.ofType(RESOURCES_ACTIONS.SEARCH)
    .mergeMap(action =>
        get(`${URLS.SEARCH}`, action.payload)
        .map(response => searchResourcesFulfilled(response))
        .catch(error => Observable.of(searchResourcesRejected(error)))
    );

export const getResourcesNames = action$ =>
  action$.ofType(RESOURCES_ACTIONS.GET_NAMES)
    .mergeMap(action =>
        get(`${URLS.GET_NAMES}`, {}, action.payload)
        .map(response => getResourcesNamesFulfilled(response))
        .catch(error => Observable.of(getResourcesNamesRejected(error)))
    );

