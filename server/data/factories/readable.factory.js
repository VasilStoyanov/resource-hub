const { ObjectID } = require('mongodb');

const readable = db => collection => obj => ({
  ...obj,
  getAll: async () => {
    try {
      if (getByFieldName && typeof getByFieldName === 'string') {
        // TODO: Query Object
        const dbResult = await db.collection(collection).find(
          [getByFieldName]:
        )
        .toArray();

        return dbResult;
      }
      const dbResult = await db.collection(collection).find().toArray();
      return dbResult;
    } catch (dbExeption) {
      return Promise.reject(dbExeption);
    }
  },

  getByObjectId: async (id) => {
    try {
      const dbResult = await db.collection(collection).findOne({
        _id: new ObjectID(id),
      });

      return dbResult;
    } catch (dbExeption) {
      return Promise.reject(dbExeption);
    }
  },

  getOneByProperty: property => async (value) => {
    try {
      const dbResult = db.collection(collection)
        .findOne({
          [property]: value,
        });

      return dbResult;
    } catch (dbExeption) {
      return Promise.reject(dbExeption);
    }
  },

  getAllByProperty: property => value => db.collection(collection)
    .find({
      [property]: value,
    })
    .toArray(),
});

module.exports = { readable };
