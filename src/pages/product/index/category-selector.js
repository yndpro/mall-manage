import React        from 'react';
import Product      from "service/product_service.js";

const _product = new Product;

class ProductCategorySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category1Id   : 0,
            category2Id   : 0,
            category1List : [],
            category2List : []
        }
    }

    onSelectChange(e){
        this.setState({
            category1Id : e.target.value
        },() => {
            this.get2Category();
        });
    }

    get2Category(){
        _product.getCategory(this.state.category1Id).then(data => {
            this.setState({
                category2List : data
            },() => {
                typeof this.props.onCategoryChange === 'function' && this.props.onCategoryChange(this.state.category1Id,this.state.category2Id);
            });
        },msg => {
            alert(msg);
        })
    }

    get1Category(){
        _product.getCategory().then(data => {
            this.setState({
                category1List : data
            },() => {
                typeof this.props.onCategoryChange === 'function' && this.props.onCategoryChange(this.state.category1Id,this.state.category2Id);
            });
        },msg => {
            alert(msg);
        })
    }

    componentDidMount() {
        this.get1Category();
    }

    render() {
        return (
            <div>
                <select className="form-control" onChange={e => this.onSelectChange(e)}>
                    <option>请选择一级分类</option>
                    {
                        this.state.category1List.length > 0 ?
                            this.state.category1List.map(item => <option value={item.id}>{item.name}</option>)
                            :
                            null
                    }
                </select>
                <select className="form-control">
                    <option>请选择二级分类</option>
                </select>
            </div>
        )
    }
}


export default ProductCategorySelector;