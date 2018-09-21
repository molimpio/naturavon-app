import React, { Component } from 'react'
import Container from '../../components/Container.jsx'
import ClienteForm from '../cliente/ClienteForm.jsx'

export default class Cliente extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nome: '', referencia: '', email: '', telefone: '',
            visibleAlert: false, classeAlert: '', messageAlert: '' 
        }        
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })  
    }

    handleClick() {
        console.log(this.state)
        if (this.state.nome.length < 3 || this.state.referencia.length < 3) {
            this.setState({ 
                visibleAlert: true,
                classeAlert: 'warning',
                messageAlert: 'Dados incorretos, nome e referência são obrigatórios!'
            })            
        }
    }

    render() {
        return (
            <Container title="Clientes">
                <ClienteForm data={this.state} 
                    handleChange={this.handleChange}
                    handleClick={this.handleClick} />
            </Container>
        )
    }
}