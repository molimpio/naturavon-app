import React, { Component } from 'react'
import Container from '../../components/Container.jsx'
import PedidoForm from '../pedido/PedidoForm.jsx'
import Table from '../../components/Table.jsx'
import Loading from '../../components/Loading.jsx'
import api from '../../database/api.js'

const collectionName = 'pedidos'
const columnsTable = ['Data', 'Revista', 'Total', 'Ações']

export default class Pedido extends Component {

    constructor(props) {
        super(props)
        this.state = this.getInitialState()
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleClickPDF = this.handleClickPDF.bind(this)
        this.handleClickVendas = this.handleClickVendas.bind(this)
    }

    componentDidMount() {
        this.getPedidos()
    }

    getPedidos() {
        this.resetState()
        this.setState({ loading: true })
        const pedidos = []
        api.getAll(collectionName).then(querySnapshot => {
            querySnapshot.forEach(pedido => pedidos.push(pedido.data()))
            this.setState({ pedidos: pedidos, loading: false })            
        })
    }

    formatDate() {
        let day = new Date().getUTCDate().toString()
        let month = new Date().getUTCMonth().toString()
        let year = new Date().getUTCFullYear()
        
        if (day.length == 1) day = `0${day}`
        if (month.length == 1) month = `0${month}`        
        return `${year}-${month}-${day}`
    }

    getInitialState = () => {             
        const initialState = {
            data: this.formatDate(), revista: 'Avon', pedidos: [],
            visibleAlert: false, classeAlert: '', messageAlert: '',
            loading: false,
            actions: [ 
                { 
                    'action': 'PDF', 'icon': 'fa-file-pdf-o', 'type':'info', 'fn': this.handleClickPDF 
                },
                { 
                    'action': 'Vendas', 'icon': 'fa-credit-card-alt', 'type':'success', 'fn': this.handleClickVendas
                }  
            ] 
        }
        return initialState
    }

    resetState = () => {
        this.setState(this.getInitialState());
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleClick() {
        if (this.state.data.length < 3) {
            this.setState({
                visibleAlert: true,
                classeAlert: 'warning',
                messageAlert: 'Dados incorretos, data é obrigatório!'
            })
        } else {
            this.salvar()           
        }
    }

    salvar() {
        this.setState({ loading: true })
        
        const dataSplit = this.state.data.split('-')
        const data = `${dataSplit[2]}/${dataSplit[1]}/${dataSplit[0]}`
        const pedido = { 
            data: data,
            revista: this.state.revista.trim().toUpperCase(),
            total: 'R$ 0,00'
        }                       
        api.save(collectionName, pedido)
            .then(() => {
                this.setState({
                    visibleAlert: true,
                    classeAlert: 'success',
                    messageAlert: 'Dados cadastrados com sucesso!'
                })
                this.getPedidos()
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    loading: false,
                    visibleAlert: true,
                    classeAlert: 'warning',
                    messageAlert: 'Erro ao cadastrar dados!'
                })
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
                {this.state.loading ? 
                    <Loading message='Aguarde, carregando dados !' /> :                                    
                <Table columns={columnsTable}
                    data={this.state.pedidos} actions={this.state.actions} />
                }
            </Container>
        )
    }
}