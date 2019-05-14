import React from 'react';

class Login extends React.Component{
    render() {
        return(
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Welcome</h3>
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"
                                       placeholder="Password"/>
                            </div>
                            <button type="submit" className="btn btn-block btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default Login;