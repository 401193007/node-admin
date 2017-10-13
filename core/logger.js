var log4js = require('log4js');
var commonUtil = require('./util/commonUtil');

//配置
log4js.configure(commonUtil.getConfigPath() + '/log4js.json');

exports.getLogger = function(category){
    return log4js.getLogger(category);
};