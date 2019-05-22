import Util from "util/index.js";

const _util = new Util;

class Statistic{

    getBaseCount(){
        return _util.request({
            url : '/manage/statistic/base_count.do',
            method : 'POST'
        })
    }

}

export default Statistic;