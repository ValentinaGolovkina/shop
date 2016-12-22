var Good = require('model/good').Good;
exports.get = function(req, res,next) {
    console.log("GET ");
    var goodname = req.query.goodname;
    console.log("Считалось goodname:",goodname);
    if(goodname!=undefined) {
        Good.findOne({goodname: goodname}, function (err, good) {
            if (err) {
                console.log("ошибка считывания description");
                next(err);
            }
            else {
                console.log("Считалось descriptionOK:");
                console.log(good);
                res.render('description', {good: good})
            }
        });
    }
    else{
        var size = req.query.size;
        console.log("Считалось size:", size);
        console.log("Текущий пользователь:", req.query.userEmail);
        console.log("Выбраный товар:", req.query.goodname);
        //console.log("w", req.query.w);
        if(size!=undefined) {

            res.status(200);
            res.end();
        }
        else {
            res.status(401);
            res.end();
        }
    }
};