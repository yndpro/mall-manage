import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch ,Redirect} from 'react-router-dom';
import Layout from 'components/layout/index.js';
import Home from 'pages/home/index.js';
import UserList from 'pages/user-list/index.js';
import ProductList from 'pages/product/index/index.js';
import ProductSave from 'pages/product/index/save.js';
import ProductDetail from 'pages/product/index/detail.js';
import Category from 'pages/product/category/index.js';
import CategorySave from 'pages/product/category/save.js';
import OrderList from 'pages/order/index.js';
import OrderDetail from 'pages/order/detail.js';
import Login from 'pages/login/index.js';
import errorPage from "./pages/error";

class App extends React.Component {
    render() {
        let LayoutRouter =
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>

                    <Route path="/product/save/:pid" component={ProductSave}/>
                    <Route path="/product/detail/:pid" component={ProductDetail}/>
                    <Route path="/product/index" component={ProductList}/>
                    <Redirect from="/product" to="/product/index"/>

                    <Route path="/product-category/save" component={CategorySave}/>
                    <Route path="/product-category/index/:parentId" component={Category}/>
                    <Route path="/product-category/index" component={Category}/>
                    <Redirect from="/product-category" to="/product-category/index"/>

                    <Route path="/order/index" component={OrderList}/>
                    <Route path="/order/detail/:orderNo" component={OrderDetail}/>
                    <Redirect from="/order" to="/order/index"/>

                    <Route path="/user/index" component={UserList}/>
                    <Redirect from="/user" to="/user/index"/>

                    <Route component={errorPage}/>
                </Switch>
            </Layout>;

        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route path="/" render={() => LayoutRouter}/>
                    <Route component={errorPage}/>
                </Switch>
            </Router>
        )
    }
}


export default App;