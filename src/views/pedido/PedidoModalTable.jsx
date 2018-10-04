import React from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

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
        
        if (cliente != clienteAnt && index > 0) {
            row.push( 
            <tr key={Math.random()+1}>
                <th colSpan={8} key={Math.random()+2} style={{textAlign: "right", fontWeight: "bold"}}>
                    Total: R$ {totalCliente.toFixed(2)}
                </th>                                    
            </tr>)
            row.push(
                <tr key={Math.random()+3}>
                    <td colSpan={8} key={Math.random()+4}></td>
                </tr>
            )
            row.push(
                <tr key={Math.random()+5}>{columnsTable.map((col, i) => 
                    <th key={Math.random()}>{col}</th>)}
                </tr>       
            )
            row.push(
                <tr key={Math.random()}>
                {Object.keys(venda).map((item, i) => 
                    <td key={Math.random()}>{venda[item]}</td>
                )}                    
            </tr>)
            totalCliente = 0
            totalCliente += parseFloat(venda.totalProduto)        
            if (index+1 == props.data.length) {                
                row.push( 
                    <tr key={Math.random()}>
                        <th colSpan={8} key={Math.random()} style={{textAlign: "right", fontWeight: "bold"}}>
                            Total: R$ {totalCliente.toFixed(2)}
                        </th>                                    
                    </tr>)                    
                row.push(
                    <tr key={Math.random()}>
                        <td colSpan={8} key={Math.random()}></td>
                    </tr>
                )   
                return row
            }
            return row
        } else {
            row.push( 
                <tr key={Math.random()}>
                    {Object.keys(venda).map((item, i) => 
                        <td key={Math.random()}>{venda[item]}</td>
                    )}                    
                </tr>)
            totalCliente += parseFloat(venda.totalProduto)                        
            return row            
        }                
    }

    return (
        <div>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="vendas"
                filename="vendas_avon"
                sheet="vendas_avon"
                buttonText="Download XLS"/>
            <table className="table table-bordered" style={styleTable} id="vendas">
                <thead>
                    <tr key={Math.random()}>
                        {columnsTable.map((col, i) => <th key={Math.random()}>{col}</th>)}                
                    </tr>
                </thead>   
                <tbody>
                    {props.data.map((venda, i) => renderLine(venda, i).map(row => row))}
                </tbody> 
            </table>
        </div>        
    )
}
    