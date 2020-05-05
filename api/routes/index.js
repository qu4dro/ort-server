var express = require('express');
var router = express.Router();
var reviewsController = require('../controllers/reviews');
var locationsController = require('../controllers/locations')

//отзывы
router.get('/locations/:locationId/reviews/:reviewId', reviewsController.getReview);
router.post('/locations/:locationId/reviews', reviewsController.addReview);
router.put('/locations/:locationId/reviews/:reviewId', reviewsController.updateReview);
router.delete('/locations/:locationId/reviews/:reviewId', reviewsController.deleteReview);

//локации
router.get('/locations', locationsController.getListOfLocations);
router.get('/locations/:locationId', locationsController.getLocation);
router.post('/locations', locationsController.addLocations);
router.put('/locations/:locationId', locationsController.updateLocation);
router.delete('/locations/:locationId', locationsController.deleteLocation);

module.exports = router;


