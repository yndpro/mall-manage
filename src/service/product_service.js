import Util from "util/index.js";

const _util = new Util;

class Product{

    getProductList({pageNum = 1,pageSize = 10,searchType,searchKeyword = ""}){
        let url = searchKeyword !== "" ?
            `/manage/product/search.do?${searchType}=${searchKeyword}`
            :
            `/manage/product/list.do`;

        return _util.request({
            url : url,
            method : 'POST',
            data : {
                pageNum     : pageNum,
                pageSize    : pageSize
            }
        });

    }

    getCategory(categoryId = 0){
        return _util.request({
            url : '/manage/category/get_category.do',
            method : 'POST',
            data : {
                categoryId   : categoryId
            }
        });
    }

}

export default Product;