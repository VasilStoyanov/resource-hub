import { toast } from 'react-toastify';
import { TOPICS_ACTIONS, MESSAGES } from '../constants/TopicsConstants';

const initialState = {
    topics: [{
        id: '',
        name: ''
    }]
};

//<img id="ItemPreview" src="" /> 
// document.getElementById("ItemPreview").src = "data:image/png;base64," + YourByte;

export default (state = initialState, action) => {
    switch (action.type) {
        case TOPICS_ACTIONS.GET_ALL_FULFILLED: {
            return {
                topics: action.payload
            };
        }
        case TOPICS_ACTIONS.GET_ALL_REJECTED: {
            toast(action.payload.error || MESSAGES.GET_ALL_FAILED, { className: 'red-toast' });
            
            return {
                ...initialState
            };
        }
        case TOPICS_ACTIONS.ADD_FULFILLED: {
            toast(action.payload.error || MESSAGES.ADD_SUCCESS, { className: 'green-toast' });
            
            return {
                ...state
            };
        }
        case TOPICS_ACTIONS.ADD_REJECTED: {
            toast(action.payload.error || MESSAGES.GET_ALL_FAILED, { className: 'red-toast' });
            
            return {
                ...state
            };
        }
        default: {
            return {
                ...state
            };
        }
    }
};
