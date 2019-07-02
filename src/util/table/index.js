import React from 'react';

import './style.scss';

class Table extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoad : true
        }
    }
    componentWillReceiveProps() {
        this.state = {
            isFirstLoad : false
        }
    }

    render() {
        let tableHead = <tr>{
            this.props.thead.map(({name,width},key) =>
                <td key={key} width={width}>{name}</td>
            )}
        </tr>;

        let tableInfo = <tr>
            <td colSpan={this.props.thead.length} className="text-center">{this.state.isFirstLoad ? "加载中..." : "没数据"}</td>
        </tr>;

        let tableBody = this.props.children.length > 0 ? this.props.children : tableInfo;

        return(
            <table className="table table-striped table-bordered">
                <thead>
                    {tableHead}
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
        )
    }
}


export default Table;