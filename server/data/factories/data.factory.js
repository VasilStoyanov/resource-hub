const { creatable } = require('./creatable.factory.js');
const { readable } = require('./readable.factory.js');
const { updatable } = require('./updatable.factory.js');
const { deletable } = require('./deletable.factory.js');

const { pipe } = require('./../../utils');

const createUniqueFields = db => collection => (uniqueFields) => {
  const promiseCollection = [];

  uniqueFields.forEach(field => (
    promiseCollection.push(db.collection(collection).ensureIndex({
      [field]: 1,
    }, {
      unique: true,
    }))
  ));

  return Promise.all(promiseCollection);
};

const exists = obj => ({
  ...obj,
  exists: ({ property, value }) => new Promise((resolve, reject) => {
    obj.getOneByProperty(property)(value)
      .then(object => (object ? resolve(true) : resolve(false)))
      .catch(dbError => reject(dbError));
  }),
});

const CRUD = db => collection => validator => obj => pipe(
  creatable(db)(collection)(validator),
  readable(db)(collection),
  updatable(db)(collection)(validator),
  deletable(db)(collection),
)(obj);

module.exports = {
  creatable,
  readable,
  updatable,
  deletable,
  exists,
  createUniqueFields,
  CRUD,
};
