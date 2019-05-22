import axios from 'axios';
import qs from 'qs';

class Util{

    getUrlParam(key){
        let search = location.search.split("?")[1] || "";
        let reg = RegExp(new RegExp("(^|&)" + key + "=(.*?)($|&)","i"));
        return search.match(reg);
    }

    request({method = 'POST',url = '',data = null}){
        return new Promise((resolve, reject) => {
            axios({
                method: method,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url,
            })
                .then(response => {
                    response = response.data;

                    if(response.status === 0){
                        typeof resolve === "function" && resolve(response.data,response.msg);
                    }else if(response.status === 10){
                        this.doLogin();
                    }else{
                        typeof reject === "function" && reject(response.msg || response.data);
                    }
                })
                .catch(error => {
                    typeof reject === "function" && reject(error.message);
                });
        });
    }

    doLogin(){
        window.location.href = "/login?redirct=" + encodeURIComponent(window.location.pathname)
    }

    setLocalStorage(key,value){
        let type = typeof value;
        if(type === "string"){
            localStorage.setItem(key,value);
        }else if(["number","object","boolean"].indexOf(type) > 0){
            localStorage.setItem(key,JSON.stringify(value));
        }else {
            alert("LocalStorage不支持该格式");
        }
    }

    getLocalStorage(key){
        let value = localStorage.getItem(key);
        return value ? JSON.parse(value) : "";
    }

    removeLocalStorage(key){
        localStorage.hasOwnProperty(key) && localStorage.removeItem(key);
    }

    trim(str){
        if(typeof str === "string") return str.replace(/^\s+(.+?)\s+$/,"$1");
    }

}

export default Util;