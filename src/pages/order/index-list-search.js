import React from 'react';

class OrderListSearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            orderNo: ""
        }
    }
    onValueChange(e){
        this.setState({
            [e.target.name] : e.target.value.trim()
        });
    }
    onSeach(){
        this.props.onSeach(this.state.orderNo);
    }
    render() {
        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="form-inline product-top">
                        <div className="form-group">
                            <select className="form-control" name="searchType">
                                <option value="productId">按订单号查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="orderNo" onChange={(e) => this.onValueChange(e)} placeholder="Order Number"/>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={() => this.onSeach()}>Search</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderListSearch;