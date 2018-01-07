const userData = require('./user/users.data');

const init = async (db) => {
  try {
    const users = await userData(db);
    return Promise.resolve({ users });
  } catch (exeption) {
    return Promise.reject(exeption);
  }
};

module.exports = { init };
