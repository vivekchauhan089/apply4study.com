let config = require('../config');
let mysql = require('mysql');

let pool;

try {
    if (!pool) {
        pool = mysql.createPool(config.database);
    } else {
        console.log("Using Existing Connection Pool");
    }
} catch (e) {
    console.log("Database Connection Error");
}

function getConnection(callback) {
    // If a callback is provided, use the original callback-style function
    if (typeof callback === "function") {
        return pool.getConnection((error, tempConn) => {
            if (error) {
                console.log(`Error getting connection`);
            } else {
                console.log(`Connection acquired from pool`);
            }
            callback(error, tempConn);
            // console.log("New Connection : ", pool._freeConnections.length)
            if(pool._freeConnections.length == 0) {
                tempConn.release();
                // console.log("release Connection : ", pool._freeConnections.length)
            }
        });
    }

    // If no callback, return a Promise-based connection
    return new Promise((resolve, reject) => {
        pool.getConnection((error, tempConn) => {
            if (error) {
                console.log(`Error getting connection`);
                reject(error);
            } else {
                console.log(`Connection acquired from pool`);
                resolve(tempConn);
            }
        });
    });
}

module.exports = {getConnection};