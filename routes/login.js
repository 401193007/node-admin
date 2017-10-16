const express = require("express");
const router = express.Router();
// const stringUtils = require("../core/util/StringUtils");
const mysql = require("../core/mysql");
const menu_auth = require("../core/menu_auth");
// const common = require("../core/common");

router.get("/",function(req,res,next){
	// const user = req.session && req.session.user;
	// if(user){
	// 	res.redirect("/");
	// }
	res.render('login', {title: 'Login', msg: "请输入您的用户名和密码"});
})

router.get("/exit",function(req,res,next){

})

module.exports = router;