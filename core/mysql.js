const mysql = require('mysql');
const commonUtil = require('./util/commonUtil');
//获取mysql配置
const config = require(commonUtil.getConfigPath() + "/db_config").mysql;
//获取日志文件
const logger = require("./logger").getLogger("system");

// logger.info("mysql config ", JSON.stringify(config));


const pool = mysql.createPool(config);

//连接
pool.on('connection', (err,connection) => {
    //logger.info("connection!");
    console.log("数据库连接上了！！！");
});

pool.on('enqueue', () => {
    //logger.info('Waiting for available connection slot');
});

module.exports.Pool = pool;

//连接后的回调
module.exports.getConnection = cb => {
    pool.getConnection(function (err, connection) {
        cb(err, connection);
    });	
}

/**
 * 执行SQL语句
 * @param sql mysql语句
 * @param values 操作的值
 * @param cb 操作后的回调
 */
module.exports.query = (sql, values, cb) => {
    pool.getConnection((err, connection) => {
        if (err) {
            cb(err);
        } else {
            connection.query(sql, values, (error, rows) => {
                cb(error, rows);
            });
            connection.release();
        }
    });
};

module.exports.beginTransaction = (connection, cb) => {
    connection.beginTransaction(function (err) {
        if (err) {
            throw err;
        }
        cb(null, connection);
    });
};

module.exports.rollback = (connection, cb) => {
    connection.rollback(function () {
        cb && cb();
    });
};

module.exports.commit = (connection, cb) => {
    connection.commit(function (err) {
        if (err) {
            connection.rollback(function () {
                cb && cb(err);
                throw err;
            });
        }
        connection.release();
        cb && cb();
    });
};

//检查是否链接失败
this.getConnection((err, connection) => {
    if (err) throw err;
    else {
        logger.info("connected success!");
        connection.release();
    }
});

module.exports.querySync = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (error, rows) => {
                    if (error)
                        reject(error);
                    else
                        resolve(rows);
                });
                //释放连接
                connection.release();
            }
        });
    });
};

module.exports.getConnectionSync = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
};

module.exports.beginTransactionSync = (connection) => {
    return new Promise((resolve, reject) => {
        connection.beginTransaction(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
};

/**
 * 带事务
 * @param sql
 * @param values
 * @returns {Promise}
 */
module.exports.querySync2 = (connection, sql, values) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, rows) => {
            if (error)
                reject(error);
            else
                resolve(rows);
        });
    });
};
module.exports.rollbackSync = (connection) => {
    return new Promise((resolve, reject) => {
        connection.rollback(function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
        connection.release();
    });
};
module.exports.commitSync = (connection) => {
    return new Promise((resolve, reject) => {
        connection.commit(function (err) {
            if (err) {
                connection.rollback(function () {
                    reject(err);
                });
            }
            connection.release();
            resolve();
        });
    });
};