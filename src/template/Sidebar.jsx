import React from 'react'
import ItemMenu from '../components/ItemMenu.jsx'
//#ecbad5
export default () =>
    <div className="container-fluid">
        <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">                        
                        <ItemMenu />                     
                    </ul>                    
                </div>
            </nav>
        </div>
    </div>        