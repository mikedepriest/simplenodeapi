var Sensors = require('../sensors.js');

var appRouter = function (app) {

    var welcomeMessage = {
        title: 'pids18b20 API',
        routes: 
        [
            { 
                route: '/sensors',
                description: 'List all configured sensors',
                returns: 'JSON array'
            },
            {
                route: '/sensors/id/:id',
                description: 'Provide information for a sensor by sensor ID',
                returns: 'JSON representation of sensor'
            },
            {
                route: '/sensors/name/:name',
                description: 'Provide information for a sensor by sensor name',
                returns: 'JSON representation of sensor'
            },
            {   route: '/sensorreadings',
                description: 'List sensor readings for all configured sensors',
                returns: 'JSON array of sensor readings'
            },
            {
                route: '/sensorreadings/id/:id',
                description: 'Provide sensor reading for a sensor by ID',
                returns: 'JSON representation of sensor reading'
            },
            {
                route: '/sensorreadings/name/:name',
                description: 'Provide sensor reading for a sensor by name',
                returns: 'JSON representatoin of sensor reading'
            }
        ]
    };    

    app.get("/", function (req, res) {
        res.set('Content-Type', 'application/json');
        res.status(200).json(welcomeMessage);
    });

    app.get("/sensors", function (req, res) {
        res.set('Content-Type', 'application/json');
        var mySensorList = Sensors.getSensorList();      
        res.status(200).json(mySensorList);
    });

    app.get("/sensors/id/:id", function (req, res) {
        res.set('Content-Type', 'application/json');
        var mysensor;
        var mysensorId = req.params.id;
        var mysensor = Sensors.getSensorById(mysensorId);

        if (mysensor != undefined)
        {
            res.status(200).json(mysensor);
        } else {
            var errorMessage = 'invalid sensor ID [' + sensorId + ']';
            res.status(400).json({ message: errorMessage });
        }
  
    });

    app.get("/sensorreadings/id/:id", function (req, res) {
        res.set('Content-Type', 'application/json');
        var mysensor;
        var mysensorId = req.params.id;
        var mysensor = Sensors.getSensorById(mysensorId);

        if (mysensor != undefined)
        {
            res.status(200).json(Sensors.getSensorReadingById(id));
        } else {
            var errorMessage = 'invalid sensor ID [' + sensorId + ']';
            res.status(400).json({ message: errorMessage });
        }
  
    });

    app.get("/sensors/name/:name", function (req, res) {
        res.set('Content-Type', 'application/json');
        var mysensor;
        var mysensorName = req.params.name;
        var mysensor = Sensors.getSensorByName(mysensorName);

        if (mysensor != undefined)
        {
            res.status(200).json(mysensor);
        } else {
            var errorMessage = 'invalid sensor name [' + mysensorName + ']';
            res.status(400).json({ message: errorMessage });
        }
  
    });

    app.get("/sensorreadings/name/:name", function (req, res) {
        res.set('Content-Type', 'application/json');
        var mysensor;
        var mysensorName = req.params.name;
        var mysensor = Sensors.getSensorByName(mysensorName);

        if (mysensor != undefined)
        {
            res.status(200).json(Sensors.getSensorReadingById(mysensor.SensorId));
        } else {
            var errorMessage = 'invalid sensor name [' + mysensorName + ']';
            res.status(400).json({ message: errorMessage });
        }
  
    });

    app.get("/sensorreadings", function (req, res) {
        res.set('Content-Type', 'application/json');
        var mySensorReadingList = Sensors.getSensorReadings();      
        res.status(200).json(mySensorReadingList);
    });
  }

module.exports = appRouter;
