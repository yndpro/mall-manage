import React from 'react';

import Pagination from 'util/pagination/index.js';
import PageTitle from 'components/page-title/index.js';
import User from "service/user_service.js";

import './style.scss';

const _user = new User;

class UserList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list : [],
            pageNum : 1,
            firstLoad : true
        }
    }
    getUserList(){
        _user.getUserList(this.state.pageNum).then(data => {
            this.setState(data,() => {
                this.setState({
                    firstLoad : false
                })
            })
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
        let tbody;
        if(this.state.list.length > 0){
            tbody = this.state.list.map((user,key) =>
                <tr key={key}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            )
        }else if(this.state.firstLoad){
            tbody = <tr>
                        <td colSpan="5" className="text-center">加载中...</td>
                    </tr>;
        }else{
            tbody = <tr>
                        <td colSpan="5" className="text-center">没数据</td>
                    </tr>;
        }

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