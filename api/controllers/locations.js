var mongoose = require('mongoose');
var locationModel = mongoose.model('Location');

var geoOptions = {
    spherical: true,
    num: 10
};



module.exports.getListOfLocations = function (req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    //var maxDistance = parseFloat(req.query.maxDistance);
    var point = {
      type: "Point",
      coordinates: [lng, lat]
    };
    console.log('point: ' + point)
    var geoOptions = {
      spherical: true,
      maxDistance: theEarth.getRadsFromDistance(20),
      num: 10
    };
    console.log('geoOptions: ' + geoOptions);
    if ((!lng && lng!==0) || (!lat && lat!==0)) {
      console.log('locationsListByDistance missing params');
      response(res, 404, {"message": "указаны не все параметры"});
      return;
    } else {
      console.log('locationsListByDistance running...');
      locationModel.aggregate(
        [{
          '$geoNear': {
            'near': point,
            'spherical': true,
            'distanceField': 'dist.calculated',
            // 'maxDistance': maxDistance
          }
        }],
        function(err, results) {
          if (err) {
            response(res, 404, err);
          } else {
            locations = buildLocationList(req, res, results);
            response(res, 200, locations);
          }
        }
      )
    }; 
};



//получить локацию
module.exports.getLocation = function (req, res) {
    if (req.params && req.params.locationId) {
        locationModel.findById(req.params.locationId).exec(function(err, location) {
            // response(res, 200, location);
            if (!location) {
                response(res, 404, {"message": "локация с таким id не найдена"});
                console.log("404 location with current id is not found");
                return;
            } else if (err) {
                response(res, 404, err);
                console.log("404" + err);
                return;
            }
            response(res, 200, location);
            console.log("200 ok");
        });
    } else {
        response(res, 404, {"message": "запрос не содержит id локации"});
        console.log("404 request without id")
    }
};

module.exports.addLocations = function (req, res) {
    locationModel.create({
        name: req.body.name,
        address: req.body.address,
        services: req.body.services,
        coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        workingTime: [{
            days: req.body.daysWeekDays,
            openTime: req.body.openTimeWeekDays,
            closeTime: req.body.closeTimeWeekDays,
            isClosed: req.body.isClosedWeekDays
        }, {
            days: req.body.daysWeekend,
            openTime: req.body.openTimeWeekend,
            closeTime: req.body.closeTimeWeekend,
            isClosed: req.body.isClosedWeekend
        }]

    }, function(err, location) {
        if (err) {
            response(res, 400, err);
        } else {
            response(res, 201, location);
        }
    });
    // response(res, 200, {"status" : "успешно"});
};
module.exports.updateLocation = function (req, res) {
    response(res, 200, {"status" : "успешно"});
};
module.exports.deleteLocation = function (req, res) {
    response(res, 200, {"status" : "успешно"});
};





var theEarth = (function(){
    var earthRadius = 6371;

    var getDistanceFromRads = function(rads) {
        return parseFloat(rads * earthRadius);
    };

    var getRadsFromDistance = function(distance) {
        return parseFloat(distance / earthRadius);
    };

    return {
        getDistanceFromRads : getDistanceFromRads,
        getRadsFromDistance : getRadsFromDistance
    };
})();

var buildLocationList = function(req, res, results) {
    console.log('buildLocationList:');
    var locations = [];
    results.forEach(function(doc) {
        locations.push({
          distance: doc.dist.calculated,
          name: doc.name,
          address: doc.address,
          stars: doc.stars,
          services: doc.services,
          _id: doc._id
        });
    });
    return locations;
  };

var response = function(res, status, content) {
    res.status(status);
    res.json(content);
};