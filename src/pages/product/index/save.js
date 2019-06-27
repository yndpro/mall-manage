import React                        from 'react';
import PageTitle                    from 'components/page-title/index.js';
import Product                      from "service/product_service.js";
import ProductCategorySelector      from "pages/product/index/category-selector.js";
import FileUpload                   from "util/fileUpload/index.js";
import RichEditor                   from "util/richEditor/index.js";
import "./save.scss";

const _product = new Product;

class ProductSave extends React.Component {
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

    onValueChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onCategoryChange(category1Id,category2Id){
        this.setState({
            category2Id : category2Id
        });
    }

    onRichEditorChange(data){
        this.setState({
            detail : data
        });
    }

    onUploadSuccess(data){
        this.state.subImages.push(data);
        this.setState({
            subImages : this.state.subImages
        })
    }

    onUploadError(msg){
        alert(msg)
    }

    onDeleteImage(e){
        this.state.subImages.splice(e.target.getAttribute("data-index"),1);
        this.setState({
            subImages : this.state.subImages
        })
    }

    onSubmit() {
        let product = {
            categoryId: parseInt(this.state.category2Id),
            name: this.state.name,
            subtitle: this.state.subtitle,
            subImages: this.state.subImages.map(image => image.uri).join(","),
            detail: this.state.detail,
            price: parseFloat(this.state.price),
            stock: parseFloat(this.state.stock),
            status: this.state.status
        };
        if(this.state.id){
            product.id = this.state.id;
        }

        if (!_product.checkProduct(product)) {
            return false
        }
        _product.saveProduct(product);
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
                <PageTitle title="添加商品"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal productCreate">
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
                                           name="subtitle"
                                           value={this.state.subtitle}
                                           onChange={e => this.onValueChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group form-category">
                                <label className="col-md-2 control-label">所属分类</label>
                                <div className="col-md-5">
                                    <ProductCategorySelector
                                        category1Id={this.state.category1Id}
                                        category2Id={this.state.category2Id}
                                        onCategoryChange={(category1Id,category2Id) => {
                                            this.onCategoryChange(category1Id,category2Id);
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
                                <div className="col-md-offset-2 col-md-10">
                                    <FileUpload
                                        onUploadSuccess={data => this.onUploadSuccess(data)}
                                        onUploadError={msg => this.onUploadError(msg)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品详情</label>
                                <div className="col-md-10">
                                    <RichEditor
                                        placeholder="Please input..."
                                        detail={this.state.detail}
                                        onChange={data => this.onRichEditorChange(data)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-primary" onClick={() => this.onSubmit()}>提交</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProductSave;