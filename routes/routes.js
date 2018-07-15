var Sensors = require('../sensors.js');

var appRouter = function (app) {

    var welcomeMessage = {
        title: 'pids18b20 API',
        routes: 
        [
            { 
                method: 'GET',
                route: '/sensors',
                description: 'List all configured sensors',
                returns: 'JSON array'
            },
            {
                method: 'GET',
                route: '/sensors/id/:id',
                description: 'Provide information for a sensor by sensor ID',
                returns: 'JSON representation of sensor'
            },
            {
                method: 'GET',
                route: '/sensors/name/:name',
                description: 'Provide information for a sensor by sensor name',
                returns: 'JSON representation of sensor'
            },
            {
                method: 'GET',
                route: '/sensorreadings',
                description: 'List sensor readings for all configured sensors',
                returns: 'JSON array of sensor readings'
            },
            {
                method: 'GET',
                route: '/sensorreadings/id/:id',
                description: 'Provide sensor reading for a sensor by ID',
                returns: 'JSON representation of sensor reading'
            },
            {
                method: 'GET',
                route: '/sensorreadings/name/:name',
                description: 'Provide sensor reading for a sensor by name',
                returns: 'JSON representation of sensor reading'
            }
        ],
        schemas:
        [
            {
                sensor:
                [
                    {
                        attribute: 'SensorId',
                        description: 'DS18B20 1Wire ID for the sensor',
                        datatype: 'string',
                        iskey: 'true'
                    },
                    {
                        attribute: 'SensorName',
                        description: 'Colloquial short name for sensor',
                        datatype: 'string',
                        iskey: 'false'
                    },
                    {
                        attribute: 'SensorDescription',
                        description: 'Descriptive name for sensor',
                        datatype: 'string',
                        iskey: 'false'
                    },
                    {
                        attribute: 'UOM',
                        description: 'Unit of measure for the sensor temperature reading (C or F)',
                        datatype: 'string',
                        iskey: 'false'
                    }
                ]
            },
            {
                sensoreading:
                [
                    {
                        attribute: 'SensorId',
                        description: 'DS18B20 1Wire ID for the sensor',
                        datatype: 'string',
                        iskey: 'true'
                    },
                    {
                        attribute: 'SensorName',
                        description: 'Colloquial short name for sensor',
                        datatype: 'string',
                        iskey: 'false'
                    },
                    {
                        attribute: 'SensorDescription',
                        description: 'Descriptive name for sensor',
                        datatype: 'string',
                        iskey: 'false'
                    },
                    {
                        attribute: 'UOM',
                        description: 'Unit of measure for the current sensor temperature reading (C or F)',
                        datatype: 'string',
                        iskey: 'false'
                    },
                    {
                        attribute: 'PublishTimestamp',
                        description: 'Timestamp of current sensor temperature reading',
                        datatype: 'string',
                        iskey: 'false'
                    },
                    {
                        attribute: 'Temperature',
                        description: 'Value of current sensor temperature reading',
                        datatype: 'float',
                        iskey: 'false'
                    }
                ]
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
