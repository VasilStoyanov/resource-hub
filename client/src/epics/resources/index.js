import { Observable } from 'rxjs';
import { get } from '../../data';
import { searchResourcesFulfilled, searchResourcesRejected } from '../../actions/resources/search';
import { RESOURCES_ACTIONS, URLS } from '../../constants/ResourcesConstants';

export const searchResourceEpic = action$ =>
  action$.ofType(RESOURCES_ACTIONS.SEARCH)
    .mergeMap(action =>
        get(`${URLS.SEARCH}`,
            { userInput: action.payload.userInput },
            { thematicId: action.payload.thematicId,
            topicId: action.payload.topicId }
        )
        .map(response => searchResourcesFulfilled(response))
        .catch(error => Observable.of(searchResourcesRejected(error)))
    );

