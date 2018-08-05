var cors = require('cors');
var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

routes(app);

var server = app.listen(5001, function () {
    console.log("app running on port.", server.address().port);
});



