const userData = require('./user/users.data');
const topicsData = require('./topic/topics.data');
const thematicsData = require('./thematic/thematic.data');

const init = async (db) => {
  try {
    const users = await userData(db);
    const topics = await topicsData(db);
    const thematics = await thematicsData(db);

    return Promise.resolve({
      users,
      topics,
      thematics
    });
  } catch (exeption) {
    return Promise.reject(exeption);
  }
};

module.exports = { init };
