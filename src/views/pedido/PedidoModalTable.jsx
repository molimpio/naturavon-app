import React from 'react'

const styleTable = {
    'marginTop': '20px', 
    'display': 'inline-table'
}

const columnsTable = [
    'Cliente', 'Cód.', 'Produto', 'Pág', 
    'Qtde', 'Valor', 'Desconto', 'Total'
]

let totalCliente = 0

export default props => {
    function renderLine(venda, index) {        
        let clienteAnt = ""
        const cliente = venda.cliente
        
        let row = []
        if (index > 0) clienteAnt = props.data[index-1].cliente            
        // precisa renderizar a linha do total e a linha seguinte..
        if (cliente != clienteAnt && index > 0) {
            row.push( 
            <tr key={index}>
                <td colSpan={8} style={{textAlign: "right", fontWeight: "bold"}}>
                    Total: R$ {totalCliente.toFixed(2)}
                </td>                                    
            </tr>)
            row.push(
                <tr key={index+1}>
                {Object.keys(venda).map((item, i) => 
                    <td key={i}>{venda[item]}</td>
                )}                    
            </tr>)
            totalCliente = 0
            totalCliente += parseFloat(venda.totalProduto)        
            if (index+1 == props.data.length) {                
                row.push( 
                    <tr key={index+2}>
                        <td colSpan={8} style={{textAlign: "right", fontWeight: "bold"}}>
                            Total: R$ {totalCliente.toFixed(2)}
                        </td>                                    
                    </tr>)                    
                return row
            }
            return row
        } else {
            row.push( 
                <tr key={index}>
                    {Object.keys(venda).map((item, i) => 
                        <td key={i}>{venda[item]}</td>
                    )}                    
                </tr>)
            totalCliente += parseFloat(venda.totalProduto)                        
            return row            
        }                
    }

    return (
        <table className="table table-bordered" style={styleTable}>
            <thead>
                <tr>
                    {columnsTable.map((col, i) => <th key={i}>{col}</th>)}                
                </tr>
            </thead>   
            <tbody>
                {props.data.map((venda, i) => renderLine(venda, i).map(row => row))}
            </tbody> 
        </table>
    )
}
    