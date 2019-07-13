import React from 'react';
import {Link} from 'react-router-dom';
import Table from 'util/table/index.js';
import PageTitle from 'components/page-title/index.js';
import Category from "service/category_service.js";
import './style.scss';

const _category = new Category;

class CategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parentId : this.props.match.params.parentId || 0,
            list: []
        }
    }

    getCategoryList() {
        _category.getCategory(this.state.parentId).then(data => {
            if(this._isMounted){
                this.setState({
                    list : data
                })
            }
        }, msg => {
            if(this._isMounted){
                this.setState({
                    list : []
                });
                alert(msg);
            }
        })
    }

    setCategoryName(categoryId){
        let categoryName = window.prompt("Please input the category name");
        if(categoryName){
            _category.setCategoryName({
                categoryId : categoryId,
                categoryName : categoryName
            }).then(data => {
                alert("Set categoryName successful");
                this.getCategoryList()
            }, msg => {
                alert(msg);
            })
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let newParentId = nextProps.match.params.parentId || 0;
        if(this.state.parentId !== newParentId){
            this.setState({
                parentId : newParentId
            },() => {
                this.getCategoryList();
            })
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getCategoryList();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let thead = [
            {name:'品类ID',width:'30%'},
            {name:'品类名称',width:'50%'},
            {name:'操作',width:'20%'}
        ];

        let tbody = this.state.list.map((category, key) =>
            <tr key={key}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                    <a href="javascript:;" onClick={() => this.setCategoryName(category.id)}>修改名称</a>
                    {category.parentId === 0 ?
                    <Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
                    :
                    null
                    }
                </td>
            </tr>
        );

        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表">
                    <Link className="product-create btn btn-primary" to="/product-category/save">
                        <i className="fa fa-plus"/>
                        <span>新增品类</span>
                    </Link>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>父品类ID：{this.state.parentId}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Table thead={thead}>
                            {tbody}
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}


export default CategoryList;