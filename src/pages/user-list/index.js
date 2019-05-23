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
            pageNum : 0,
            loading : false
        }
    }
    getUserList(){

        this.setState({loading : true});

        _user.getUserList().then(data => {
            this.setState(data, () => {
                this.setState({
                    loading : false
                })
            })
        },msg => {
            alert(msg);
        })
    }
    componentDidMount() {
        this.getUserList();
    }

    render() {

        let tbody = this.state.list.length > 0 ?
            this.state.list.map((user,key) =>
                <tr key={key}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.createTime}</td>
                </tr>
            )
            :
            <tr>
                <td>没数据</td>
            </tr>;


        return(
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-border">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>用户名</th>
                                    <th>邮箱</th>
                                    <th>电话</th>
                                    <th>注册时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tbody}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default UserList;