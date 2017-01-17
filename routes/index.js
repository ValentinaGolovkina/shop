module.exports = function(app) {
  app.get('/', require('./frontpage').get);
  app.get('/goods', require('./goods').get);
  app.get('/description', require('./description').get);

  app.get('/cart', require('./cart/getCart').get);
  app.get('/cart/addGood', require('./cart/addGood').add);
  app.get('/cart/deleteGood', require('./cart/deleteGood').delete);

  app.get('/order', require('./order').get);


  app.get('/login', require('./profile/login').get);
  app.post('/login', require('./profile/login').post);
  app.post('/logout', require('./profile/logout').post);
  app.get('/registration', require('./profile/registration').get);
  app.post('/registration', require('./profile/registration').post);
};
