import Util      from "util/index.js";

const _util      =  new Util;

class Order{

    getOrderList({pageNum = 1,pageSize = 10,orderNo = ""}){
        let url = orderNo !== "" ?
            `/manage/order/search.do?orderNo=${orderNo}`
            :
            `/manage/order/list.do`;

        return _util.request({
            url : url,
            method : 'POST',
            data : {
                pageNum,
                pageSize
            }
        });

    }

    getOrderDetail(orderNo){
        return _util.request({
            url : '/manage/order/detail.do',
            method : 'POST',
            data : {
                orderNo
            }
        });
    }

    sendGoods(orderNo){
        return _util.request({
            url : '/manage/order/send_goods.do',
            method : 'POST',
            data : {
                orderNo
            }
        });
    }

}

export default Order;