import React from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';

import Layout from 'component/layout/index.js';
import Home   from 'page/home/index.js';

class App extends React.Component{
    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                    </Switch>
                </Layout>
            </Router>
        )
    }
}


export default App;