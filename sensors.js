fs = require('fs');

var initialized = false;
var sensorConfig;
var sensorList = [];
var sensorFile = './sensors.json';

var init = function() {
    sensorConfig = JSON.parse(fs.readFileSync(sensorFile, 'utf8'));
    sensorList = sensorConfig.SensorConfigs;
    initialized = true;
};

exports.getSensorList = function() {
    if (!initialized) init();
    return(sensorList);
};

exports.getSensorById = function(id) {
    if (!initialized) init();
    return sensorList.find(function (sensor) { return sensor.SensorId === id; });
};

exports.getSensorByName = function(name) {
    if (!initialized) init();
    return sensorList.find(function (sensor) { return sensor.SensorName === name; });
};

exports.getSensorReadingById = function(id) {
    var retVal = { 
        PublishTimestamp: '1969-12-31T00:00.000',
        SensorId: 'undefined',
        SensorName: 'undefined',
        Temperature: '-9999',
        UOM: 'C' 
    };

    var sensor = exports.getSensorById(id);
    
    if (sensor != undefined) {
        retVal ={ 
            PublishTimestamp: Date(),
            SensorId: sensor.SensorId,
            SensorName: sensor.SensorName,
            Temperature: '0',
            UOM: sensor.UOM 
        };
    }

    return retVal;
};
