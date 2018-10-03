import api from './api.js'
const COLLECTION_NAME = 'vendas'
const VENDA_ID = 'venda_id'

const storage = {
    addAll: (listItens) => {
        localStorage.setItem(COLLECTION_NAME, JSON.stringify(listItens))
    },
    getAll: () => {
        const vendas = []
        const vendasStorage = []

        return new Promise((resolve, reject) => {
            api.getAll(COLLECTION_NAME)
                .then(querySnapshot => {
                    querySnapshot.forEach(venda => {
                        const vendaStorage = {
                            ...venda.data(),
                            hash: venda.id
                        }
                        vendas.push(venda.data())
                        vendasStorage.push(vendaStorage)
                    })
                    const vendasSort = []
                    vendas.sort(storage.orderListByID)
                    vendas.map(item => vendasSort.push(storage.orderObject(item)))
                    storage.addAll(vendasSort)
                    resolve(vendasSort)
                })
                .catch(error => {
                    console.error(error)
                    reject()
                })
        })
    },
    getNextID: () => {
        let venda_id = localStorage.getItem(VENDA_ID)        
        if (venda_id == null) {
            localStorage.setItem(VENDA_ID, '1')
            venda_id = 1            
        } else {
            venda_id = parseInt(venda_id) + 1            
            localStorage.setItem(VENDA_ID, venda_id.toString())
        }
        return venda_id
    },
    orderListByID: (a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    },
    orderObject: (obj) => {
        const sortObj = {
            id: obj.id,
            cliente: obj.cliente,
            codProduto: obj.codProduto,
            nomeProduto: obj.nomeProduto,
            pagProduto: obj.pagProduto,
            qtdeProduto: obj.qtdeProduto,
            valorProduto: obj.valorProduto,
            descontoProduto: obj.descontoProduto,
            totalProduto: obj.totalProduto
        }          
        return sortObj
    }
}

module.exports = storage