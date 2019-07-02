import React                        from 'react';
import PageTitle                    from 'components/page-title/index.js';
import Product                      from "service/product_service.js";
import ProductCategorySelector      from "pages/product/index/category-selector.js";
import "./detail.scss";

const _product = new Product;

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id                  : this.props.match.params.pid,
            name                : '',
            subtitle            : '',
            category1Id         : 0,
            category2Id         : 0,
            mainImage           : '',
            subImages           : [],
            price               : '',
            stock               : '',
            detail              : '',
            status              : 0
        }
    }

    componentDidMount() {
        if(this.state.id){
            _product.getProductDetail(this.state.id).then(data => {

                let subImages = data.subImages.split(",").map(uri => {
                    return {
                        url : data.imageHost + uri,
                        uri : uri
                    }
                });

                this.setState({
                    name                : data.name || "",
                    subtitle            : data.subtitle || "",
                    category1Id         : data.parentCategoryId || 0,
                    category2Id         : data.categoryId || 0,
                    mainImage           : data.imageHost + data.mainImage || "",
                    subImages           : subImages || [],
                    price               : data.price || 0,
                    stock               : data.stock || 0,
                    detail              : data.detail || "",
                    status              : data.status || 0
                })

            })
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="商品详情"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal productCreate">
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品名称</label>
                                <div className="col-md-5">
                                    <div className="control-state">{this.state.name}</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-5">
                                    <div className="control-state">{this.state.subtitle}</div>
                                </div>
                            </div>
                            <div className="form-group form-category">
                                <label className="col-md-2 control-label">所属分类</label>
                                <div className="col-md-5">
                                    <ProductCategorySelector
                                        readOnly={true}
                                        category1Id={this.state.category1Id}
                                        category2Id={this.state.category2Id}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品价格</label>
                                <div className="col-md-5">
                                    <div className="control-state">{this.state.price}</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品库存</label>
                                <div className="col-md-5">
                                    <div className="control-state">{this.state.stock}</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品图片</label>
                                <div className="col-md-10 form-images">
                                    {
                                        this.state.subImages.length > 0 ?
                                            this.state.subImages.map((img,index) =>
                                                <div key={index} className="images-item">
                                                    <img src={img.url} alt=""/>
                                                    <i className="fa fa-close" data-index={index} onClick={e => this.onDeleteImage(e)}/>
                                                </div>
                                            )
                                            :
                                            <div>暂无图片</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品详情</label>
                                <div className="col-md-10">
                                    <div dangerouslySetInnerHTML={{__html:this.state.detail}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Detail;