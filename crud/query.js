
const connect = require('./conn');


module.exports = function (collection) {
    return new Promise((resolve, reject) => {
        connect().then((db) => {
            db.collection(collection).find({}).toArray((err, result) => {
                if (err) {
                    if (typeof reject === 'function') {
                        reject(err);
                    }
                    return;
                }
                if (typeof resolve === 'function') {
                    resolve(result);
                }
                db.close();
            })
        })
    })
}