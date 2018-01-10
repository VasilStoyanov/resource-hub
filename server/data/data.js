const userData = require('./user/users.data');
const topicsData = require('./user/topics.data');

const init = async (db) => {
  try {
    const users = await userData(db);
    const topics = await topicsData(db);
    return Promise.resolve({ users, topics });
  } catch (exeption) {
    return Promise.reject(exeption);
  }
};

module.exports = { init };
