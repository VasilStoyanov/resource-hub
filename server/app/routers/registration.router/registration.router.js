const userRegistrationController = require('./registration.controller');
const { getStatusCode } = require('./../../../utils');

const createdStatusCode = getStatusCode('created');
const badRequestStatusCode = getStatusCode('badRequest');

const attachTo = (app, data) => {
  const controller = userRegistrationController.init(data);

  app.post('/register', async (req, res) => {
    const user = req.body;

    try {
      await controller.registerNewUser(user);
      res.sendStatus(createdStatusCode);
    } catch (errorMessage) {
      res.status(badRequestStatusCode).json({ errorMessage });
    }
  });
};

module.exports = { attachTo };
