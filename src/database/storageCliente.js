import api from './api.js'
const COLLECTION_NAME = 'clientes'
const CLIENTE_ID = 'cliente_id'

const storage = {
    addAll: (listItens) => {
        localStorage.setItem(COLLECTION_NAME, JSON.stringify(listItens))
    },
    getAll: () => {
        const clientes = []
        const clientesStorage = []

        return new Promise((resolve, reject) => {
            api.getAll(COLLECTION_NAME)
                .then(querySnapshot => {
                    querySnapshot.forEach(cliente => {
                        const clienteStorage = {
                            ...cliente.data(),
                            hash: cliente.id
                        }
                        clientes.push(cliente.data())
                        clientesStorage.push(clienteStorage)
                    })
                    const clientesSort = []
                    clientes.sort(storage.orderListByID)                                        
                    clientes.map(item => clientesSort.push(storage.orderObject(item)))                    
                    storage.addAll(clientesStorage)
                    resolve(clientesSort)
                })
                .catch(error => {
                    console.error(error)
                    reject()
                })
        })
    },    
    save: (cliente) => {
        return new Promise((resolve, reject) => {
            api.save(COLLECTION_NAME, cliente)
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
        let cliente_id = localStorage.getItem(CLIENTE_ID)        
        if (cliente_id == null) {
            localStorage.setItem(CLIENTE_ID, '1')
            cliente_id = 1            
        } else {
            cliente_id = parseInt(cliente_id) + 1            
            localStorage.setItem(CLIENTE_ID, cliente_id.toString())
        }        
        return cliente_id
    },
    orderListByID: (a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    },
    orderObject: (obj) => {
        const sortObj = {
            id: obj.id,
            nome: obj.nome,
            referencia: obj.referencia,
            telefone: obj.telefone,
            email: obj.email
        }          
        return sortObj
    }
}

module.exports = storage