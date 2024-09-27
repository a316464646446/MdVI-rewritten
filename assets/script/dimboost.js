function dimBoost() {
    if (player.volumes.gte(tmp.dimensionBoost.require())){
        if (!hasMM3Upg(5)){
            player.dimBoost = player.dimBoost.add(1)
        }else{
            player.dimBoost = E.max(player.dimBoost,
                player.volumes.mul(tmp.dimensionBoost.requireDivision()).logarithm(7).sub(36).div(4).ceil() 
            )
        }
        if (!hasMM3Upg(9)){
            resetDimensions();
            player.dimBoostTimespent = 0;
            if (player.dimBoost.gte(14)){
                player.volumes = dimBoostReward[6].effect()
            }else{
                player.volumes = E(7)
            }
        }
    }
}
function getRealDimBoost(){
    let temp1 = player.dimBoost.add(xiaopengyouEffect2())
    if (player.PL1inchal==2){
        temp1 = temp1.mul(0.1)
    }
    return temp1
}
function getDimBoughts() {
    let x = E(0);
    for (let i = 0; i < 8 ;i++){
        x = x.add(player.dimensions[DIMENSIONS_BOUGHT][i])
    }
    return x
}
const dimBoostReward=[
    {
        req: E(0),
        desc: "购买维度时不消耗4维体积"
    },
    {
        req: E(1),
        desc: "基于维度提升数量提升1-8维度乘数 (1+n)<sup>2</sup>",
        get effectDisplay(){
            return "×"+format(getRealDimBoost().add(1).pow(2))
        }
    },
    {
        req: E(5),
        desc: "基于购买维度的次数提升1-8维度乘数 max(1,n/32)",
        get effectDisplay() {
            return "×"+format(E.max(1,getDimBoughts().div(24)))
        }
    },
    {
        req: E(7),
        desc: "第1维度购买数量提升第2维度乘数 max(1,n<sup>0.3</sup>)",
        get effectDisplay() {
            return "×"+format(E.max(1,player.dimensions[DIMENSIONS_BOUGHT][0].pow(0.3)))
        }
    },
    {
        req: E(9),
        desc: "基于维度提升数量提升每次购买乘数 +0.04n<sup>0.25</sup>",
        get effectDisplay() {
            return "+"+format(getRealDimBoost().pow(0.25).mul(0.04))
        }
    },
    {
        req: E(10), 
        desc: "基于4维体积提升第5-8维度乘数(软上限于10000开始) max((n×1.000e-40)<sup>0.1</sup>,1)",
        effect() {
            return player.volumes.div("1e40").root(10).overflow(10000,0.2).max(1)
        },
        get effectDisplay() {
            return "×"+format(this.effect()) + (this.effect().gte(10000) ?"<span class=\"soft\">(受软上限限制)</span>" : "")
        }
    },
    {
        req: E(14),
        desc: "重置时保留7<sup>log<sub>7</sub>(x)×0.5</sup> 4维体积",
        effect() {
            if (player.volumes.gte(7)){
                return E.pow(7,player.volumes.logarithm(7).mul(0.5)).max(7)
            }else{
                return E(7)
            }
        },
        get effectDisplay() {
            return "重置后保留"+format(this.effect())+" mm<sup>4</sup>"
        }
    },
    {//[7]
        req: E(23),
        get desc(){ 
            return "每一个维度提升使所有维度×"+format(this.base) 
        },
        effect() {
            return E.pow(this.base,getRealDimBoost())
        },
        get effectDisplay() {
            return "×"+format(this.effect())
        },
        get base(){
            let base = E(1.3);
            if (hasMM3Upg(17)) base=base.mul(player.PL1xiaopengyouPoints.logarithm(7).logarithm(7).mul(1.3).max(1));
            return base;
        }
    }
]

function dimBoostDescription(){
    let a =  `重置4维体积，1-8维度，但进行一次维度提升<br>价格：${format(tmp.dimensionBoost.require())} mm<sup>4</sup>`
    let x = getRealDimBoost();
    if (x.lt(dimBoostReward[dimBoostReward.length-1].req)){
        for (let i=0;i<dimBoostReward.length;i++){
            if (x.lt(dimBoostReward[i].req)){
                a = a.concat("<br>在")
                a = a.concat(dimBoostReward[i].req.format())
                a = a.concat("维度提升, ")
                a = a.concat(dimBoostReward[i].desc)
                if (dimBoostReward[i].effectDisplay){
                    a = a.concat("<br>当前:");
                    a = a.concat(dimBoostReward[i].effectDisplay);
                }
                break;
            }
        }
    }
    return a
}

function statBoosts() {
    let temp1 = "";
    let x = getRealDimBoost();
    for (let i=0;i<dimBoostReward.length;i++){
        if (x.gte(dimBoostReward[i].req)){
            let a = "";
            a = a.concat("<br>在")
            a = a.concat(dimBoostReward[i].req.format())
            a = a.concat("维度提升, ")
            a = a.concat(dimBoostReward[i].desc)
            if (dimBoostReward[i].effectDisplay){
                a = a.concat("  当前:");
                a = a.concat(dimBoostReward[i].effectDisplay);
            }
            temp1 = temp1.concat(a)
            temp1 = temp1.concat("<br>")
            a = ""
        }
    }
    temp1 = temp1.concat("<br>")
    let y = player.dimBoost2;
    for (let i=0;i<dimBoostReward2.length;i++){
        if (y.gte(dimBoostReward2[i].req)){
            let a = "";
            a = a.concat("<br>在")
            a = a.concat(dimBoostReward2[i].req.format())
            a = a.concat("维度提升^2, ")
            a = a.concat(dimBoostReward2[i].desc)
            if (dimBoostReward2[i].effectDisplay){
                a = a.concat("  当前:");
                a = a.concat(dimBoostReward2[i].effectDisplay);
            }
            temp1 = temp1.concat(a)
            temp1 = temp1.concat("<br>")
            a = ""
        }
    }
    return temp1;

}
const dimBoostReward2 = [

    {
        req: E(1),
        desc: "1-8维度指数+0.01",
    },
    {
        req: E(2),
        desc: "基于维度提升^2的数量提升小朋友获取",
        effect(){
            return player.dimBoost2.root(2).max(1)
        },
        get effectDisplay(){
            return "×"+format(this.effect())
        }
    }
]
function dimBoost2(){
    if (player.volumes.gte(tmp.dimensionBoost.require2())){
        player.dimBoost2 = player.dimBoost2.add(1)
        player.dimBoostTimespent = 0;
        resetDimensions();
        player.volumes = E(7)
        player.dimBoost = E(35)

    }

}


function dimBoost2Description(){
    let a =  `重置4维体积，1-8维度，和维度提升但进行一次维度提升<br>价格：${format(tmp.dimensionBoost.require2())} mm<sup>4</sup>`
    let x = getRealDimBoost();
    if (x.lt(dimBoostReward2[dimBoostReward2.length-1].req)){
        for (let i=0;i<dimBoostReward2.length;i++){
            if (x.lt(dimBoostReward2[i].req)){
                a = a.concat("<br>在")
                a = a.concat(dimBoostReward2[i].req.format())
                a = a.concat("维度提升^2, ")
                a = a.concat(dimBoostReward2[i].desc)
                if (dimBoostReward2[i].effectDisplay){
                    a = a.concat("<br>当前:");
                    a = a.concat(dimBoostReward2[i].effectDisplay);
                }
                return a;
            }
        }
    }
    return a
}