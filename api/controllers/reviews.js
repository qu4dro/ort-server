var mongoose = require('mongoose');
var locationModel = mongoose.model('Location');

var response = function(res, status, content) {
    res.status(status);
    res.json(content);
};

//получить отзыв
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

//добавить отзыв
module.exports.addReview = function (req, res) {
    var currentLocationId = req.params.locationId;
    if (currentLocationId) {
        locationModel.findById(currentLocationId).select('reviews').exec(function(err, location) {
            if(err) {
                response(res, 400, err);
            } else {
                addReviewFromForm(req, res, location);
            }
        });
    } else {
        response(res, 404, {"message": "нужен id локации"});
    }

    // response(res, 200, {"status" : "успешно"});
};




//обновить отзыв
module.exports.updateReview = function (req, res) {
    if(!req.params.reviewId || !req.params.locationId) {
        response(res, 404, {"message":"необходимы id локации и отзыва"});
        return;
    }
    locationModel.findById(req.params.locationId).select('reviews').exec(function(err, location) {
        var currentReview;
        if (!location) {
            response(res, 404, {"message": "нет такого id"});
            return;
        } else if (err) {
            response(res, 404, err);
            return;
        }

        if(location.reviews && location.reviews.length > 0) {
            currentReview = location.reviews.id(req.params.reviewId);
            if (!currentReview) {
                response(res, 404, {"message": "нет такого id"});
            } else {
                currentReview.author = req.body.author;
                currentReview.text = req.body.text;
                currentReview.stars = req.body.stars;
                location.save(function(err, location) {
                    if (err) {
                        response(res, 404, err);
                    } else {
                        updateAndSetAvgStars(location._id);
                        response(res, 200, currentReview);
                    }
                });
            }
        } else {
            response(res, 404, {"message": "нет такого отзыва"});
        }

    });
    // response(res, 200, {"status" : "успешно"});
};


module.exports.deleteReview = function (req, res) {
    if (!req.params.reviewId || !req.params.locationId) {
        response(res, 404, {"message": "необходимы id локации и отзыва"});
        return;
    }
    locationModel.findById(req.params.locationId).select('reviews').exec(function(err, location) {
        if (!location) {
            response(res, 404, {"message": "нет id локации"});
            return;
        } else if (err) {
            response(res, 404, err);
            return;
        }

        if (location.reviews && location.reviews.length > 0) {
            if (!location.reviews.id(req.params.reviewId)) {
                response(res, 404, {"message": "нет такого id"}); 
            } else {
                location.reviews.id(req.params.reviewId).remove();
                location.save(function(err) {
                    if (err) {
                        response(res, 404, err); 
                    } else {
                        updateAndSetAvgStars(location._id);
                        response(res, 204, null);
                    }
                });
            }
        } else {
            response(res, 404, {"message": "нет такого отзыва"});
        }
    });
    // response(res, 200, {"status" : "успешно"});
};

//вспомогательные функции
//добавление нового поддокумента и его сохранение
var addReviewFromForm = function(req, res, location) {
    if(!location) {
        response(res, 404, {"message": "локация не найдена"});
    } else {
        location.review.push({
            author: req.body.author,
            text: req.body.text,
            stars: req.body.stars
        });
        location.save(function(err, location) {
            var currentReview;
            if (err) {
                response(res, 400, err);
            } else {
                updateAndSetAvgStars(location._id);
                currentReview = location.reviews[location.reviews.length - 1];
                response(res, 201, currentReview);
            }
        });
    }
};

//обновление звезд локации
var updateAndSetAvgStars = function(locationId) {
    locationModel.findById(locationId).select('stars reviews').exec(function(err, location) {
        if (!err) {
            setStars(location);
        }
    });
};

//подсчет средней оценки
var setStars = function(location) {
    var count;
    var avgStars;
    var totalStars;

    if (location.reviews && location.reviews.length > 0) {
        count = location.reviews.length;
        totalStars = 0;
        for (let i = 0; i < count; i++) {
            totalStars = totalStars + location.reviews[i].stars;
        }

        avgStars = parseInt(totalStars / count, 10);
        location.stars = avgStars;
        location.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Звезды обновлены", avgStars);
            }
        });
    }
};