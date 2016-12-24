module.exports = function(app) {
  app.get('/', require('./frontpage').get);
  app.get('/women', require('./women').get);
  app.get('/men', require('./men').get);
  app.get('/children', require('./children').get);
  app.get('/description', require('./description').get);
  app.get('/cart', require('./cart').get);
  app.get('/order', require('./order').get);
  app.get('/login', require('./login').get);
  app.post('/login', require('./login').post);
  app.post('/logout', require('./logout').post);
  app.get('/registration', require('./registration').get);
  app.post('/registration', require('./registration').post);
};
