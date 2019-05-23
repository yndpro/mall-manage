import React from 'react';

import Pagination from 'rc-pagination';

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


export default Pagination;