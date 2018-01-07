const createSchema = (validationRules) => {
  const schema = Object.create(null);
  const objKeys = Object.keys(validationRules);

  objKeys.forEach(key => { schema[key] = validationRules[key]; });
  Object.freeze(schema);

  return {
    get: () => {
      const schemaCpy = Object.freeze(
        Object.assign(Object.create(null), schema)
      );

      return schemaCpy;
    },
    getRule: (ruleName) => Object.assign(Object.create(null), schema[ruleName]),
    extendWithRule: (rule) => {
      if (typeof rule !== 'object') {
        throw new Error('New rule must be an object');
      }

      const extendedSchema = Object.freeze(
        Object.assign(Object.create(null), schema, rule)
      );

      return extendedSchema;
    }
  };
};

module.exports = createSchema;
