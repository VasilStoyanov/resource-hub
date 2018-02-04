const { ObjectID } = require('mongodb');
const { pipe } = require('./../utils');

const creatable = db => collection => validator => obj => ({
  ...obj,
  create: async (data) => {
    const validationResult = await validator.validateModel(data);
    if (!validationResult || !validationResult.isValid) {
      return Promise.reject(validationResult.message);
    }

    return new Promise((resolve, reject) => {
      db.collection(collection)
        .insertOne(data)
        .then(dbResponse => resolve(dbResponse.ops[0]))
        .catch(dbError => reject(dbError));
    });
  },
});

const readable = db => collection => obj => ({
  ...obj,
  getAll: () => db.collection(collection).find().toArray(),

  getByObjectId: id => db.collection(collection).findOne({
    _id: new ObjectID(id),
  }),

  getOneByProperty: property => value => db.collection(collection)
    .findOne({
      [property]: value,
    }),

  getAllByProperty: property => value => db.collection(collection)
    .find({
      [property]: value,
    })
    .toArray(),
});

const updatable = db => collection => validator => obj => ({
  ...obj,
  updateOneByProperty: ({ findByProperty, match }) => async ({ propertyToUpdate, newValue }) => {
    const validationResult = await validator.validateObject({ [propertyToUpdate]: newValue });
    if (!validationResult || !validationResult.isValid) {
      return Promise.reject(validationResult.message);
    }

    try {
      const dbResponse = await db.collection(collection)
        .updateOne({ [findByProperty]: match }, {
          $set: { [propertyToUpdate]: newValue },
        });

      return dbResponse;
    } catch (ex) {
      return Promise.reject(ex);
    }
  },
});

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
)(obj);

module.exports = {
  creatable,
  readable,
  updatable,
  exists,
  createUniqueFields,
  CRUD,
};
