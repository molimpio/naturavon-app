import React, { Component } from 'react'
import Container from '../../components/Container.jsx'
import ClienteForm from '../cliente/ClienteForm.jsx'
import Table from '../../components/Table.jsx'
import Loading from '../../components/Loading.jsx'
import storageCliente from '../../database/storageCliente'
import constantes from '../../constants.js'

const columnsTable = ['ID', 'Nome', 'Referencia', 'Telefone', 'Email']

export default class Cliente extends Component {

    constructor(props) {
        super(props)
        this.state = this.initialState()
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount() {
        storageCliente.getAll()
            .then(clientes => this.setState({ clientes: clientes }))
            .catch(() => this.setState({ visibleAlert: true, codigoAlert: constantes.ALERT_ERROR_DB }) )
    }

    initialState() {
        return {
            nome: '', referencia: '', email: '', telefone: '',
            clientes: [], visibleAlert: false, codigoAlert: 0, loading: false                      
        }
    }

    handleChange(event) {                
        this.setState({ [event.target.name]: event.target.value })
    }

    handleClick() {
        const { nome, referencia } = this.state
        if (nome.length < 3 || referencia.length < 3) 
            this.setState({ visibleAlert: true, codigoAlert: constantes.ALERT_ERROR })        
        else this.save()
    }

    save() {                
        this.setState({ loading: true })
        const { nome, referencia, email, telefone } = this.state
        const cliente = {
            id: storageCliente.getNextID(),
            nome: nome.trim().toUpperCase(),
            referencia: referencia.trim().toUpperCase(),
            email: email.trim(),
            telefone: telefone.trim()
        }
        
        storageCliente.save(cliente)
            .then(() => {
                const clientes = [...this.state.clientes]
                clientes.push(cliente)
                this.setState({                     
                    clientes, nome: '', referencia: '', email: '', telefone: '',
                    visibleAlert: true, codigoAlert: constantes.ALERT_SUCCESS,
                    loading: false
                })            
            })
            .catch(() => 
                this.setState({ 
                    visibleAlert: true, loading: false,
                    codigoAlert: constantes.ALERT_ERROR_DB_INSERT 
                }))
    }

    render() {             
        return (
            <Container title="Clientes">            
                <ClienteForm data={this.state}
                    handleChange={this.handleChange}
                    handleClick={this.handleClick} />
                {this.state.loading ? <Loading /> : null}
                <Table columns={columnsTable} 
                    data={this.state.clientes} actions={[]} />
            </Container>
        )
    }
}