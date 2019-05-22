import Util from "util/index.js";

const _util = new Util;

class User{

    login(data){
        return _util.request({
            url : '/manage/user/login.do',
            method : 'POST',
            data : data
        })
    }

    logout(){
        return _util.request({
            url : '/user/logout.do',
            method : 'POST',
        })
    }

    checkLogin(loginInfo){
        let username = _util.trim(loginInfo.username),
            password = _util.trim(loginInfo.password);
        if(username === ""){
            return {
                status : 1,
                msg : "username is empty"
            }
        }
        if(password === ""){
            return {
                status : 1,
                msg : "password is empty"
            }
        }
        return {
            status : 0,
            msg : "success"
        }
    }
}

export default User;