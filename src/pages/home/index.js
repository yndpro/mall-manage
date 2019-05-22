import React from 'react';

import {Link} from 'react-router-dom';
import PageTitle from 'components/page-title/index.js';

import Statistic from 'service/statistic_service.js';
import './style.scss';

const _statistic = new Statistic;

class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            productCount : "-",
            userCount : "-",
            orderCount : "-",
        }
    }

    getCount(){
        _statistic.getBaseCount().then(data => {
            this.setState(data);
        },msg =>{

        })
    }

    componentDidMount() {
        this.getCount();
    }

    render() {
        return(
            <div id="page-wrapper">
                <PageTitle title="首页"/>
                <div className="row home-guid">
                    <div className="col-md-4">
                        <Link to="/product" className="guid-item brown">
                            <div className="item-count">{this.state.productCount}</div>
                            <div className="item-desc">
                                <i className="fa fa-gift"/>Product
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/order" className="guid-item green">
                            <div className="item-count">{this.state.orderCount}</div>
                            <div className="item-desc">
                                <i className="fa fa-list"/>Order
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="/user" className="guid-item blue">
                            <div className="item-count">{this.state.userCount}</div>
                            <div className="item-desc">
                                <i className="fa fa-user-o"/>User
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home;