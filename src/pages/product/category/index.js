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
            parentId : this.props.match.param.parentId || 0,
            list: [],
            listType: "list"
        }
    }

    getCategoryList() {
        _category.getCategoryList(this.state.parentId).then(data => {
            this.setState(data)
        }, msg => {
            this.setState({
                list: []
            });
            alert(msg);
        })
    }

    setCategoryName(categoryId){
        let categoryName = window.prompt("Please input the category name");
        if(categoryName){
            _category.setCategoryName(categoryId,categoryName).then(data => {
                this.setState(data)
            }, msg => {
                alert(msg);
            })
        }

    }

    componentDidMount() {
        this.getCategoryList();
    }

    render() {

        let thead = ["品类ID", "品类名称", "操作"];

        let tbody = this.state.list.map((category, key) =>
            <tr key={key}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                    <a href="javascript:;" onClick={() => this.setCategoryName(category.id)}>修改名称</a>
                    {category.parentId === 0 ?
                    <Link to={`/category/index/${category.id}`}>查看子品类</Link>
                    :
                    null
                    }
                </td>
            </tr>
        );

        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表"/>
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