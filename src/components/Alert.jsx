import React, { Component } from 'react'
import constantes from '../constants.js'

const style = {
    textAlign: 'center'
}

export default class Alert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classe: '', message: '', ...props
        }
    }

    componentWillReceiveProps(props) { 
         
        const codAlert = props.codigo
        const visible = props.visible
        let classe = ''
        let message = ''
        
        if (codAlert == constantes.ALERT_SUCCESS) {
            classe = 'success'
            message = 'Dados cadastrados com sucesso !'
        } else if (codAlert == constantes.ALERT_ERROR) {
            classe = 'warning'
            message = 'Dados incorretos, verifique campos obrigatórios !'
        } else if (codAlert == constantes.ALERT_ERROR_DB) {
            classe = 'danger'
            message = 'Erro ao buscar dados !'
        } else if (codAlert == constantes.ALERT_ERROR_DB_INSERT) {
            classe = 'danger'
            message = 'Erro ao cadastrar dados !'
        } else if (codAlert == constantes.ALERT_PROD_NAO_ENCONTRADO) {
            classe = 'warning'
            message = 'Produto não encontrado !'
        } else if (codAlert == constantes.ALERT_VENDA_CADASTRADA) {
            classe = 'success'
            message = 'Venda cadastrada com sucesso !'
        }
        
        this.setState({ classe, message, visible })            
    }

    render() {        
        return (
            <div className="row" style={{'display': this.state.visible ? 'block': 'none'}}>
                <div className="col">
                    <div className={`alert alert-${this.state.classe}`} role="alert" style={style}>
                        {this.state.message}
                    </div>
                </div>
            </div>
        )
    }
}    