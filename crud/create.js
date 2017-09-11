
const connect = require('./conn');


module.exports = function (collection, row) {
    return new Promise((resolve, reject) => {
        connect().then((db) => {
            db.collection(collection).insertOne(row, (err, result) => {
                if (err) {
                    if (typeof reject === 'function') {
                        reject(err);
                    }
                    return;
                }
                if (typeof resolve === 'function') {
                    resolve(result.ops[0]);
                }
                db.close();
            })
        })
    })
}