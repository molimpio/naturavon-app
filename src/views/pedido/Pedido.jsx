import React, { Component } from 'react'
import Container from '../../components/Container.jsx'
import PedidoForm from '../pedido/PedidoForm.jsx'
import Table from '../../components/Table.jsx'
import Loading from '../../components/Loading.jsx'
import storagePedido from '../../database/storagePedido'
import constantes from '../../constants.js'

const columnsTable = ['ID', 'Data', 'Revista', 'Total', 'Ações']

export default class Pedido extends Component {

    constructor(props) {
        super(props)
        this.state = this.initialState()
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleClickPDF = this.handleClickPDF.bind(this)
        this.handleClickVendas = this.handleClickVendas.bind(this)
    }

    componentDidMount() {
        storagePedido.getAll()
            .then(pedidos => this.setState({ pedidos }))
            .catch(() => this.setState({ visibleAlert: true, codigoAlert: constantes.ALERT_ERROR_DB }) )
    }    

    initialState() {             
        return {
            data: this.formatDate(), revista: 'Avon', 
            pedidos: [], visibleAlert: false, codigoAlert: 0, loading: false,                                  
            actions: [ 
                { 
                    'action': 'PDF', 'icon': 'fa-file-pdf-o', 'type':'info', 'fn': this.handleClickPDF 
                },
                { 
                    'action': 'Vendas', 'icon': 'fa-credit-card-alt', 'type':'success', 'fn': this.handleClickVendas
                }  
            ] 
        }        
    }

    formatDate() {
        let day = new Date().getUTCDate().toString()
        let month = new Date().getUTCMonth().toString()
        let year = new Date().getUTCFullYear()
        
        if (day.length == 1) day = `0${day}`
        if (month.length == 1) month = `0${month}`        
        return `${year}-${month}-${day}`
    }
    

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleClick() {
        if (this.state.data.length < 3) 
            this.setState({ visibleAlert: true, codigoAlert: constantes.ALERT_ERROR })        
        else this.save()
    }

    save() {
        this.setState({ loading: true })
        
        const dataSplit = this.state.data.split('-')
        const data = `${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}`
        const pedido = { 
            id: storagePedido.getNextID(),
            data: data,
            revista: this.state.revista.trim().toUpperCase(),
            total: 'R$ 0,00'
        }                       
        
        storagePedido.save(pedido)
            .then(() => {
                const pedidos = [...this.state.pedidos]
                pedidos.push(pedido)
                this.setState({                     
                    pedidos, data: this.formatDate(), revista: 'Avon',
                    visibleAlert: true, codigoAlert: constantes.ALERT_SUCCESS,
                    loading: false
                })
                .catch(() => 
                this.setState({ 
                    visibleAlert: true, loading: false,
                    codigoAlert: constantes.ALERT_ERROR_DB_INSERT 
                }))
            })
    }

    handleClickPDF(pedido) {
        console.log('gerar pdf ', pedido)
    }

    handleClickVendas(pedido) {
        console.log('vendas ', pedido)
    }

    render() {
        return (
            <Container title="Pedidos">
                <PedidoForm data={this.state}
                    handleChange={this.handleChange}
                    handleClick={this.handleClick} />
                {this.state.loading ? <Loading /> : null }                                   
                <Table columns={columnsTable}
                    data={this.state.pedidos} 
                    actions={this.state.actions} />                
            </Container>
        )
    }
}