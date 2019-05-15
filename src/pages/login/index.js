import React from 'react';

import util from "util/index.js";
import "./style.css";

class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            username : "",
            password : ""
        }
    }

    changeUsername(e){
        this.setState({
            username : e.target.value
        })
    }

    changePassword(e){
        this.setState({
            password : e.target.value
        })
    }

    submit(){
        util
            .post("",{
                username : this.state.username,
                password : this.state.password
            })
            .then(()=>{

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
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       placeholder="Username" value={this.state.username} onChange={e => this.changeUsername(e)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                       placeholder="Password" value={this.state.password} onChange={e => this.changePassword(e)}/>
                            </div>
                            <button type="submit" className="btn btn-block btn-primary" onClick={this.submit}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default Login;