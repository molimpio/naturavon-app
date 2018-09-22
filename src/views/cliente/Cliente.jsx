import React, { Component } from 'react'
import Container from '../../components/Container.jsx'
import ClienteForm from '../cliente/ClienteForm.jsx'
import Table from '../../components/Table.jsx'

const columnsTable = ['ID', 'Nome', 'Referência', 'Email', 'Telefone', 'Ações']
const clientes = []

export default class Cliente extends Component {    

    constructor(props) {
        super(props)
        this.state = this.getInitialState()
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleEditar = this.handleEditar.bind(this) 
        this.handleExcluir = this.handleExcluir.bind(this)
    }   
    
    getInitialState = () => {
        const initialState = {
            id: '', nome: '', referencia: '', email: '', telefone: '', 
            clientes: [], visibleAlert: false, classeAlert: '', messageAlert: '',
            actions: [
                {
                    'action': ' Editar', 'icon': 'fa-pencil', 'type':'primary', 'fn': this.handleEditar
                },
                {
                    'action': ' Excluir', 'icon': 'fa-remove', 'type':'danger', 'fn': this.handleExcluir
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
        if (this.state.nome.length < 3 || this.state.referencia.length < 3) {
            this.setState({ 
                visibleAlert: true,
                classeAlert: 'warning',
                messageAlert: 'Dados incorretos, nome e referência são obrigatórios!'
            })            
        } else {
            if(this.state.id == '') this.salvar()
            else if(this.state.id != '') this.atualizar()
        }
    }

    salvar() {
        const cliente = {
            id: Math.random().toFixed(2),
            nome: this.state.nome,
            referencia: this.state.referencia,
            email: this.state.email,
            telefone: this.state.telefone
        }        
        clientes.push(cliente)        
        this.resetState()
        this.setState({ clientes: clientes })        
    }

    atualizar() {
        console.log('atualizar', this.state)
    }

    handleEditar(cliente) {    
        const clienteId = cliente.id
        const clienteSearch = clientes.filter((c) => c.id == clienteId)        
        
        this.setState({
            id: clienteSearch[0].id,
            nome: clienteSearch[0].nome,
            telefone: clienteSearch[0].telefone,
            referencia: clienteSearch[0].referencia,
            email: clienteSearch[0].email 
        })

    }

    handleExcluir(cliente) {
        console.log(cliente)
    }

    render() {
        return (
            <Container title="Clientes">
                <ClienteForm data={this.state} 
                    handleChange={this.handleChange}
                    handleClick={this.handleClick} />
                <Table columns={columnsTable}
                    data={this.state.clientes} actions={this.state.actions} />
            </Container>
        )
    }
}