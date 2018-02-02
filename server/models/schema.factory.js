const createSchema = ({
  forModel: modelName => (validationRules) => {
    if (!modelName || typeof modelName !== 'string') {
      throw new Error('Invalid model name - should be string');
    }

    const schema = Object.create(null);
    const objKeys = Object.keys(validationRules);
    const callerName = modelName;

    objKeys.forEach((key) => { schema[key] = validationRules[key]; });

    Object.freeze(schema);

    return {
      get: () => {
        const schemaCpy = Object.freeze(Object.assign(Object.create(null), schema, { callerName }));

        return schemaCpy;
      },

      getRule: ruleName => Object.assign(Object.create(null), schema[ruleName]),

      getFields: () => Object.keys(schema),

      extendWithRule: (rule) => {
        if (typeof rule !== 'object') {
          throw new Error('New rule must be an object');
        }

        const extendedSchema = Object.freeze(Object.assign(Object.create(null), schema, rule));

        return extendedSchema;
      },
    };
  },
});


module.exports = createSchema;
