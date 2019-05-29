import React from 'react';

class Table extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        let thead = <tr>{
            this.props.thead.map((td,key) =>
                <td key={key}>{td}</td>
            )}
        </tr>;

        let tbody = this.props.children;
        if(tbody.length > 0){

        }else if(this.props.firstLoad){
            tbody = <tr>
                <td colSpan={this.props.thead.length} className="text-center">加载中...</td>
            </tr>;
        }else{
            tbody = <tr>
                <td colSpan={this.props.thead.length} className="text-center">没数据</td>
            </tr>;
        }
        return(
            <table className="table table-striped table-border">
                <thead>
                    {thead}
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
        )
    }
}


export default Table;