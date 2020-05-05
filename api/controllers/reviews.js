var mongoose = require('mongoose');
var locationModel = mongoose.model('Location');

var response = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.getReview = function (req, res) {
    if (req.params.reviewId && req.params && req.params.locationId) {
        locationModel.findById(req.params.locationId).select('name reviews').exec(function(err, location) {
            var currentResponse, currentReview;
            if (!location) {
                response(res, 404, {"message": "локация с таким id не найдена"});
                console.log("404 location with current id is not found");
                return;
            } else if (err) {
                response(res, 404, err);
                console.log("404" + err);
                return;
            }

            if (location.reviews && location.reviews.length > 0) {
                currentReview = location.reviews;
                if (!currentReview) {
                    response(res, 404, {"message": 'отзыв с таким id не найден'});
                } else {
                    currentResponse = {
                        location: {
                            name: location.name,
                            id: req.params.locationId
                        },
                        review: currentReview
                    };
                    response(res, 200, currentResponse);
                }
            } else {
                response(res, 404, {"message": "отзыв не найден"});
            }
            // response(res, 200, location);
            // console.log("200 ok");
        });
    } else {
        response(res, 404, {"message": "запрос не содержит id локации и id отзыва"});
        console.log("404 request without locationId and reviewId");
    }
};
module.exports.addReview = function (req, res) {
    response(res, 200, {"status" : "успешно"});
};
module.exports.updateReview = function (req, res) {
    response(res, 200, {"status" : "успешно"});
};
module.exports.deleteReview = function (req, res) {
    response(res, 200, {"status" : "успешно"});
};