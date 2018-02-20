import Validate from '../validate';

const TopicCreationValidationModel = {
  topic: {
    required: true,
    minLength: 3,
  },
  thematics: {
    unique: ['thematic'],
    thematic: {
      required: true,
      minLength: 3,
    },
  },
};

export const validate = Validate(TopicCreationValidationModel);
