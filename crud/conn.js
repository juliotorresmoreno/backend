
const mongo = require('mongodb');
const url = "mongodb://localhost:27017/backend";
const MongoClient = require('mongodb').MongoClient;

const connect = function () {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                if (typeof reject === 'function') {
                    reject(err);
                }
                return;
            }
            if (typeof resolve === 'function') {
                resolve(db);
            }
        });
    })
}

module.exports = connect;