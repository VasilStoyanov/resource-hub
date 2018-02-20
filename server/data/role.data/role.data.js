const { pipe } = require('./../../utils');
const { CRUD, exists, createUniqueFields } = require('./../factories/data.factory');
const { roleModelValidator, roleUniqueFields, ROLES_COLLECTION_NAME } = require('./../../models/role.model');

const init = async (db) => {
  try {
    const createUniqueRolesFields = createUniqueFields(db)(ROLES_COLLECTION_NAME);
    await createUniqueRolesFields(roleUniqueFields);
  } catch (dbException) {
    return Promise.reject(dbException);
  }
  const roles = pipe(
    CRUD(db)(ROLES_COLLECTION_NAME)(roleModelValidator),
    exists,
  )(Object.create(null));

  return Object.freeze({ roles });
};

module.exports = { init };
