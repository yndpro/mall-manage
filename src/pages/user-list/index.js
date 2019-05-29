import React from 'react';

import Pagination from 'util/pagination/index.js';
import Table from 'util/table/index.js';
import PageTitle from 'components/page-title/index.js';
import User from "service/user_service.js";

import './style.scss';

const _user = new User;

class UserList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list : [],
            pageNum : 1
        }
    }
    getUserList(){
        _user.getUserList(this.state.pageNum).then(data => {
            this.setState(data)
        },msg => {
            this.setState({
                list : []
            });
            alert(msg);
        })
    }

    onPageChange(current){
        this.setState({
            pageNum : current
        },() => {
            this.getUserList();
        });
    }

    componentDidMount() {
        this.getUserList();
    }

    render() {

        let thead = ["ID", "用户名", "邮箱", "电话", "注册时间"];

        let tbody = this.state.list.map((user,key) =>
            <tr key={key}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{new Date(user.createTime).toLocaleString()}</td>
            </tr>
        );

        return(
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <div className="row">
                    <div className="col-md-12">
                        <Table thead={thead}>
                            {tbody}
                        </Table>
                        <Pagination
                            total={this.state.total}
                            current={this.state.pageNum}
                            onChange={(current, pageSize) => {
                                this.onPageChange(current);
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default UserList;