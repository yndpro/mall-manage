import React from 'react';

import User from "service/user_service.js";
import Util from "util/index.js";
import {Link} from 'react-router-dom';

const _user = new User;
const _util = new Util;

class NavTop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username : _util.getLocalStorage("loginInfo").username
        }
    }
    onLogout(){
        _user.logout().then(res => {
            _util.removeLocalStorage("loginInfo");
            this.setState({
                username : ""
            })
        },msg => {
            console.log(msg);
        })
    }
    render() {
        return(
            <div className="navbar navbar-default top-navbar" role="navigation">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>MALL</b>MANAGE</Link>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            {this.state.username ? <span>欢迎，{this.state.username}</span> : <span>登陆</span>}
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => this.onLogout()}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}


export default NavTop;