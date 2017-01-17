/**
 * Created by Валентина on 05.11.2016.
 */
var HttpError = require('../error').HttpError;
var Good = require('model/good').Good;
exports.get = function(req, res,next) {
    var category = req.query.category;
    var section = req.query.section;
    var condition = {};
    if (section!=undefined) condition.section = section;
    if (category!=undefined) condition.category = category;
     Good.find(condition,function(err, goods) {
         if (err) { next(new HttpError(500,"Ошибка поиска товаров")); }
          else {
              res.render('goods',{goods:goods, section:section})
           }
      });
};
