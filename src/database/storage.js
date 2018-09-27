import api from './api.js'
const collectionName = 'produtos'

const storage = {
    createCollection: () => {
        const collection = localStorage.getItem(collectionName)
        if (collection == null) {
            localStorage.setItem(collectionName, '[]')
            return true
        }
    },
    getCount: () => {
        const collection = localStorage.getItem(collectionName)
        return JSON.parse(collection).length
    },
    addItem: (produto) => {        
        const collection = JSON.parse(localStorage.getItem(collectionName))
        
        if(collection.length == 0) {
            collection.push(produto.cod)
            localStorage.setItem(collectionName, JSON.stringify(collection))
        } else {            
            const codigoExists = collection.filter(function(cod) {
                return cod == produto.cod
            })
            
            if (codigoExists.length == 0) {                
                collection.push(produto.cod)
                localStorage.setItem(collectionName, JSON.stringify(collection))                
                api.save("produtos", produto)
                return true                
            }
        }        
    }
}

module.exports = storage