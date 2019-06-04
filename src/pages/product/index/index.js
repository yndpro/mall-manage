import React from 'react';

import Pagination from 'util/pagination/index.js';
import Table from 'util/table/index.js';
import PageTitle from 'components/page-title/index.js';
import Product from "service/product_service.js";
import ProductListSearch from 'pages/product/index/index-list-search.js';

import './style.scss';

const _product = new Product;

class ProductList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list        : [],
            pageNum     : 1,
            listType    : "list"
        }
    }
    getProductList(){
        let listParam = {};

        listParam.list      = this.state.list;
        listParam.pageNum   = this.state.pageNum;
        if(this.state.listType === "search"){
            listParam.searchType    = this.state.searchType;
            listParam.searchKeyword = this.state.searchKeyword;
        }

        _product.getProductList(listParam).then(data => {
            this.setState(data)
        },msg => {
            this.setState({
                list : []
            });
            alert(msg);
        })
    }

    onSeach(searchType,searchKeyword){
        this.setState({
            listType        : "search",
            pageNum         : 1,
            searchType      : searchType,
            searchKeyword   : searchKeyword
        },() => {
            this.getProductList()
        });
    }

    onPageChange(current){
        this.setState({
            pageNum : current
        },() => {
            this.getProductList();
        });
    }

    componentDidMount() {
        this.getProductList();
    }

    render() {

        let thead = ["商品ID", "商品信息", "价格", "状态", "操作"];

        let tbody = this.state.list.map((product,key) =>
            <tr key={key}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>￥{product.price}</td>
                {product.status === 1 ?
                    <td>
                        <div>在售</div>
                        <a className="btn btn-warning btn-sm" href="javascript:;">下架</a>
                    </td>
                    :
                    <td>
                        <div>已下架</div>
                        <a className="btn btn-warning btn-sm" href="javascript:;">上架</a>
                    </td>
                }
                <td>
                    <a href="javascript:;">详情</a>
                    <a href="javascript:;">编辑</a>
                </td>
            </tr>
        );

        return(
            <div id="page-wrapper">
                <PageTitle title="产品列表"/>
                <ProductListSearch onSeach={(searchType,searchKeyword) => this.onSeach(searchType,searchKeyword)}/>
                <div className="row">
                    <div className="col-md-12">
                        <Table thead={thead}>
                            {tbody}
                        </Table>
                        <Pagination
                            total={this.state.total}
                            current={this.state.pageNum}
                            onChange={(current, pageSize) => {
                                this.onPageChange(current);
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default ProductList;