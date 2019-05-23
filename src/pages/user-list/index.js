import React from 'react';

import PageTitle from 'components/page-title/index.js';
import User from "service/user_service.js";

import './style.scss';

const _user = new User;

class UserList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list : [],
            pageNum : 0
        }
    }
    getUserList(){
        _user.getUserList().then(data => {
            this.setState(data)
        },msg => {
            alert(msg);
        })
    }
    componentDidMount() {
        this.getUserList();
    }

    render() {
        return(
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <div className="row">
                    <div className="col-md-12">
                        <table className="">

                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default UserList;