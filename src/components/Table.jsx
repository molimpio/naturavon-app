import React from 'react'
import Button from '../components/Button.jsx'

const styleTable = {
    'marginTop': '20px'
}

const styleColumnAction = {
    'width': '70px'
}

const styleCenter = {
    'textAlign': 'center'
}

export default props =>
    <table className="table table-bordered" style={styleTable}>
        <thead>
            <tr>
                {props.columns.map((column, key) => {
                    return (
                        (key + 1 == props.columns.length) ?
                            <th colSpan={props.actions.length}
                                key={key} style={styleCenter}>{column}</th> :
                            <th key={key}>{column}</th>
                    )
                })}
            </tr>
        </thead>
        <tbody>
            {props.data.map((objItem, key) => {
                return (
                    <tr key={key}>
                        {Object.keys(objItem).map((item, key) =>
                            <td key={key}>{objItem[item]}</td>
                        )}
                        {props.actions.length > 0 ?
                            props.actions.map((a, key) =>
                            <td key={key} style={styleColumnAction}>
                                <Button classe={a.type} texto="" icon={a.icon} 
                                    handleClick={a.fn.bind(this, objItem)}/>
                            </td>
                        )
                        : null}                        
                    </tr>
                )
            })}
        </tbody>
    </table>