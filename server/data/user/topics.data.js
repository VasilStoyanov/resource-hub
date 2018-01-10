const TOPIC_COLLECTION_NAME = 'topics';

const { pipe } = require('./../../utils');
const {
  topicModelValidator,
  topicUniqueFields
} = require('./../../models/topic.model/topic.model');

const { CRUD, createUniqueFields } = require('./../data.factory');

const topicsData = async (db) => {
  const createdUniqueUserFields = createUniqueFields(db)(TOPIC_COLLECTION_NAME);

  try {
    await createdUniqueUserFields(topicUniqueFields);
  } catch (ex) {
    return Promise.reject(ex);
  }

  return Promise.resolve(pipe(
    CRUD(db)(TOPIC_COLLECTION_NAME)(topicModelValidator),
  )(Object.create(null)));
};

module.exports = topicsData;
