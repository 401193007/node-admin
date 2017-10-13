const mysql = require('./mysql');
const log = require('./logger').getLogger("system");
const _ = require('lodash');

module.exports.check = function(req){
	var url = req.url;
	// log.info("requst url:", url);

	var menu_roles = req.session.menu_roles;
	var exists = false;

    if (url.indexOf('/login') == 0 || url == '/' || url == '/401' || url == '/error') {
        exists = true;
    } else {
        for (var i = 0; i < menu_roles.length; i++) {
            var menu_role = menu_roles[i];
            var menu_url = menu_role['menu_url'];
            if (menu_url != "" && url.indexOf(menu_url) == 0) {
                exists = true;
                break;
            }
        }
    }
    return exists;
}

//设置侧边栏菜单
module.exports.setMenus = function(req, user_id ){	
	// var sql = "select a.user_id,b.role_id,b.role_name,b.description,d.menu_id,d.parent_id,d.menu_name,d.menu_url,d.menu_icon from bs_user_role a LEFT JOIN bs_role b ON a.role_id =b.role_id LEFT JOIN bs_menu_role c ON b.role_id = c.role_id LEFT JOIN bs_menu d ON c.menu_id = d.menu_id where a.user_id=? GROUP BY d.menu_id ORDER BY d.parent_id ASC,d.menu_id ASC";

	// var menu_roles = await mysql.querySync(sql, user_id);  //同步执行sql语句

 //    var menus = [];
 //    var userRole = []; 

 //    var menu_active = {};	

 	var sql = "select * from bs_menu";

 	mysql.querySync(sql,"",function(error,row){
 		if(error) return console.error(error);

 	});

}
