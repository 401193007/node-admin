var express = require("express");
var router = express.Router();

//--可以删除
var menu = require("../core/menu_auth");
menu.setMenus();

/*获取首页模板*/
router.get('/', function (req, res, next) {
    res.render('index', {
        title: '首页'
    });
});

module.exports = router;