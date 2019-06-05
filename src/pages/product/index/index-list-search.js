import React from 'react';

class ProductListSearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            searchType : "productId",
            searchKeyword: ""
        }
    }
    onSeachTypeChange(e){
        this.setState({
            searchType : e.target.value.trim()
        });
    }
    onSearchKeywordChange(e){
        this.setState({
            searchKeyword: e.target.value.trim()
        });
    }
    onSeach(){
        this.props.onSeach(this.state.searchType,this.state.searchKeyword);
    }
    render() {
        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="form-inline product-top">
                        <div className="form-group">
                            <select className="form-control" name="searchType" onChange={(e) => this.onSeachTypeChange(e)}>
                                <option value="productId">按商品ID查询</option>
                                <option value="productName">按商品名称查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="searchKeyword" onChange={(e) => this.onSearchKeywordChange(e)} placeholder="Key Word"/>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={() => this.onSeach()}>Search</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default ProductListSearch;