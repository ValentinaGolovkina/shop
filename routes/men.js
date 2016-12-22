/**
 * Created by Валентина on 05.11.2016.
 */
var Good = require('model/good').Good;
exports.get = function(req, res,next) {
    var category = req.query.category;
    console.log("Считалось category:",category);
    if((category=='Пиджаки')||(category=='Рубашки')||(category=='Брюки')||(category=='Шорты')||(category=='Джинсы')||(category=='Толстовки')||(category=='Футболки')||(category=='Майки')){
        Good.find({ section: 'М' , category:category},function(err, goods) {
            if (err) {
                console.log("ошибка считывания goodMen");
                next(err);
            }
            else {
                console.log("Считалось goodMen444:");
                console.log(goods.length);
                res.render('men',{goods:goods, count: goods.length})
            }
        });
    }
    else {
        Good.find({section: 'М'}, function (err, goods) {
            if (err) {
                console.log("ошибка считывания goodMen");
                next(err);
            }
            else {
                console.log("Считалось goodMen:");
                console.log(goods.length);
                res.render('men', {goods: goods, count: goods.length})
            }
        });
    }
};
