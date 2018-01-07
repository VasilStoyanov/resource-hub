const userRegistrationController = require('./user.registration.controller');

const attachTo = (app, data) => {
  const controller = userRegistrationController.init(data);

  app.post('/register', async (req, res) => {
    const user = req.body;

    try {
      const userId = await controller.registerNewUser(user);
      console.log(userId);
      res.send('<a href="/">Go home</a>');
    } catch (exeption) {
      res.send(exeption);
    }
  });
};

module.exports = { attachTo };
