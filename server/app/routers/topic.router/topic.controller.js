/* eslint-disable prefer-promise-reject-errors */

const { getStatusCode } = require('./../../../utils');
const uuidv1 = require('uuid/v1');
const { Observable } = require('rxjs/Rx');
const { logErrorMessage } = require('./../../../utils');
const { topicValidationSchema } = require('./../../../models/topic.model');
const { thematicValidationSchema } = require('./../../../models/thematic.model');
const { validateTopic } = require('./topic.validation');

const TOPIC_WITH_SUCH_NAME_ALREADY_EXISTS_ERROR_MESSAGE =
  'A topic with this name already exists';

const conflictStatusCode = getStatusCode('conflict');

const topicFields = topicValidationSchema.getFields();
const thematicFields = thematicValidationSchema.getFields();

const topicToViewModel = (topic) => {
  const thematicsAsVM = topic.thematics.map(thematic => ({ id: thematic.thematicId }));
  return {
    id: topic.topicId,
    name: topic.name,
    thematics: thematicsAsVM,
  };
};

const createTopicEntity = (topic) => {
  const result = Object.create(null);

  topicFields.forEach((field) => {
    result[field] = topic[field];
  });

  result.topicId = uuidv1();
  result.thematics = [];

  return result;
};

const createThematicEntity = (thematic) => {
  const thematicId = uuidv1();
  const resources = [];
  const creationDateTimestamp = Date.now();

  const result = thematicFields.reduce((acc, curr) => {
    if (!thematic[curr]) {
      return acc;
    }

    const thematicProperty = {
      [curr]: thematic[curr],
    };

    return Object.assign(acc, thematicProperty);
  }, {
    thematicId,
    resources,
    creationDateTimestamp,
  });

  return result;
};

const init = (app, data) => {
  const topicContorller = Object.create(null);

  topicContorller.getTopics = () => Observable.fromPromise(data.topics.getAll())
    .switchMap(topics => Observable.from(topics)
      .map(topicToViewModel))
    .toArray()
    .catch(error => logErrorMessage(error));

  topicContorller.getTopicById = id => (
    (id) && (typeof id === 'string') && (id.length > 0) ?
      Observable.fromPromise(data.topics.getByTopicId(id))
        .map(topicToViewModel) :
      Observable.throw(new Error('Id should be valid string'))
  );

  topicContorller.create = topic => new Promise(async (resolve, reject) => {
    const validationResult = validateTopic(topic);
    if (!validationResult.isValid) {
      return reject({ errorMessage: validationResult.message });
    }

    const topicEntity = createTopicEntity(topic);

    try {
      const topicWithSuchNameExists = await data.topics.exists({
        property: 'name',
        value: topicEntity.name,
      });

      if (topicWithSuchNameExists) {
        return reject({
          statusCode: conflictStatusCode,
          errorMessage: TOPIC_WITH_SUCH_NAME_ALREADY_EXISTS_ERROR_MESSAGE,
        });
      }

      const checkIfThematicsExistsPromises = [];
      topic.thematics.forEach((thematicName) => {
        const promise = new Promise(async (res) => {
          const foundedThematic = await data.thematics.getByName(thematicName);
          if (foundedThematic) {
            return res(foundedThematic.thematicId);
          }

          const thematicEntity = createThematicEntity({ name: thematicName });

          const createdThematic = await data.thematics.create(thematicEntity);
          return res(createdThematic.thematicId);
        });

        checkIfThematicsExistsPromises.push(promise);
      }); // End forEach

      const thematicsForCurrentTopic = await Promise.all(checkIfThematicsExistsPromises);
      thematicsForCurrentTopic.forEach((thematicId) => {
        topicEntity.thematics.push({ thematicId });
      });

      const createdTopic = await data.topics.create(topicEntity);
      return resolve(topicToViewModel(createdTopic));
    } catch (errorMessage) {
      return reject({ errorMessage });
    }
  }); // End create

  return topicContorller;
};

module.exports = { init };
