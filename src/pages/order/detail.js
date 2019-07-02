import React                        from 'react';
import Table                        from 'util/table/index.js';
import PageTitle                    from 'components/page-title/index.js';
import Order                        from "service/order_service.js";
import "./detail.scss";
import {Link} from "react-router-dom";

const _order = new Order;

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNo             : this.props.match.params.orderNo || "",
            orderInfo           : {}
        }
    }

    sendGoods(){
        _order.sendGoods(this.state.orderNo).then(data => {
            alert(data);
            this.getOrderDetail();
        },errorMsg => {
            alert(errorMsg);
        })
    }

    getOrderDetail(){
        if(this.state.orderNo){
            _order.getOrderDetail(this.state.orderNo).then(data => {
                if(this._isMounted){
                    this.setState({
                        orderInfo : data || {}
                    })
                }
            },errorMsg => {
                alert(errorMsg);
            })
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getOrderDetail();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let productList = this.state.orderInfo.orderItemVoList || [];
        let receiverInfo = this.state.orderInfo.shippingVo || {};

        let thead = [
            {name: '商品图片', width: '10%'},
            {name: '商品名称', width: '45%'},
            {name: '单价', width: '15%'},
            {name: '数量', width: '15%'},
            {name: '合计', width: '15%'}
        ];

        let tbody = productList.map((product, key) =>
            <tr key={key}>
                <td>
                    <Link to={`/product/detail/${product.productId}`}><img className="item-img" src={`${this.state.orderInfo.imageHost}${product.productImage}`} alt=""/></Link>
                </td>
                <td>
                    <Link to={`/product/detail/${product.productId}`}>{product.productName}</Link>
                </td>
                <td>￥{product.currentUnitPrice}</td>
                <td>{product.quantity}</td>
                <td>￥{product.totalPrice}</td>
            </tr>
        );

        return (
            <div id="page-wrapper">
                <PageTitle title="订单详情"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal orderDetail-form">
                            <div className="form-group">
                                <label className="col-md-2 control-label">订单号</label>
                                <div className="col-md-5">
                                    <div className="control-state">{this.state.orderNo}</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">创建时间</label>
                                <div className="col-md-5">
                                    <div className="control-state">{this.state.orderInfo.createTime}</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">收件人</label>
                                <div className="col-md-5">
                                    <div className="control-state">
                                        {receiverInfo.receiverName}
                                        {receiverInfo.receiverProvince}
                                        {receiverInfo.receiverCity}
                                        {receiverInfo.receiverAddress}
                                        {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-category">
                                <label className="col-md-2 control-label">订单状态</label>
                                <div className="col-md-5">
                                    <div className="control-state">
                                        {this.state.orderInfo.statusDesc}
                                        {
                                            this.state.status === 20 ?
                                                <button onClick={() => this.sendGoods()}>立即发货</button>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">订单金额</label>
                                <div className="col-md-5">
                                    <div className="control-state">￥{this.state.orderInfo.payment}</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">支付方式</label>
                                <div className="col-md-5">
                                    <div className="control-state">{this.state.orderInfo.paymentTypeDesc}</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品列表</label>
                                <div className="col-md-10">
                                    <Table thead={thead}>
                                        {tbody}
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Detail;