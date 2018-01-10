const { ObjectID } = require('mongodb');
const { pipe } = require('./../utils');

const creatable = (db) => (collection) => (validator) => (obj) => ({
  ...obj,
  add: async (data) => {
    const validationResult = await validator(data);
    if (!validationResult || !validationResult.isValid) {
      return Promise.reject(validationResult.message);
    }

    return new Promise((resolve, reject) => {
      db.collection(collection)
        .insertOne(data)
        .then(dbResponse => resolve({ userId: new ObjectID(dbResponse.insertedId) }))
        .catch(dbError => reject(dbError));
    });
  }
});

const readable = (db) => (collection) => (obj) => ({
  ...obj,
  getAll: () => db.collection(collection).find().toArray(),

  getById: (id) => db.collection(collection).findOne({ id }),

  getByObjectId: (id) => db.collection(collection).findOne({
    _id: new ObjectID(id)
  }),

  getOneByProperty: (property) => (value) => db.collection(collection)
    .findOne({
      [property]: value
    }),

  getAllByProperty: (property) => (value) => db.collection(collection)
    .find({
        [property]: value
    })
    .toArray()
});

const createUniqueFields = (db) => (collection) => (uniqueFields) => {
  const promiseCollection = [];

  uniqueFields.forEach(field => promiseCollection.push(
    db.collection(collection).ensureIndex({
      [field]: 1
    }, { unique: true })
  ));

  return Promise.all(promiseCollection);
};

const CRUD = (db) => (collection) => (validator) => (obj) => pipe(
  creatable(db)(collection)(validator),
  readable(db)(collection)
)(obj);

module.exports = {
  creatable,
  readable,
  CRUD,
  createUniqueFields
};
