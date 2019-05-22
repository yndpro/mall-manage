import React from 'react';

import {Link} from 'react-router-dom';
import PageTitle from 'components/page-title/index.js';

import './style.scss';

class errorPage extends React.Component{

    render() {
        return(
            <div id="page-wrapper">
                <PageTitle title="错误页面"/>
                <div className="row">
                    <div className="col-md-12">
                        您访问的页面找不到啦~
                        <Link to="/" className="">返回首页</Link>
                    </div>
                </div>
            </div>
        )
    }
}


export default errorPage;