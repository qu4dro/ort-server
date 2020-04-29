module.exports.homePage = function(req, res) {
    res.render('index', { title: 'HomePage'});
};
module.exports.locationInfo = function(req, res) {
    res.render('index', { title: 'LocationInfo'});
};
module.exports.addReview = function(req, res) {
    res.render('index', { title: 'addReview'});
};