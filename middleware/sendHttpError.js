/**
 * Created by Валентина on 13.11.2016.
 */
module.exports = function(req, res, next) {

    res.sendHttpError = function(error) {
        res.status(error.status);
        res.render("error", {error: error});
    };
    next();
};