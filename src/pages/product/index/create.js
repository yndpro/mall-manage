import React                        from 'react';
import PageTitle                    from 'components/page-title/index.js';
import Product                      from "service/product_service.js";
import ProductCategorySelector      from "pages/product/index/category-selector.js";
import "./create.scss";

const _product = new Product;

class ProductCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id                  : '',
            name                : '',
            subtitle            : '',
            categoryId          : 0,
            mainImage           : '',
            subImages           : [],
            price               : '',
            stock               : '',
            detail              : '',
            status              : 0
        }
    }

    getProductList() {
        let listParam = {};

        listParam.list = this.state.list;
        listParam.pageNum = this.state.pageNum;
        if (this.state.listType === "search") {
            listParam.searchType = this.state.searchType;
            listParam.searchKeyword = this.state.searchKeyword;
        }

        _product.getProductList(listParam).then(data => {
            this.setState(data)
        }, msg => {
            this.setState({
                list: []
            });
            alert(msg);
        })
    }

    onSeach(searchType, searchKeyword) {
        this.setState({
            listType: "search",
            pageNum: 1,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.getProductList()
        });
    }

    onValueChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品"/>
                <div className="row">
                    <div className="col-md-12">
                        <form className="form-horizontal productCreate">
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品名称</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control" placeholder="请输入商品名称"
                                           name="name"
                                           value={this.state.name}
                                           onChange={e => this.onValueChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control" placeholder="请输入商品描述"
                                           name="detail"
                                           value={this.state.detail}
                                           onChange={e => this.onValueChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属分类</label>
                                <div className="col-md-5">
                                    <ProductCategorySelector onCategoryChange={(category1Id,category2Id) => {
                                        console.log(category1Id,category2Id);
                                    }}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品价格</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control" placeholder="请输入商品价格"
                                           name="price"
                                           value={this.state.price}
                                           onChange={e => this.onValueChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品库存</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control" placeholder="请输入商品库存"
                                           name="stock"
                                           value={this.state.stock}
                                           onChange={e => this.onValueChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品图片</label>
                                <div className="col-md-5">

                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品详情</label>
                                <div className="col-md-5">

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-primary">提交</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProductCreate;