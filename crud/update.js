
const connect = require('./conn');


module.exports = function (collection, id, row) {
    return new Promise((resolve, reject) => {
        connect().then(db => {
            if (row._id !== undefined)
                delete row._id;
            db.collection(collection).updateOne({ _id: id }, row, (err, result) => {
                if (err) {
                    if (typeof reject === 'function') {
                        reject(err);
                    }
                    return;
                }
                if (typeof resolve === 'function') {
                    row._id = id;
                    resolve(row);
                }
                db.close();
            })
        })
    })
}