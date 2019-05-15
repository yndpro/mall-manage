import axios from 'axios';
import qs from 'qs';

class Util{

    get(){

    }

    post(url = "",data){
        return axios({
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url,
        })
            .then(response => response.data); // parses response to JSON
    }
}

export default Util;