const { getStatusCode } = require('./../../../utils');
const uuidv1 = require('uuid/v1');
const { Observable } = require('rxjs/Rx');
const { logErrorMessage } = require('./../../../utils');
const { topicValidationSchema } = require('./../../../models/topic.model');

const TOPIC_WITH_SUCH_NAME_ALREADY_EXISTS_ERROR_MESSAGE =
  'A topic with this name already exists';

const conflictStatusCode = getStatusCode('conflict');

const topicToViewModel = (topic) => {
  const thematicsAsVM = topic.thematics.map(thematic => ({ id: thematic.thematicId }));
  return {
    id: topic.topicId,
    name: topic.name,
    thematics: thematicsAsVM
  };
};

const createTopicEntity = (topic) => {
  const topicFields = topicValidationSchema.getFields();
  const result = Object.create(null);

  topicFields.forEach(field => {
    result[field] = topic[field];
  });

  result.topicId = uuidv1();
  result.thematics = [];

  return result;
};

const init = (app, data) => {
  const topicContorller = Object.create(null);

  topicContorller.getTopics = () => Observable.fromPromise(data.topics.getAll())
    .switchMap(topics => Observable.from(topics)
      .map(topicToViewModel))
    .toArray()
    .catch(error => logErrorMessage(error));

  topicContorller.getTopicById = (id) => (
    (id) && (typeof id === 'string') && (id.length > 0) ?
    Observable.fromPromise(data.topics.getByTopicId(id))
    .map(topicToViewModel) :
    Observable.throw(new Error('Id should be valid string'))
  );

  topicContorller.create = (topic) => new Promise(async (resolve, reject) => {
    const topicEntity = createTopicEntity(topic);

    try {
      const topicWithSuchNameExists = await data.topics.exists({
        property: 'name',
        value: topicEntity.name
      });

      if (topicWithSuchNameExists) {
        return reject({
          statusCode: conflictStatusCode,
          errorMessage: TOPIC_WITH_SUCH_NAME_ALREADY_EXISTS_ERROR_MESSAGE
        });
      }

      const checkIfThematicsExistsPromises = [];
      topic.thematics.forEach(thematicName => {
        const promise = new Promise(async (res, rej) => {
          try {
            const foundedThematic = await data.thematics.getByName(thematicName);
            if (foundedThematic) {
              return res(foundedThematic.thematicId);
            }

            const thematicEntity = {
              thematicId: uuidv1(),
              name: thematicName,
              resources: []
            };

            try {
              const createdThematic = await data.thematics.create(thematicEntity);
              return res(createdThematic.thematicId);
            } catch (errorMessage) {
              return rej(errorMessage);
            }
          } catch (errorMessage) {
            return rej(errorMessage);
          }
        });

        checkIfThematicsExistsPromises.push(promise);
      }); // End forEach

      Promise.all(checkIfThematicsExistsPromises)
        .then(thematicsForCurrentTopic => {
          thematicsForCurrentTopic.forEach(thematicId => {
            topicEntity.thematics.push({ thematicId });
          });

          data.topics.create(topicEntity)
            .then(createdTopic => resolve(topicToViewModel(createdTopic)))
            .catch((errorMessage) => reject({ errorMessage }));
        })
        .catch(errorMessage => reject({ errorMessage }));
    } catch (errorMessage) {
      return reject({ errorMessage });
    }
  }); // End create

  return topicContorller;
};

module.exports = { init };
