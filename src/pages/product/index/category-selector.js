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

    on1CategoryChange(e){
        this.setState({
            category1Id   : e.target.value,
            category2Id   : 0,
            category2List : []
        },() => {
            typeof this.props.onCategoryChange === 'function' && this.props.onCategoryChange(this.state.category1Id,this.state.category2Id);
            this.get2Category();
        });
    }

    on2CategoryChange(e){
        this.setState({
            category2Id   : e.target.value,
        },() => {
            typeof this.props.onCategoryChange === 'function' && this.props.onCategoryChange(this.state.category1Id,this.state.category2Id);
        });
    }

    get2Category(){
        _product.getCategory(this.state.category1Id).then(data => {
            this.setState({
                category2List : data
            });
        },msg => {
            alert(msg);
        })
    }

    get1Category(){
        _product.getCategory().then(data => {
            this.setState({
                category1List : data
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
                <select className="form-control" onChange={e => this.on1CategoryChange(e)}>
                    <option>请选择一级分类</option>
                    {
                        this.state.category1List.length > 0 ?
                            this.state.category1List.map((item,index) => <option key={index} value={item.id}>{item.name}</option>)
                            :
                            null
                    }
                </select>
                <select className="form-control" onChange={e => this.on2CategoryChange(e)}>
                    <option>请选择二级分类</option>
                    {
                        this.state.category2List.length > 0 ?
                            this.state.category2List.map((item,index) => <option key={index} value={item.id}>{item.name}</option>)
                            :
                            null
                    }
                </select>
            </div>
        )
    }
}


export default ProductCategorySelector;