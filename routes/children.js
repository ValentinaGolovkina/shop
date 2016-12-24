/**
 * Created by Валентина on 05.11.2016.
 */
var HttpError = require('../error').HttpError;
var Good = require('model/good').Good;
exports.get = function(req, res,next) {
    var category = req.query.category;
    if((category=='Платья')||(category=='Рубашки')||(category=='Брюки')||(category=='Юбки')||(category=='Толстовки')||(category=='Футболки')||(category=='Майки')){
        Good.find({ section: 'Д' , category:category},function(err, goods) {
            if (err)  { next(new HttpError(500,"Ошибка поиска товаров в БД в секции 'Д' категории:"+category)); }
            else { res.render('children',{goods:goods, count: goods.length}) }
        });
    }
    else {
        Good.find({section: 'Д'}, function (err, goods) {
            if (err)  { next(new HttpError(500,"Ошибка поиска товаров в БД в секции 'Д' ")); }
            else { res.render('children', {goods: goods, count: goods.length}) }
        });
    }
};
