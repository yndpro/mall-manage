import React                        from 'react';
import PageTitle                    from 'components/page-title/index.js';
import Category                     from "service/category_service.js";

const _category = new Category;

class CategorySave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentId            : 0,
            categoryName        : '',
            list                : []
        }
    }

    onValueChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSubmit() {
        let category = {
            parentId: this.state.parentId || 0,
            categoryName: this.state.categoryName
        };

        if (!_category.checkCategory(category)) {
            return false
        }
        _category.addCategory(category).then(data => {
            alert(data);
            this.props.history.push('/product-category/index')
        },errorMsg => {
            alert(errorMsg)
        });
    }

    getCategoryList() {
        _category.getCategory().then(data => {
            if(this._isMounted){
                this.setState({
                    list : data
                })
            }
        }, msg => {
            alert(msg);
        })
    }

    componentDidMount() {
        this._isMounted = true;
        this.getCategoryList()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal productCreate">
                            <div className="form-group">
                                <label className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control" placeholder="请输入品类名称"
                                           name="categoryName"
                                           onChange={e => this.onValueChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group form-category">
                                <label className="col-md-2 control-label">所属分类</label>
                                <div className="col-md-5">
                                    <select name="parentId" className="form-control" onChange={e => this.onValueChange(e)}>
                                        <option value="0">跟类别/</option>
                                        {
                                            this.state.list.map((category, key) =>
                                                <option key={key} value={category.id}>{`跟类别/${category.name}`}</option>
                                            )
                                        }
                                    </select>
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


export default CategorySave;