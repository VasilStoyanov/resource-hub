import { URLS } from '../../constants/TopicsConstants';
import { get } from '../../fakeData/data';

const getTopics = () => ({
        type: 'GET_ALL_TOPICS',
        payload: get(URLS.GET_ALL)
    });

export default getTopics;
