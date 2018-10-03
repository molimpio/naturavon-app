import api from './api.js'
const COLLECTION_NAME = 'produtos'

const storage = {
    getAll: () => {
        const produtos = []
        return new Promise((resolve, reject) => {
            api.getAll(COLLECTION_NAME)
                .then(querySnapshot => {
                    querySnapshot.forEach(produto => produtos.push(produto.data()))
                    resolve(produtos)
                })
                .catch(error => {
                    console.error(error)
                    reject()
                })
        })       
    },
    addItem: (produto) => {        
        const collection = JSON.parse(localStorage.getItem(COLLECTION_NAME))
        if (collection == null) {
            const produtosCollection = []
            produtosCollection.push(produto.cod)
            localStorage.setItem(COLLECTION_NAME, JSON.stringify(produtosCollection))            
        } else {
            const codigoExists = collection.filter(function(cod) {
                return cod == produto.cod
            })
            
            if (codigoExists.length == 0) {                
                collection.push(produto.cod)
                localStorage.setItem(COLLECTION_NAME, JSON.stringify(collection))                
                api.save(COLLECTION_NAME, produto)
                return true                
            }
        }       
    }
}

module.exports = storage