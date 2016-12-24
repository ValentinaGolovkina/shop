/**
 * Created by Валентина on 05.11.2016.
 */
var HttpError = require('../error').HttpError;
var Good = require('model/good').Good;
exports.get = function(req, res,next) {
    var category = req.query.category;
    if((category=='Платья')||(category=='Юбки')||(category=='Брюки')||(category=='Шорты')||(category=='Джинсы')||(category=='Блузки')||(category=='Толстовки')||(category=='Футболки')||(category=='Майки')){
        Good.find({ section: 'Ж' , category:category},function(err, goods) {
            if (err) { next(new HttpError(500,"Ошибка поиска товаров в БД в секции 'Ж' категории:"+category)); }
            else {
                res.render('women',{goods:goods, count: goods.length})
            }
        });
    }
    else {
        Good.find({section: 'Ж'}, function (err, goods) {
            if (err) { next(new HttpError(500,"Ошибка поиска товаров в БД в секции 'Ж'")); }
            else { res.render('women', {goods: goods, count: goods.length}) }
        });
    }
};
