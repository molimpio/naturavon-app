import api from './api.js'
const COLLECTION_NAME = 'campanhas'
const CAMPANHA_ID = 'campanha_id'

const storage = {
    addAll: (listItens) => {
        localStorage.setItem(COLLECTION_NAME, JSON.stringify(listItens))
    },
    getAll: () => {
        const campanhas = []
        const campanhasStorage = []

        return new Promise((resolve, reject) => {
            api.getAll(COLLECTION_NAME)
                .then(querySnapshot => {
                    querySnapshot.forEach(campanha => {
                        const campanhaStorage = {
                            ...campanha.data(),
                            hash: campanha.id
                        }
                        campanhas.push(campanha.data())
                        campanhasStorage.push(campanhaStorage)
                    })
                    const campanhasSort = []
                    campanhas.sort(storage.orderListByID)                                        
                    campanhas.map(item => campanhasSort.push(storage.orderObject(item)))                                 
                    storage.addAll(campanhasStorage)
                    resolve(campanhasSort)
                })
                .catch(error => {
                    console.error(error)
                    reject()
                })
        })
    },    
    save: (campanha) => {
        return new Promise((resolve, reject) => {
            api.save(COLLECTION_NAME, campanha)
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
        let campanha_id = localStorage.getItem(CAMPANHA_ID)        
        if (campanha_id == null) {
            localStorage.setItem(CAMPANHA_ID, '1')
            campanha_id = 1            
        } else {
            campanha_id = parseInt(campanha_id) + 1            
            localStorage.setItem(CAMPANHA_ID, campanha_id.toString())
        }
        return campanha_id
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
            ano: obj.ano
        }          
        return sortObj
    }
}

module.exports = storage