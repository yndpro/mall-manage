import React from 'react';

import NavTop from 'components/nav-top/index.js';
import NavSide from 'components/nav-side/index.js';
import "./theme.css";

class Layout extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="wrapper">
                <NavTop/>
                <NavSide/>
                {this.props.children}
            </div>
        )
    }
}


export default Layout;