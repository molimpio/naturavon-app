import React, { Component } from 'react'
import Container from '../../components/Container.jsx'
import ClienteForm from '../cliente/ClienteForm.jsx'

export default class Cliente extends Component {

    constructor(props) {
        super(props)
            this.state = {
                nome: ''
            }
    }
    render() {
        return (
            <Container title="Clientes">
                <ClienteForm data={this.state} />
            </Container>
        )
    }
}