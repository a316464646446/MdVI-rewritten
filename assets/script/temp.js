var tmp = {
    dimension: {
        getDimScale(dim) {
            return ExpantaNum.pow(49,dim).pow(
                player.PL1inchal==1 ? 2 : 1
            )
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
                result = result.mul(player.PL1times.add(1).pow(3).overflow(4096,0.2))
            }
            return result;
        },
        getDimExponentplier(dim){
            let temp1 = ExpantaNum(1);
            if (player.PL1inchal==2){
                if ((1-1)<dim){
                    return ExpantaNum(0).add(ExpantaNum.min(player.dimBoost.gt(3) ? 0.8 : 0.7,player.dimBoostTimespent/30));
                }else{
                    return player.dimBoost.gt(3) ? ExpantaNum(3) : ExpantaNum(1.5);
                }
            }
            if (player.PL1inchal==3){
                if (1-1==dim){
                    return E(1.1)
                }
            }
            return temp1
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
            temp1 = temp1.pow(player.dimensions[DIMENSIONS_EXPONENT][0])

            temp1 = softcap(temp1,this.softcap1start,this.softcap1power,"pow")

            return temp1
        },
        get softcapped1(){
            return this.gain.gt("1e200")
        },
        get softcap1power(){
            return 0.5
        },
        get softcap1start(){
            return E("e200")
        }
    },
    mm3: {
        get gain(){
            if (!player.PL1breakedPL1limit){
                return E(1).mul(getBuyableEffect(1))
            }else{
                return E(player.volumes.div("1e180").root(20).div(10)).mul(getBuyableEffect(1)).floor()
            }
        }
    }
}