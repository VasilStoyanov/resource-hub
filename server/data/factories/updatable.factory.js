const updatable = db => collection => validator => obj => ({
  ...obj,
  updateOneByProperty: async ({
    findByProperty, match, propertyToUpdate, newValue,
  }) => {
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

module.exports = { updatable };
