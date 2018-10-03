import React from 'react'
import Modal from '../../components/Modal.jsx'
import PedidoModalTable from './PedidoModalTable.jsx'

const styleClose = {
    "color": "red",
    "fontSize": "20px"
}

const styleP = {
    'fontSize': '20px',
    'marginTop': '15px'
}

export default props => 
    props.show ? 
        <Modal width={800} height={600}>
            <div className="row">
                <div className="col-md-11">
                    <p className="font-weight-bold text-monospace" style={styleP}>
                        Total Pedido: R$ {props.totalPedido}
                    </p>
                </div>                
                <div style={styleClose} className="col-md-1">
                    <i aria-hidden="true" className="fa fa-times"
                        style={{cursor: "pointer"}}
                        onClick={props.closeModal}></i>
                </div>
            </div>            
            <div style={{overflowY: "auto", height: "495px"}}>
                <PedidoModalTable data={props.data} />
            </div>            
        </Modal>
    : null