const homeController = require('./home.controller');

const attachTo = (app, data) => {
  homeController.init(data);

  const people = [{
    name: 'Pesho',
    age: 32
  }, {
    name: 'Gosho',
    age: 66
  }];

  app.get('/api/home', (req, res) => {
    res.send(JSON.stringify(people));
  });
};

module.exports = { attachTo };
