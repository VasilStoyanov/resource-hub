const userRegistrationController = require('./registration.controller');
const { getStatusCode } = require('./../../../utils');

const createdStatusCode = getStatusCode('created');
const badRequestStatusCode = getStatusCode('badRequest');

const attachTo = (app, data) => {
  const controller = userRegistrationController.init(data);

  app.post('/register', async (req, res) => {
    const user = req.body;

    try {
      const createdUser = await controller.registerNewUser(user);
      res.status(createdStatusCode).json(createdUser);
    } catch ({ statusCode = badRequestStatusCode, errorMessage }) {
      res.status(statusCode).json({ errorMessage });
    }
  });
};

module.exports = { attachTo };
