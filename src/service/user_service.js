import Util from "util/index.js";

const _util = new Util;

class User{

    login(data){
        return _util.request({
            url : '/manage/user/login.do',
            data : data
        })
    }
}

export default User;