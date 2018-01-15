const TOPIC_COLLECTION_NAME = 'topics';

const { pipe } = require('./../../utils');
const {
  topicModelValidator,
  topicUniqueFields
} = require('./../../models/topic.model/topic.model');

const { CRUD, createUniqueFields } = require('./../data.factory');

const findTopicById = (obj) => ({
  ...obj,
  getByTopicId: (id) => obj.getOneByProperty('topicId')(id)
});

const findTopicByName = (obj) => ({
  ...obj,
  getByName: (topicName) => obj.getOneByProperty('name')(topicName)
});

const topicsData = async (db) => {
  const createdUniqueTopicFields = createUniqueFields(db)(TOPIC_COLLECTION_NAME);

  try {
    await createdUniqueTopicFields(topicUniqueFields);
  } catch (ex) {
    return Promise.reject(ex);
  }

  return Promise.resolve(pipe(
    CRUD(db)(TOPIC_COLLECTION_NAME)(topicModelValidator),
    findTopicById,
    findTopicByName
  )(Object.create(null)));
};

module.exports = topicsData;
