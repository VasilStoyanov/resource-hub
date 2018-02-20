const TOPIC_COLLECTION_NAME = 'topics';

const { pipe } = require('./../../utils');
const {
  topicModelValidator,
  topicUniqueFields,
} = require('./../../models/topic.model/topic.model');

const { CRUD, createUniqueFields, exists } = require('./../factories/data.factory');

const findTopicById = obj => ({
  ...obj,
  getByTopicId: id => obj.getOneByProperty('topicId')(id),
});

const findTopicByName = obj => ({
  ...obj,
  getByName: topicName => obj.getOneByProperty('name')(topicName),
});

const init = async (db) => {
  const createdUniqueTopicFields = createUniqueFields(db)(TOPIC_COLLECTION_NAME);

  try {
    await createdUniqueTopicFields(topicUniqueFields);
  } catch (ex) {
    return Promise.reject(ex);
  }

  const topics = pipe(
    CRUD(db)(TOPIC_COLLECTION_NAME)(topicModelValidator),
    findTopicById,
    findTopicByName,
    exists,
  )(Object.create(null));

  return Object.freeze({ topics });
};

module.exports = { init };
