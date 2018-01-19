const homeController = require('./home.controller');

const attachTo = (app, data) => {
  homeController.init(data);

  app.get('/api/home', (req, res) => {
    res.sendStatus(200);
  });
};

module.exports = { attachTo };
