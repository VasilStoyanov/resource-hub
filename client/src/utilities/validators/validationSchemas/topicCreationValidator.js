import Validate from '../validate';

const TopicCreationValidationModel = {
  topic: {
    required: true,
    minLength: 3,
  },
  image: {
    matchRegex: /^(ftp|http|https):\/\/[^ "]+$/,
  },
  thematics: {
    unique: ['name', 'image'],
    name: {
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    image: {
      matchRegex: /^(ftp|http|https):\/\/[^ "]+$/,
    },
  },
};

export const validate = Validate(TopicCreationValidationModel);
