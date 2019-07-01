import Util      from "util/index.js";
import Validator from "./validator";

const _util      =  new Util;
const _validator =  new Validator;

class Category{

    getCategory(categoryId = 0){
        return _util.request({
            url : '/manage/category/get_category.do',
            method : 'POST',
            data : {
                categoryId
            }
        });
    }

    setCategoryName({categoryId,categoryName}){
        return _util.request({
            url : '/manage/category/set_category_name.do',
            method : 'POST',
            data : {
                categoryId,
                categoryName
            }
        });
    }

    addCategory({parentId = 0,categoryName}){
        return _util.request({
            url : '/manage/category/add_category.do',
            method : 'POST',
            data : {
                parentId,
                categoryName
            }
        });
    }

    checkCategory(category){
        _validator.cache = [];
        _validator
            .add(category.categoryName, [
                {strategy: 'isNonEmpty',errorMsg: '品类名称不能为空！'},
                {strategy: 'isString',errorMsg: '请填写正确品类名称！'},
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

export default Category;