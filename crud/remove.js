
const connect = require('./conn');


module.exports = function (collection, id) {
    return new Promise((resolve, reject) => {
        connect().then(db => {
            db.collection(collection).deleteOne({ _id: id }, (err, result) => {
                if (err) {
                    if (typeof reject === 'function') {
                        reject(err);
                    }
                    return;
                }
                if (typeof resolve === 'function') {
                    resolve({status: 'OK'});
                }
                db.close();
            })
        })
    })
}