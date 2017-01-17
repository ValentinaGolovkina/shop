/**
 * Created by Валентина on 13.11.2016.
 */
exports.post = function(req, res) {
    req.session.destroy();
    res.redirect('/');
};