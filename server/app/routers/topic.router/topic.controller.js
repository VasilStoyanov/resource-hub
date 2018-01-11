const { getStatusCode } = require('./../../../utils');
const uuidv1 = require('uuid/v1');
const { Observable } = require('rxjs/Rx');
const { logErrorMessage } = require('./../../../utils');

const badRequest = getStatusCode('badRequest');

const mapTopicToViewModel = (topic) => ({
  id: topic.id,
  name: topic.name,
  thematics: topic.thematics
});

const init = (app, data) => {
  const topicContorller = Object.create(null);

  topicContorller.getTopics = () => Observable.fromPromise(data.topics.getAll())
    .switchMap(topics => Observable.from(topics)
      .map(mapTopicToViewModel))
    .toArray()
    .catch(error => logErrorMessage(error));

  topicContorller.getTopicById = (id) => (
    (id) && (typeof id === 'string') && (id.length > 0) ?
    Observable.fromPromise(data.topics.getById(id))
    .map(mapTopicToViewModel) :
    Observable.throw(new Error('Id should be valid string'))
  );

  topicContorller.create = (topic) => new Promise((resolve, reject) => {
    const id = uuidv1();
    const topicToAdd = Object.create(null);
    topicToAdd.id = id;
    Object.assign(topicToAdd, topic);

    data.topics.add(topicToAdd)
      .then(succ => resolve(succ))
      .catch(errorMessage => {
        reject({ statusCode: badRequest, errorMessage });
      });
  });

  return topicContorller;
};

module.exports = { init };
