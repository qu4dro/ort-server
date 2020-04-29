module.exports.locationsList = function(req, res) {
    res.render('locations-list', { title: 'LocationsList'});
};
module.exports.locationInfo = function(req, res) {
    res.render('index', { title: 'LocationInfo'});
};
module.exports.addReview = function(req, res) {
    res.render('index', { title: 'addReview'});
};