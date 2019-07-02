import React from 'react';
import {Link} from 'react-router-dom';
import Pagination from 'util/pagination/index.js';
import Table from 'util/table/index.js';
import PageTitle from 'components/page-title/index.js';
import Order from "service/order_service.js";
import OrderListSearch from 'pages/order/index-list-search.js';
import './style.scss';

const _order= new Order;

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            listType: "list",
            orderNo : ""
        }
    }

    getOrderList() {
        let listParam = {};

        listParam.list = this.state.list;
        listParam.pageNum = this.state.pageNum;
        if (this.state.listType === "search") {
            listParam.orderNo = this.state.orderNo;
        }

        _order.getOrderList(listParam).then(({list}) => {
            if(this._isMounted){
                this.setState({
                    list : list
                })
            }
        }, msg => {
            if(this._isMounted){
                this.setState({
                    list: []
                });
                alert(msg);
            }
        })
    }

    onSeach(orderNo) {
        this.setState({
            listType: "search",
            pageNum: 1,
            orderNo: orderNo,
        }, () => {
            this.getOrderList()
        });
    }

    onPageChange(current) {
        this.setState({
            pageNum: current
        }, () => {
            this.getOrderList();
        });
    }

    componentDidMount() {
        this._isMounted = true;
        this.getOrderList();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        let thead = [
            {name:'订单号',width:'20%'},
            {name:'收件人',width:'20%'},
            {name:'订单状态',width:'20%'},
            {name:'订单总价',width:'20%'},
            {name:'创建时间',width:'15%'},
            {name:'操作',width:'5%'}
        ];

        let tbody = this.state.list.map((order, key) =>
            <tr key={key}>
                <td>
                    <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                </td>
                <td>{order.receiverName}</td>
                <td>{order.statusDesc}</td>
                <td>￥{order.payment}</td>
                <td>{order.createTime}</td>
                <td>
                    <Link to={`/order/detail/${order.orderNo}`}>详情</Link>
                </td>
            </tr>
        );

        return (
            <div id="page-wrapper">
                <PageTitle title="订单列表"/>
                <OrderListSearch onSeach={orderNo => this.onSeach(orderNo)}/>
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


export default OrderList;