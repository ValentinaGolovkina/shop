/**
 * Created by Валентина on 05.11.2016.
 */
var Good = require('model/good').Good;
exports.get = function(req, res,next) {
    var category = req.query.category;
    console.log("Считалось category:",category);
    if((category=='Платья')||(category=='Рубашки')||(category=='Брюки')||(category=='Юбки')||(category=='Толстовки')||(category=='Футболки')||(category=='Майки')){
        Good.find({ section: 'Д' , category:category},function(err, goods) {
            if (err) {
                console.log("ошибка считывания goodChildren");
                next(err);
            }
            else {
                console.log("Считалось goodChildren444:");
                console.log(goods.length);
                res.render('children',{goods:goods, count: goods.length})
            }
        });
    }
    else {
        Good.find({section: 'Д'}, function (err, goods) {
            if (err) {
                console.log("ошибка считывания goodChildren");
                next(err);
            }
            else {
                console.log("Считалось goodChildren:");
                console.log(goods.length);
                res.render('children', {goods: goods, count: goods.length})
            }
        });
    }
};
