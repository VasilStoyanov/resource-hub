import Validate from './validate';

const ERROR_MESSAGES = {
  TOPIC_REQUIRED: 'You have to select a correct topic!',
  THEMATIC_REQUIRED: 'You have to select a correct thematic!',
  RESOURCE_IS_REQUIRED: 'Resource has to he atleast 3 symbols long.',
};


const SEARCH_VALUES_VALIDATIONS = {
  selectedTopic: (value) => {
    if (!value || typeof value !== 'string') {
      return ERROR_MESSAGES.TOPIC_REQUIRED;
    }
  },
  selectedThematic: (value) => {
    if (!value || typeof value !== 'string') {
      return ERROR_MESSAGES.THEMATIC_REQUIRED;
    }
  },
  userInput: (value) => {
    if (!value || typeof value !== 'string' || value.length <= 3) {
      return ERROR_MESSAGES.RESOURCE_IS_REQUIRED;
    }
  },
};

export const validate = Validate(SEARCH_VALUES_VALIDATIONS);
