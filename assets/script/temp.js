var tmp = {
    dimension: {
        getDimScale(dim) {
            return ExpantaNum.pow(49,dim)
        },
        getDimMultiplier(i){
            let result = E.pow(this.getBoughtMultiplier(),player.dimensions[DIMENSIONS_BOUGHT][i].floor())
            
            if (player.dimBoost.gte(1)){
                
                result = result.mul(player.dimBoost.add(1).pow(2))
            }
            if (player.dimBoost.gte(5)){
                result = result.mul(E.max(1,getDimBoughts().div(24)))
            }
            if (player.dimBoost.gte(3) && i == 2-1){
                result = result.mul(E.max(1,player.dimensions[DIMENSIONS_BOUGHT][0].pow(0.3)))
            }
            if (player.dimBoost.gte(10) && i > 4-1 && i < 9-1){
                result = result.mul(dimBoostReward[5].effect())
            }
            if (player.dimBoost.gte(23)){
                result = result.mul(dimBoostReward[7].effect())
            }
            if (hasMM3Upg(1)){
                result = result.mul(player.PL1times.add(1).pow(3))
            }
            return result;
        },
        getDimExponentplier(dim){
            return ExpantaNum(1)
        },
        getBoughtMultiplier() {
            let temp1 = E(1.8)
            if (player.dimBoost.gte(9)){
                temp1 = temp1.add(player.dimBoost.pow(0.25).mul(0.04))
            }
            return temp1
        }
    },
    dimensionBoost: {
        require(){
            let req =  E.pow(7,E.add(E.mul(player.dimBoost,4),36));
            if (hasMM3Upg(1)){
                req = req.div("e10")
            }
            return req;
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