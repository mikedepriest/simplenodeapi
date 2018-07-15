fs = require('fs');

var initialized = false;
var testSensorDeviceFile = './testSensorDeviceFile';
var sensorConfigFile = './sensors.json';
var sensorConfig;
var sensorList = [];
var sensorDevicePath = '';
var sensorDevicePathSuffix = '';
var sensorMode = '';

var init = function() {
    sensorConfig = JSON.parse(fs.readFileSync(sensorConfigFile, 'utf8'));
    sensorDevicePath = sensorConfig.SensorDevicePath;
    sensorDevicePathSuffix = sensorConfig.SensorDevicePathSuffix;
    sensorMode = sensorConfig.Mode;
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
        SensorDescription: 'undefined',
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
        var sensorDeviceFile = '';
        if (sensorMode==='Test') {
            sensorDeviceFile = testSensorDeviceFile;
        } else {
            sensorDeviceFile = sensorDevicePath+'/'+sensor.SensorId+'/'+sensorDevicePathSuffix;
        }

        var sensorReadingLine = new String();
        sensorReadingLine = fs.readFileSync(sensorDeviceFile, 'utf8');
        if (sensorReadingLine.includes('YES')) {
            // The reading file looks like this:
            //     85 01 4b 46 7f ff 0c 10 31 : crc=31 YES\r\n85 01 4b 46 7f ff 0c 10 31 t=24312
            // The part we care about is the t=nnnnn, where nnnnn is temperature
            // in 1000's of C (e.g. t=24312 is 24.312 C)
            
            // Eliminate any embedded linefeeds
            sensorReadingLine.replace('\r','');
            sensorReadingLine.replace('\n','');
            // Split across '=' and take the third one as the reading
            var readingArray = sensorReadingLine.split('=');
            var reading = readingArray[2] / 1000;
            // If the sensor UOM is F, convert
            if (sensor.UOM==='F') {
                reading = (1.8 * reading) + 32.0;
            }
        }
        retVal ={ 
            PublishTimestamp: ts.toISOString(),
            SensorId: sensor.SensorId,
            SensorName: sensor.SensorName,
            SensorDescription: sensor.SensorDescription,
            Temperature: reading,
            UOM: sensor.UOM 
        };
    }
    return retVal;
};

exports.getSensorReadings = function() {
    var retVal = [];
    if (!initialized) init();
    sensorList.forEach(element => {
        retVal.push(exports.getSensorReadingById(element.SensorId));
    });
    return retVal;
};
