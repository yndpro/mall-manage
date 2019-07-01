import React        from 'react';
import Category     from "service/category_service.js";

const _category = new Category;

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
        if(this.props.readOnly){
            return false
        }
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
        if(this.props.readOnly){
            return false
        }
        this.setState({
            category2Id   : e.target.value,
        },() => {
            typeof this.props.onCategoryChange === 'function' && this.props.onCategoryChange(this.state.category1Id,this.state.category2Id);
        });
    }

    get2Category(){
        _category.getCategory(this.state.category1Id).then(data => {
            if(this._isMounted){
                this.setState({
                    category2List : data
                });
            }
        },msg => {
            alert(msg);
        })
    }

    get1Category(){
        _category.getCategory().then(data => {
            if(this._isMounted){
                this.setState({
                    category1List : data
                });
            }
        },msg => {
            alert(msg);
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if((this.state.category1Id !== nextProps.category1Id) ||
            (this.state.category2Id !== nextProps.category2Id)){
            this.setState({
                category1Id : nextProps.category1Id,
                category2Id : nextProps.category2Id
            },() => {
                this.get2Category();
            })
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.get1Category();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div>
                <select className="form-control"
                        value={this.state.category1Id}
                        readOnly={this.props.readOnly}
                        onChange={e => this.on1CategoryChange(e)}>
                    <option>请选择一级分类</option>
                    {
                        this.state.category1List.length > 0 ?
                            this.state.category1List.map((item,index) => <option key={index} value={item.id}>{item.name}</option>)
                            :
                            null
                    }
                </select>
                <select className="form-control"
                        value={this.state.category2Id}
                        readOnly={this.props.readOnly}
                        onChange={e => this.on2CategoryChange(e)}>
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