var express = require("express");
var router = express.Router();

//--可以删除
const menu = require("../core/menu_auth");
const _ = require('lodash');

/*获取首页模板*/
router.get('/', function (req, res, next) {
	menu.getMenus(req,"20").then(function(results){
        var menu_roles = results;
        var menus = [];
        var userRole = [];
        var menu_active = {};
        if (menu_roles.length){
            for (var i = 0; i < menu_roles.length; i++){
                var menuRoleObj = menu_roles[i];
                var parent_id = menuRoleObj['parent_id'];
                if (_.indexOf(userRole, menuRoleObj['role_id']) == -1) {
                    userRole.push(menuRoleObj['role_id']);
                }
                if(parent_id == 0){
                    var menuObj = {};
                    menuObj['parent_id'] = parent_id;
                    menuObj['menu_id'] = menuRoleObj['menu_id'];
                    menuObj['menu_name'] = menuRoleObj['menu_name'];
                    menuObj['menu_url'] = menuRoleObj['menu_url'];
                    menuObj['menu_icon'] = menuRoleObj['menu_icon'];
                    menuObj['menu_child'] = [];
                    menus.push(menuObj);
                    menu_active[menuRoleObj['menu_url']] = {}                        
                }else{
                	for(var j=0;j<menus.length;j++){
                		var menuObj = menus[j];
                		var pid = menuObj['menu_id'];
                		if(pid == parent_id){
                			var childObj = {}, 
                				menu_id = menuRoleObj['menu_id'], 
                				menu_url = menuRoleObj['menu_url'];
	                        childObj['menu_id'] = menu_id;
	                        childObj['parent_id'] = menuRoleObj['parent_id'];
	                        childObj['menu_name'] = menuRoleObj['menu_name'];
	                        childObj['menu_url'] = menu_url;
	                        childObj['menu_icon'] = menuRoleObj['menu_icon'];
	                        menuObj['menu_child'].push(childObj);
	                        menu_active[menu_url] = {parent_id: parent_id, menu_id: menu_id}                				
                		}
                	}
                }
            }

		    res.render('index', {
		        title: '首页',
		        menus : menus,
		    });
        }
    }).catch(function(err){
        console.log(err);
    });
});

module.exports = router;