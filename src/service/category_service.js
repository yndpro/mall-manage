import Util      from "util/index.js";

const _util      =  new Util;

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

    setCategoryName(categoryId,categoryName){
        return _util.request({
            url : '/manage/category/set_category_name.do',
            method : 'POST',
            data : {
                categoryId,
                categoryName
            }
        });
    }

    addCategory(parentId = 0,categoryName){
        return _util.request({
            url : '/manage/category/add_category.do',
            method : 'POST',
            data : {
                parentId,
                categoryName
            }
        });
    }

}

export default Category;