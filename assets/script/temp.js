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
            let e400Bought = ExpantaNum.div("1e400",dimBasePrice[dim-1]).logarithm(this.getDimScale(dim));
            finbought = softcap(basebought, e400Bought, hasTheorie(61) ? 0.6 : 0.5, "pow");

            finbought = finbought.add(1)

            if (player.PL1chal.includes(1)){
                finbought = finbought.mul(1.02)
            }
            finbought = finbought.mul(PL2UpgEffect1().max(1))
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
            result =result.mul(tmp.mm5.energyTo4DDimensions().max(1))
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

            if (player.dimBoost3.gte(2)) temp1 = temp1.add(dimBoostReward3[1].effect())

            return temp1
        }
    },
    dimensionBoost: {
        require(){
            let req =  E.pow(hasTheorie(11) ? 3.205 : 7,E.add(E.mul(player.dimBoost,4),36));
            if (hasMM3Upg(1)){
                req = req.div(tmp.dimensionBoost.requireDivision())
            }
            return req;
        },
        require2(){
            let req = E.pow(10,E.add(900,E.pow(E.mul(hasTheorie(51) ? 2 :15,player.dimBoost2),2)))

            return req
        },
        require3(){
            let req = E.add(200,player.dimBoost3.mul(20))

            return req
        },
        bulkDB2(){
            let bulk = player.volumes.log10().sub(900).pow(0.5).div(hasTheorie(51) ? 2 :15).ceil();
            return bulk
        },
        requireDivision(){
            
            return E(1).mul(hasMM3Upg(1) ? "e10" : 1).mul(E.max(1,hasMM3Upg(16) ? player.PL1xiaopengyouPoints.pow(10) : 1)).mul(
                hasTheorie(41) ? "1e10000" : 1

            )
        }
    },
    mm4: {
        get gain(){
            let temp1 = player.dimensions[DIMENSIONS_POINTS][0]
            temp1 = temp1.mul(player.dimensions[DIMENSIONS_MULTI][0])
            temp1 = temp1.pow(player.dimensions[DIMENSIONS_EXPONENT][0])

            if (player.PL2times.eq(1)){
                temp1 = softcap(temp1,this.softcap1start,this.softcap1power)
            }
            return temp1
        },
        get softcapped1(){
            return player.PL2times.eq(1) ? player.volumes.gte(this.softcap1start) : 0;
        },
        get softcap1power(){
            return 0.9
        },
        get softcap1start(){
            return new PowiainaNum("3.2050e1050")
        }
    },
    mm3: {
        get gain(){
            return E(player.volumes.div("1e100").root(100).div(10)).mul(getBuyableEffect(1)).mul(
                player.PL2times.gte(2) ? 1000 : 1
            ).floor()
            
        },


        xiaopengyouCap(){
            let temp1 = new PowiainaNum(264454438000);

            if (hasBattleUpgrade(1)){
                temp1 = temp1.mul(getBattleUpgradeEffect(1));
            }
            if (player.PL2times.gte(1500000)){
                temp1 = temp1.pow(2)
            }
            return temp1;
        }
    },
    mm5: {
        get gain(){
            return E(player.volumes.pow(2).div("1e35000").root(65000).div(10)).floor()
        },
        getDimMultiplierafter8(id){
            // id: 9-16
            let temp1 = this.getBoughtMultiplierafter8().pow(player.dimensions[DIMENSIONS_BOUGHT][id-1]);

            return temp1
            
        },
        getBoughtMultiplierafter8() {
            let temp1 = E(2)
            return temp1
        },
        energyTo4DDimensions(){
            return player.PL2dimensionalEnergy.max(1).pow(this.energyeffectExponent())
        },
        energyeffectExponent(){
            let temp1 =  PowiainaNum(1200)
            if (hasTheorie(32)) temp1 = PowiainaNum(1500)
            return temp1;
        }
    },
    battle: {
        get feature1Effect(){
            let temp1 =  player.fillFeatureProgress1.max(1).logarithm(10).max(0);
            if (player.PL2times.lt(1000000)) temp1=temp1.min(100000);
            return temp1
        },
        get feature2Effect(){
            return player.fillFeatureProgress2.max(1).logarithm(10).max(0).min(1000000).mul(100);
        },
        get feature3Effect(){
            return player.fillFeatureProgress3.max(1).logarithm(10).max(0).min(100000);
        }
    }
}