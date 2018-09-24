import React from 'react'
import '../css/styles.css'

export default props => 
<div>
    <div className="loader"></div>
    <p className="text-loading">{props.message}</p>
</div>