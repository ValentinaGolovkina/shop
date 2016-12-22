/**
 * Created by Валентина on 05.11.2016.
 */
var Good = require('model/good').Good;
exports.get = function(req, res,next) {
    var category = req.query.category;
    console.log("Считалось category:",category);
    if((category=='Платья')||(category=='Юбки')||(category=='Брюки')||(category=='Шорты')||(category=='Джинсы')||(category=='Блузки')||(category=='Толстовки')||(category=='Футболки')||(category=='Майки')){
        Good.find({ section: 'Ж' , category:category},function(err, goods) {
            if (err) {
                console.log("ошибка считывания goodWomen");
                next(err);
            }
            else {
                console.log("Считалось goodWomen444:");
                console.log(goods.length);
                res.render('women',{goods:goods, count: goods.length})
            }
        });
    }
    else {
        Good.find({section: 'Ж'}, function (err, goods) {
            if (err) {
                console.log("ошибка считывания goodWomen");
                next(err);
            }
            else {
                console.log("Считалось goodWomen:");
                console.log(goods.length);
                res.render('women', {goods: goods, count: goods.length})
            }
        });
    }
};
