import React from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';

import Layout from 'components/layout/index.js';
import Home   from 'pages/home/index.js';
import Login  from 'pages/login/index.js';

class App extends React.Component{
    render() {
        let LayoutRouter =
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/product" component={Home}/>
                    <Route exact path="/order" component={Home}/>
                    <Route exact path="/user" component={Home}/>
                </Switch>
            </Layout>;

        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route path="/" render={() => LayoutRouter}/>
                </Switch>
            </Router>
        )
    }
}


export default App;