var Sensors = require('../sensors.js');

var appRouter = function (app) {

    var welcomeMessage = {
        title: 'pids18b20 API',
        routes: 
        [
            { 
                route: '/v1/api',
                description: 'List API calls',
                returns: 'JSON array'
            },
            { 
                route: '/v1/sensors',
                description: 'List all configured sensors',
                returns: 'JSON array'
            },
            {
                route: '/v1/sensors/id/:id',
                description: 'Provide information for a sensor by sensor ID',
                returns: 'JSON representation of sensor'
            },
            {
                route: '/v1/sensors/name/:name',
                description: 'Provide information for a sensor by sensor name',
                returns: 'JSON representation of sensor'
            },
            {   route: '/v1/sensorreadings',
                description: 'List sensor readings for all configured sensors',
                returns: 'JSON array of sensor readings'
            },
            {
                route: '/v1/sensorreadings/id/:id',
                description: 'Provide sensor reading for a sensor by ID',
                returns: 'JSON representation of sensor reading'
            },
            {
                route: '/v1/sensorreadings/name/:name',
                description: 'Provide sensor reading for a sensor by name',
                returns: 'JSON representation of sensor reading'
            }
        ]
    };    

    // Human readable API listing
    app.get("/", function (req, res) {
        var output = 
            '<h1>Temperature Sensor API</h1>'
            +'<p>Version 1</p>'
            +'<pre><code>'
            +JSON.stringify(welcomeMessage,null,4)
            +'</code></pre>';

        res.set('Content-Type', 'text/html');
        res.status(200).send(output);
    });

    // Machine readable API listing
    app.get("/v1/api", function (req, res) {
        res.set('Content-Type', 'application/json');
        res.status(200).json({message: welcomeMessage});
    });

    app.get("/v1/sensors", function (req, res) {
        res.set('Content-Type', 'application/json');
        var mySensorList = Sensors.getSensorList();      
        res.status(200).json({sensorList: mySensorList});
    });

    app.get("/v1/sensors/id/:id", function (req, res) {
        res.set('Content-Type', 'application/json');
        var mysensor;
        var mysensorId = req.params.id;
        var mysensor = Sensors.getSensorById(mysensorId);

        if (mysensor != undefined)
        {
            res.status(200).json({sensor: mysensor});
        } else {
            var errorMessage = 'invalid sensor ID [' + sensorId + ']';
            res.status(400).json({ message: errorMessage });
        }
  
    });

    app.get("/v1/sensorreadings/id/:id", function (req, res) {
        res.set('Content-Type', 'application/json');
        var mysensor;
        var mysensorId = req.params.id;
        var mysensor = Sensors.getSensorById(mysensorId);

        if (mysensor != undefined)
        {
            res.status(200).json({sensorreadings: Sensors.getSensorReadingById(id)});
        } else {
            var errorMessage = 'invalid sensor ID [' + sensorId + ']';
            res.status(400).json({ message: errorMessage });
        }
  
    });

    app.get("/v1/sensors/name/:name", function (req, res) {
        res.set('Content-Type', 'application/json');
        var mysensor;
        var mysensorName = req.params.name;
        var mysensor = Sensors.getSensorByName(mysensorName);

        if (mysensor != undefined)
        {
            res.status(200).json({sensor: mysensor});
        } else {
            var errorMessage = 'invalid sensor name [' + mysensorName + ']';
            res.status(400).json({ message: errorMessage });
        }
  
    });

    app.get("/v1/sensorreadings/name/:name", function (req, res) {
        res.set('Content-Type', 'application/json');
        var mysensor;
        var mysensorName = req.params.name;
        var mysensor = Sensors.getSensorByName(mysensorName);

        if (mysensor != undefined)
        {
            res.status(200).json({sensor: Sensors.getSensorReadingById(mysensor.SensorId)});
        } else {
            var errorMessage = 'invalid sensor name [' + mysensorName + ']';
            res.status(400).json({ message: errorMessage });
        }
  
    });

    app.get("/v1/sensorreadings", function (req, res) {
        res.set('Content-Type', 'application/json');
        var mySensorReadingList = Sensors.getSensorReadings();      
        res.status(200).json({sensorreadings: mySensorReadingList});
    });
  }

module.exports = appRouter;
