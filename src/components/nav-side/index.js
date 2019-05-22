import React from 'react';

import {NavLink,Link} from 'react-router-dom';

class NavSide extends React.Component{
    render() {
        return(
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav">
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/">
                                <i className="fa fa-home"></i>
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li className="active">
                            <Link to="/product">
                                <i className="fa fa-gift"></i>
                                <span>Product</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink activeClassName="active-menu" to="/product">Product Manage</NavLink>
                                </li>
                                <li>
                                    <NavLink activeClassName="active-menu" to="/product-category">Product Category Manage</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/order">
                                <i className="fa fa-list"></i>
                                <span>Order</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink activeClassName="active-menu" to="/order">Order Manage</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/user">
                                <i className="fa fa-user-o"></i>
                                <span>User</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink activeClassName="active-menu" to="/user">User Manage</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}


export default NavSide;