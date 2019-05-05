import React from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';

import Layout from 'components/layout/index.js';
import Home   from 'pages/home/index.js';

class App extends React.Component{
    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/product" component={Home}/>
                        <Route exact path="/order" component={Home}/>
                        <Route exact path="/user" component={Home}/>
                    </Switch>
                </Layout>
            </Router>
        )
    }
}


export default App;