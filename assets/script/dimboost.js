function dimBoost() {
    if (player.volumes.gte(tmp.dimensionBoost.require())){
        player.dimBoost = player.dimBoost.add(1)
        resetDimensions();
        if (player.dimBoost.gte(14)){
            player.volumes = dimBoostReward[6].effect()
        }else{
            player.volumes = E(7)
        }
    }
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
            return "×"+format(player.dimBoost.add(1).pow(2))
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
            return "+"+format(player.dimBoost.pow(0.25).mul(0.04))
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
        desc: "每一个维度提升使所有维度×1.3",
        effect() {
            return E.pow(1.3,player.dimBoost)
        },
        get effectDisplay() {
            return "×"+format(this.effect())
        }
    }
]

function dimBoostDescription(){
    let a =  `重置4维体积，1-8维度，但进行一次维度提升<br>价格：${format(tmp.dimensionBoost.require())} mm<sup>4</sup>`
    let x = player.dimBoost;
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
                return a;
            }
        }
    }
    return a
}

function statBoosts() {
    let temp1 = "";
    let x = player.dimBoost;
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
    return temp1;

}