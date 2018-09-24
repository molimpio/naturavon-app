import db from './db.js'

const api = {
    getAll: (collection) => db.collection(collection).get(),
    save: (collection, objData) => db.collection(collection).doc().set(objData)
}

module.exports = api