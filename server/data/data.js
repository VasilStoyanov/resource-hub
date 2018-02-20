const userData = require('./user');
const topicsData = require('./topic');
const thematicsData = require('./thematic');
const rolesData = require('./role');

const init = async (db) => {
  try {
    const users = await userData(db);
    const topics = await topicsData(db);
    const thematics = await thematicsData(db);
    const roles = await rolesData(db);

    return {
      users,
      topics,
      thematics,
      roles,
    };
  } catch (exeption) {
    return Promise.reject(exeption);
  }
};

module.exports = { init };
