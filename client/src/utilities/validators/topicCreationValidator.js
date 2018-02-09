import Validate from './validate';

const TopicCreationValidationModel = {
    name: {
        required: true,
        minLength: 3
    },
    thematics: {
        validateArray: {  
            required: true,
            minLength: 3,  
        }
    }
};

export const validate = Validate(TopicCreationValidationModel);
