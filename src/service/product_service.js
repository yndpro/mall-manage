import Util from "util/index.js";

const _util = new Util;

class Product{

    getProductList(pageNum = 1,pageSize = 10){
        return _util.request({
            url : '/manage/product/list.do',
            method : 'POST',
            data : {
                pageSize : pageSize,
                pageNum : pageNum
            }
        })
    }
}

export default Product;