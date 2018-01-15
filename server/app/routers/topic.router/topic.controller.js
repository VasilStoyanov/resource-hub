const { getStatusCode } = require('./../../../utils');
const uuidv1 = require('uuid/v1');
const { Observable } = require('rxjs/Rx');
const { logErrorMessage } = require('./../../../utils');
const { topicValidationSchema } = require('./../../../models/topic.model');

const topicAlreadyExistsErrorMessage = 'A topic with this name already exists';

const DB_ERROR_MESSAGE =
  'There was a problem processing your request. Please check all fields and retry.';

const badRequestStatusCode = getStatusCode('badRequest');
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

  topicContorller.create = (topic) => new Promise((resolve, reject) => {
    const topicEntity = createTopicEntity(topic);

    data.topics.getByName(topicEntity.name)
      .then(topicExists => {
        if (topicExists) {
          return reject({
            statusCode: conflictStatusCode,
            errorMessage: topicAlreadyExistsErrorMessage
          });
        }

        const checkIfThematicsExistsPromises = [];
        topic.thematics.forEach(thematic => {
          const promise = new Promise((res, rej) => {
            data.thematics.getByName(thematic)
              .then(foundedTematic => {
                if (!foundedTematic) {
                  const tematicEntity = {
                    thematicId: uuidv1(),
                    name: thematic,
                    resources: []
                  };

                  data.thematics.add(tematicEntity)
                    .then((createdTematic) => {
                      res(createdTematic.thematicId);
                    })
                    .catch(dbError => rej(dbError));

                  return;
                }

                res(foundedTematic.thematicId);
              })
              .catch((errorMessage) => rej(errorMessage));
          }); // End promise

          checkIfThematicsExistsPromises.push(promise);
        }); // End forEach

        Promise.all(checkIfThematicsExistsPromises)
          .then(thematicsForCurrentTopic => {
            thematicsForCurrentTopic.forEach(thematicId => {
              topicEntity.thematics.push({ thematicId });
            });

            data.topics.add(topicEntity)
              .then(createdTopic => {
                resolve(topicToViewModel(createdTopic));
              })
              .catch((dbError) => {
                reject({
                  statusCode: badRequestStatusCode,
                  errorMessage: dbError
                });
              });
          })
          .catch(error => {
            console.error(error);
            reject({
              statusCode: badRequestStatusCode,
              errorMessage: DB_ERROR_MESSAGE
            });
          });
      })
      .catch((dbError) => {
        console.error(dbError);
        reject({
          statusCode: badRequestStatusCode,
          errorMessage: DB_ERROR_MESSAGE
        });
      });
  }); // End create

  return topicContorller;
};

module.exports = { init };
