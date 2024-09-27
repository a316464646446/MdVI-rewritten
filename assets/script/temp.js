var tmp = {
    dimension: {
        getDimScale(dim) {
            // dim = 1-8
            return ExpantaNum.pow(49,dim).pow(
                player.PL1inchal==1 ? 2 : 1
            )
        },
        getBoughtDimsAftere400(dim){
            // param dim 1-8

            let basebought = player.volumes.div(dimBasePrice[dim-1]).logarithm(this.getDimScale(dim));
            let finbought = E(1);
            let e400Bought = ExpantaNum.div("e400",dimBasePrice[dim-1]).logarithm(this.getDimScale(dim));
            finbought = softcap(basebought, e400Bought, 0.5, "pow");

            finbought = finbought.add(1)

            if (player.PL1chal.includes(1)){
                finbought = finbought.mul(1.02)
            }
            return finbought

        },
        getDimMultiplier(i){
            let result = E.pow(this.getBoughtMultiplier(),player.dimensions[DIMENSIONS_BOUGHT][i])
            
            if (getRealDimBoost().gte(1)){
                
                result = result.mul(player.dimBoost.add(1).pow(2))
            }
            if (getRealDimBoost().gte(5)){
                result = result.mul(E.max(1,getDimBoughts().div(24)))
            }
            if (getRealDimBoost().gte(3) && i == 2-1){
                result = result.mul(E.max(1,player.dimensions[DIMENSIONS_BOUGHT][0].pow(0.3)))
            }
            if (getRealDimBoost().gte(10) && i > 4-1 && i < 9-1){
                result = result.mul(dimBoostReward[5].effect())
            }
            if (getRealDimBoost().gte(23)){
                result = result.mul(dimBoostReward[7].effect())
            }
            if (hasMM3Upg(1)){
                result = result.mul(player.PL1times.add(1).pow(3).overflow(4096,0.2))
            }

            if (hasMM3Upg(12)){
                result = result.mul(player.PL1points.div(2).pow(0.75).max(1))
            }
            return result;
        },
        getDimExponentplier(dim){
            let temp1 = ExpantaNum(1);
            if (player.dimBoost2.gte(1)){
                temp1 = temp1.add(0.01)
            }
            return temp1
        },
        getBoughtMultiplier() {
            let temp1 = E(1.8)
            if (player.dimBoost.gte(9)){ 
                temp1 = temp1.add(getRealDimBoost().pow(0.25).mul(0.04))
            }
            temp1 = temp1.mul(xiaopengyouEffect1().max(1))
            return temp1
        }
    },
    dimensionBoost: {
        require(){
            let req =  E.pow(7,E.add(E.mul(player.dimBoost,4),36));
            if (hasMM3Upg(1)){
                req = req.div(tmp.dimensionBoost.requireDivision())
            }
            return req;
        },
        require2(){
            let req = E.pow(10,E.add(900,E.pow(E.mul(15,player.dimBoost2),2)))

            return req
        },
        requireDivision(){
            
            return E(1).mul(hasMM3Upg(1) ? "e10" : 1).mul(E.max(1,hasMM3Upg(16) ? player.PL1xiaopengyouPoints.pow(10) : 1))
        }
    },
    mm4: {
        get gain(){
            let temp1 = player.dimensions[DIMENSIONS_POINTS][0]
            temp1 = temp1.mul(player.dimensions[DIMENSIONS_MULTI][0])
            temp1 = temp1.pow(player.dimensions[DIMENSIONS_EXPONENT][0])


            return temp1
        },
        get softcapped1(){
            return false
        },
        get softcap1power(){
            return 1
        },
        get softcap1start(){
            return K9E15
        }
    },
    mm3: {
        get gain(){
            return E(player.volumes.div("1e100").root(100).div(10)).mul(getBuyableEffect(1)).floor()
            
        }
    }
}