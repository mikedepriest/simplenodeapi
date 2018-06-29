var Sensors = require('../sensors.js');

var appRouter = function (app) {

    var welcomeMessage = 'pids18b20 API routes: /sensors /sensors/id/:id /sensors/name/:name /sensorreadings /sensorreadings/id/:id /sensorreadings/name/:name';    

    app.get("/", function (req, res) {
        res.status(200).send({ message: welcomeMessage });
    });

    app.get("/sensors", function (req, res) {
        var mySensorList = Sensors.getSensorList();      
        res.status(200).send(mySensorList);
    });

    app.get("/sensors/id/:id", function (req, res) {
        var mysensor;
        var mysensorId = req.params.id;
        var mysensor = Sensors.getSensorById(mysensorId);

        if (mysensor != undefined)
        {
            res.status(200).send(mysensor);
        } else {
            var errorMessage = 'invalid sensor ID [' + sensorId + ']';
            res.status(400).send({ message: errorMessage });
        }
  
    });

    app.get("/sensorreadings/id/:id", function (req, res) {
        var mysensor;
        var mysensorId = req.params.id;
        var mysensor = Sensors.getSensorById(mysensorId);

        if (mysensor != undefined)
        {
            res.status(200).send(Sensors.getSensorReadingById(id));
        } else {
            var errorMessage = 'invalid sensor ID [' + sensorId + ']';
            res.status(400).send({ message: errorMessage });
        }
  
    });

    app.get("/sensors/name/:name", function (req, res) {
        var mysensor;
        var mysensorName = req.params.name;
        var mysensor = Sensors.getSensorByName(mysensorName);

        if (mysensor != undefined)
        {
            res.status(200).send(mysensor);
        } else {
            var errorMessage = 'invalid sensor name [' + mysensorName + ']';
            res.status(400).send({ message: errorMessage });
        }
  
    });

    app.get("/sensorreadings/name/:name", function (req, res) {
        var mysensor;
        var mysensorName = req.params.name;
        var mysensor = Sensors.getSensorByName(mysensorName);

        if (mysensor != undefined)
        {
            res.status(200).send(Sensors.getSensorReadingById(mysensor.SensorId));
        } else {
            var errorMessage = 'invalid sensor name [' + mysensorName + ']';
            res.status(400).send({ message: errorMessage });
        }
  
    });

    app.get("/sensorreadings", function (req, res) {
        var mySensorReadingList = Sensors.getSensorReadings();      
        res.status(200).send(mySensorReadingList);
    });
  }

module.exports = appRouter;
