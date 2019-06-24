import Util      from "util/index.js";
import Validator from "./validator";

const _util      =  new Util;
const _validator =  new Validator;

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
                pageNum,
                pageSize
            }
        });

    }

    getCategory(categoryId = 0){
        return _util.request({
            url : '/manage/category/get_category.do',
            method : 'POST',
            data : {
                categoryId
            }
        });
    }

    saveProduct(product){
        return _util.request({
            url : '/manage/product/save.do',
            method : 'POST',
            data : product
        });
    }

    setProductStatus(productId,status){
        return _util.request({
            url : '/manage/product/set_sale_status.do',
            method : 'POST',
            data : {
                productId,
                status
            }
        });
    }

    checkProduct(product){

        _validator.cache = [];
        _validator
            .add(product.name, [
                {strategy: 'isNonEmpty',errorMsg: '商品名称不能为空！'},
                {strategy: 'isString',errorMsg: '请填写正确商品名称！'},
            ])
            .add(product.subtitle, [
                {strategy: 'isNonEmpty',errorMsg: '商品描述不能为空！'},
                {strategy: 'isString',errorMsg: '请填写正确商品描述！'},
            ])
            .add(product.categoryId, [
                {strategy: 'isNumber',errorMsg: '请选择正确商品品类！'},
                {strategy: 'minNumber:0',errorMsg: '请选择正确商品品类！'}
            ])
            .add(product.price, [
                {strategy: 'isNumber',errorMsg: '商品价格为数字！'},
                {strategy: 'minNumberInc:0',errorMsg: '商品价格不为负数！'}
            ])
            .add(product.stock, [
                {strategy: 'isNumber',errorMsg: '库存数量为数字！'},
                {strategy: 'minNumberInc:0',errorMsg: '库存数量不为负数！'}
            ]);

        let errorMsg = _validator.start();

        if(errorMsg){
            alert(errorMsg);
            return false
        }else{
            return true
        }
    }

}

export default Product;