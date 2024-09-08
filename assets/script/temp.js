var tmp = {
    dimension: {
        getDimScale(dim) {
            return ExpantaNum.pow(49,dim)
        },
        getDimMultiplier(i){
            let result = ExpantaNum(1.8);
            result = result.pow(player.dimensions[DIMENSIONS_BOUGHT][i].floor())
            return result;
        },
        getDimExponentplier(dim){
            return ExpantaNum(1)
        }
    },
    mm4: {
        get gain(){
            let temp1 = player.dimensions[DIMENSIONS_POINTS][0]
            temp1 = temp1.mul(player.dimensions[DIMENSIONS_MULTI][0])
            return temp1
        }
    }
}