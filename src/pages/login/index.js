import React from 'react';

import User from "service/user_service.js";
import Util from "util/index.js";
import "./style.css";

const _user = new User;
const _util = new Util;

class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            username : "",
            password : ""
        }
    }

    onInputChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(){
        let loginInfo = {
            username : this.state.username,
            password : this.state.password
        };
        _user.login(loginInfo).then(res => {
            _util.setLocalStorage("loginInfo",loginInfo);
            location.href = _util.getUrlParam("redirect") || "/";
        },msg => {
            console.log(msg);
        })
    }

    render() {
        return(
            <div className="col-md-4 col-md-offset-4">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Welcome!</h3>
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Username</label>
                                <input name="username" className="form-control" id="exampleInputEmail1"
                                       placeholder="Username" value={this.state.username} onChange={e => this.onInputChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input name="password" type="password" className="form-control" id="exampleInputPassword1"
                                       placeholder="Password" value={this.state.password} onChange={e => this.onInputChange(e)}/>
                            </div>
                            <button type="button" className="btn btn-block btn-primary" onClick={() => this.onSubmit()}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default Login;