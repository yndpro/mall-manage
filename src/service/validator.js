
export default class Validator {

    constructor(){
        this.cache = [];
    }

    add(value,rules){
        for(let i = 0;i < rules.length;i++){
            let rule = rules[i];
            let strategyArr = rule.strategy.split(':');
            let strategy = strategyArr.shift();
            strategyArr.unshift(value);
            strategyArr.push(rule.errorMsg);
            /*入栈*/
            this.cache.push(function(){
                /*console.log(strategyArr);*/
                return strategies[strategy].apply(this,strategyArr);
            })
        }
        return this;
    }

    start(){
        for(let i = 0;i < this.cache.length;i++){
            let errorMsg = this.cache[i]();
            if(errorMsg){
                return errorMsg
            }
        }
    }
}



let strategies = {
    isNonEmpty(value, errorMsg) {
        return value === '' ?
            errorMsg : void 0
    },
    isString(value, errorMsg){
        return typeof value === 'string' ?
            void 0 : errorMsg
    },
    isNumber(value, errorMsg){
        console.log(value);
        return typeof value === 'number' && !isNaN(value) ?
            void 0 : errorMsg
    },
    minNumber(value,minNum,errorMsg){
        console.log(value,minNum);
        return value > parseInt(minNum) ?
            void 0 : errorMsg
    },
    maxNumber(value,maxNum,errorMsg){
        return value < parseInt(maxNum) ?
            void 0 : errorMsg
    },
    minNumberInc(value,minNum,errorMsg){
        return value >= parseInt(minNum) ?
            void 0 : errorMsg
    },
    maxNumberInc(value,minNum,errorMsg){
        return value <= parseInt(minNum) ?
            void 0 : errorMsg
    },
    isMoblie(value, errorMsg) {
        if(value === "")
            return void 0;

        return !/^0?(13|14|15|17|18)[0-9]{9}$/.test(value) ?
            errorMsg : void 0
    },
    isQQ(value, errorMsg) {
        if(value == "")
            return void 0;

        return !/^[1-9][0-9]{4,10}$/.test(value) ?
            errorMsg : void 0
    }
};

