import { Observable } from 'rxjs';
import { get } from '../../fakeData';
import { RESOURCES_ACTIONS, URLS } from '../../constants/ResourcesConstants';
import { searchResourcesFulfilled,
        searchResourcesRejected,
        getResourcesNamesFulfilled, 
        getResourcesNamesRejected } from '../../actions/resources';
import { createWorkerPromise } from '../../workers/index';

export const searchResourceEpic = action$ =>
  action$.ofType(RESOURCES_ACTIONS.SEARCH)
    .mergeMap(action =>
        get(`${URLS.SEARCH}`, action.payload)
        .map(response => searchResourcesFulfilled(response))
        .catch(error => Observable.of(searchResourcesRejected(error)))
    );

export const getResourcesNames = action$ =>
  action$.ofType(RESOURCES_ACTIONS.GET_NAMES)
    .flatMap(action => 
        get(`${URLS.GET_NAMES}`, {}, action.payload)
    )
    .flatMap(response => {
        //console.log(`ewdwcfev------>${response}`);
        return Observable.fromPromise(createWorkerPromise('/suggestionWorker.js', response));
    })
    .flatMap(data => {
        return Observable.fromPromise(createWorkerPromise('/topSuggestionWorker.js', { topCount: 3, userInput: 'a', data: data.c }));
    })
    .map(processedData => {
        
        console.log(`ewdwcfev------>${processedData}`);
        return getResourcesNamesFulfilled(processedData);
    })
    .catch(error =>
        Observable.of(getResourcesNamesRejected(error)));

