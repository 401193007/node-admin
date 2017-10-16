var express = require("express");
var path = require("path");

var pool = require("./core/mysql").Pool;

//路由相关
var routes = require('./routes/index');  
var login = require('./routes/login');  

var app = express();

//静态资源
app.use(express.static(path.join(__dirname, 'public')));

//设置模板引擎
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

// app.use('/', routes);
app.use('/', login);

	
module.exports = app;
