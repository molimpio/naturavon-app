import api from './api.js'
const COLLECTION_NAME = 'pedidos'
const PEDIDO_ID = 'pedido_id'

const storage = {
    addAll: (listItens) => {
        localStorage.setItem(COLLECTION_NAME, JSON.stringify(listItens))
    },
    getAll: () => {
        const pedidos = []
        const pedidosStorage = []

        return new Promise((resolve, reject) => {
            api.getAll(COLLECTION_NAME)
                .then(querySnapshot => {
                    querySnapshot.forEach(pedido => {
                        const pedidoStorage = {
                            ...pedido.data(),
                            hash: pedido.id
                        }
                        pedidos.push(pedido.data())
                        pedidosStorage.push(pedidoStorage)
                    })
                    const pedidosSort = []
                    pedidos.sort(storage.orderListByID)                                        
                    pedidos.map(item => pedidosSort.push(storage.orderObject(item)))             
                    
                    storage.addAll(pedidosStorage)
                    resolve(pedidosSort)
                })
                .catch(error => {
                    console.error(error)
                    reject()
                })
        })
    },    
    save: (pedido) => {
        return new Promise((resolve, reject) => {
            api.save(COLLECTION_NAME, pedido)
                .then(() => {                    
                    resolve()
                })
                .catch(error => {
                    console.error(error)
                    reject()
                })
        })
    },
    getNextID: () => {
        let pedido_id = localStorage.getItem(PEDIDO_ID)        
        if (pedido_id == null) {
            localStorage.setItem(PEDIDO_ID, '1')
            pedido_id = 1            
        } else {
            pedido_id = parseInt(pedido_id) + 1            
            localStorage.setItem(PEDIDO_ID, pedido_id.toString())
        }
        return pedido_id
    },
    orderListByID: (a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    },
    orderObject: (obj) => {
        const sortObj = {
            id: obj.id,
            data: obj.data,
            revista: obj.revista,
            total: obj.total
        }          
        return sortObj
    },
    orderVendasPedido: (arrayItens) => {        
        arrayItens.sort(function(a, b) {
            if (a.cliente < b.cliente) return -1;
            if (a.cliente > b.cliente) return 1;
            return 0;
        })
        return arrayItens
    }
}

module.exports = storage