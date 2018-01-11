const THEMATIC_COLLECTION_NAME = 'thematics';

const { pipe } = require('./../../utils');
const { CRUD, createUniqueFields } = require('./../data.factory');
const {
  thematicModelValidator,
  thematicUniqueFields
} = require('./../../models/thematic.model/thematic.model');

const thematicData = async (db) => {
  const createUniqueThematicFields = createUniqueFields(db)(THEMATIC_COLLECTION_NAME);

  try {
    await createUniqueThematicFields(thematicUniqueFields);
  } catch (ex) {
    return Promise.reject(ex);
  }

  return Promise.resolve(pipe(
    CRUD(db)(THEMATIC_COLLECTION_NAME)(thematicModelValidator),
  )(Object.create(null)));
};

module.exports = thematicData;
