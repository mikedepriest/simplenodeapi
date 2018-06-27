fs = require('fs');

var initialized = false;
var sensorConfigFile = './sensors.json';
var sensorConfig;
var sensorList = [];
var sensorDevicePath = '';
var sensorDevicePathSuffix = '';

var init = function() {
    sensorConfig = JSON.parse(fs.readFileSync(sensorConfigFile, 'utf8'));
    sensorDevicePath = sensorConfig.SensorDevicePath;
    sensorDevicePathSuffix = sensorConfig.SensorDevicePathSuffix;
    sensorList = sensorConfig.SensorConfigs;
    initialized = true;
};

var newSensor = function() {
    return {
        SensorName: 'undefined',
        SensorDescription: 'undefined',
        SensorId: 'undefined',
        UOM: 'C'
    }
};

var newSensorReading = function() {
    return {
        PublishTimestamp: '1969-12-31T00:00.000',
        SensorId: 'undefined',
        SensorName: 'undefined',
        Temperature: '-9999',
        UOM: 'C'
    };
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
    var retVal = newSensorReading();

    var sensor = exports.getSensorById(id);
    
    if (sensor != undefined) {
        var ts = new Date();
        var sensorDeviceFile = sensorDevicePath+'/'+sensor.SensorId+'/'+sensorDevicePathSuffix;
        var sensorReadingLine = fs.readFileSync(sensorDeviceFile, 'utf8');
        retVal ={ 
            PublishTimestamp: ts.toISOString(),
            SensorId: sensor.SensorId,
            SensorName: sensor.SensorName,
            Temperature: '0',
            UOM: sensor.UOM 
        };
    }

    return retVal;
};
