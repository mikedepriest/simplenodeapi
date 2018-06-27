var Sensors = require('../sensors.js');

var appRouter = function (app) {

    var welcomeMessage = 'pids18b20 API routes: /sensors /sensor/id/:id /sensor/name/:name /sensorreadings /sensorreading/id/:id /sensorreading/name/:name';    

    app.get("/", function (req, res) {
        res.status(200).send({ message: welcomeMessage });
    });

    app.get("/sensors", function (req, res) {
        var mySensorList = Sensors.getSensorList();      
        res.status(200).send(mySensorList);
    });

    app.get("/sensor/id/:id", function (req, res) {
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

    app.get("/sensorreading/id/:id", function (req, res) {
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

    app.get("/sensor/name/:name", function (req, res) {
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

    app.get("/sensorreading/name/:name", function (req, res) {
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
  }

module.exports = appRouter;
