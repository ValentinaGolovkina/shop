/**
 * Created by Валентина on 05.11.2016.
 */
var HttpError = require('../error').HttpError;
var Good = require('model/good').Good;
exports.get = function(req, res,next) {
    var category = req.query.category;
    if((category=='Пиджаки')||(category=='Рубашки')||(category=='Брюки')||(category=='Шорты')||(category=='Джинсы')||(category=='Толстовки')||(category=='Футболки')||(category=='Майки')){
        Good.find({ section: 'М' , category:category},function(err, goods) {
            if (err) { next(new HttpError(500,"Ошибка поиска товаров в БД в секции 'M' категории:"+category)); }
            else { res.render('men',{goods:goods, count: goods.length}) }
        });
    }
    else {
        Good.find({section: 'М'}, function (err, goods) {
            if (err) { next(new HttpError(500,"Ошибка поиска товаров в БД в секции 'M'")); }
            else { res.render('men', {goods: goods, count: goods.length}) }
        });
    }
};
