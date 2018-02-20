import Validate from '../validate';

const SearchValidationModel = {
  selectedTopic: {
    required: true,
    minLength: 3,
  },
  selectedThematic: {
    required: true,
    minLength: 3,
  },
  userInput: {
    required: true,
    minLength: 3,
  },
};

export const validate = Validate(SearchValidationModel);
