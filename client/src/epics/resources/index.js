import { Observable } from 'rxjs';
import { get } from '../../fakeData';
import { RESOURCES_ACTIONS, URLS } from '../../constants/ResourcesConstants';
import { searchResourcesFulfilled,
  searchResourcesRejected,
  getResourcesNamesFulfilled,
  getResourcesNamesRejected,
  searchInputChangeFulfilled } from '../../actions/resources';
import { createWorkerPromise } from '../../workers/index';

export const searchResourceEpic = action$ =>
  action$.ofType(RESOURCES_ACTIONS.SEARCH)
    .mergeMap(action =>
      get(`${URLS.SEARCH}`, action.payload)
        .map(response => searchResourcesFulfilled(response))
        .catch(error => Observable.of(searchResourcesRejected(error))));

export const getResourcesNames = action$ =>
  action$.ofType(RESOURCES_ACTIONS.GET_NAMES)
    .flatMap(action =>
      get(`${URLS.GET_NAMES}`, {}, action.payload))
    .flatMap(response => Observable.fromPromise(createWorkerPromise('/suggestionWorker.js', response)))
    .map(processedData => getResourcesNamesFulfilled(processedData))
    .catch(error =>
      Observable.of(getResourcesNamesRejected(error)));


export const searchInputChange = action$ =>
  action$.ofType(RESOURCES_ACTIONS.USER_INPUT_CHANGED)
    .pluck('payload')
    .debounceTime(500)
    .distinctUntilChanged((p1, p2) => p1.userInput === p2.userInput)
    .filter(payload => payload)
    .filter(({ topCount, userInput, resources }) => topCount
                    && userInput
                    && userInput.length > 0
                    && resources
                    && Array.isArray(resources[userInput[0]]))
    .switchMap(({ topCount, userInput, resources }) =>
      Observable.fromPromise(createWorkerPromise('/topSuggestionWorker.js', {
        topCount,
        userInput,
        data: resources[userInput[0]],
      })))
    .map(processedData => searchInputChangeFulfilled(processedData));
