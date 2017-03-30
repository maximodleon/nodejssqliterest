var express = require('express'),
app = express(),
port = process.env.PORT || 3000;
bodyParser = require('body-parser');
var sqlite = require('./api/models/model.js');
sqlite.create_db();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/routes.js');
routes(app);

app.listen(port);

console.log('todo list restful api server started on:' + port)