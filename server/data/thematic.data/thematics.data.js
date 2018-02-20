const THEMATIC_COLLECTION_NAME = 'thematics';

const { pipe } = require('./../../utils');
const { CRUD, createUniqueFields, exists } = require('./../factories/data.factory');
const {
  thematicModelValidator,
  thematicUniqueFields,
} = require('./../../models/thematic.model/thematic.model');

const findThematicById = obj => ({
  ...obj,
  getByThematicId: thematicId => obj.getOneByProperty('thematicId')(thematicId),
});

const findThematicByName = obj => ({
  ...obj,
  getByName: thematicName => obj.getOneByProperty('name')(thematicName),
});

const init = async (db) => {
  const createUniqueThematicFields = createUniqueFields(db)(THEMATIC_COLLECTION_NAME);

  try {
    await createUniqueThematicFields(thematicUniqueFields);
  } catch (ex) {
    return Promise.reject(ex);
  }

  const thematicsData = pipe(
    CRUD(db)(THEMATIC_COLLECTION_NAME)(thematicModelValidator),
    findThematicById,
    findThematicByName,
    exists,
  )(Object.create(null));

  return Promise.resolve({
    thematics: thematicsData,
  });
};

module.exports = { init };
