const automationTypes = {
    "buydim1": {
        time(){return hasMM3Upg(6) ? 0 : 0.5*(0.4**player.PL1autoupg1)},
        action(){buydim(1)},
        canAction(){return buyable(1) && player.auto.includes(1)},
        text: "自动购买维度1",
        upgradable(){
            return player.PL1chal.includes(1) && player.PL1autoupg1 < 3
        },
        cost() {
            return 1*Math.floor(1.2**player.PL1autoupg1)
        },
        upgradeEffect: "缩短60%间隔",
        tryUpgrade() {
            if (ExpantaNum.lte(this.cost(),player.PL1points)){
                player.PL1points = player.PL1points.sub(this.cost());
                player.PL1autoupg1++;
            }
        }
    },
    "buydim2": {
        time(){return hasMM3Upg(6) ? 0 : 0.6*(0.5**player.PL1autoupg2)},
        action(){buydim(2)},
        canAction(){return buyable(2) && player.auto.includes(2)},
        text: "自动购买维度2",
        upgradable(){
            return player.PL1chal.includes(2) && player.PL1autoupg2 < 4
        },
        cost() {
            return 1*Math.floor(2**player.PL1autoupg2)
        },
        upgradeEffect: "缩短50%间隔",
        tryUpgrade() {
            if (ExpantaNum.lte(this.cost(),player.PL1points)){
                player.PL1points = player.PL1points.sub(this.cost());
                player.PL1autoupg2++;
            }
        }
    },
    "buydim3": {
        time(){return hasMM3Upg(6) ? 0 :  0.7},
        action(){buydim(3)},
        canAction(){return buyable(3) && player.auto.includes(3)},
        text: "自动购买维度3"
    },
    "buydim4": {
        time(){return hasMM3Upg(6) ? 0 : 0.8},
        action(){buydim(4)},
        canAction(){return buyable(4) && player.auto.includes(4)},
        text: "自动购买维度4"
    },
    "buydim5": {
        time(){return hasMM3Upg(6) ? 0 : 0.9},
        action(){buydim(5)},
        canAction(){return buyable(5) && player.auto.includes(5)},
        text: "自动购买维度5"
    },
    "buydim6": {
        time(){return hasMM3Upg(7) ? 0 :1},
        action(){buydim(6)},
        canAction(){return buyable(6) && player.auto.includes(6)},
        text: "自动购买维度6"
    },
    "buydim7": {
        time(){return hasMM3Upg(7) ? 0 :1.2},
        action(){buydim(7)},
        canAction(){return buyable(7) && player.auto.includes(7)},
        text: "自动购买维度7"
    },
    "buydim8": {
        time(){return hasMM3Upg(7) ? 0 :1.5},
        action(){buydim(8)},
        canAction(){return buyable(8) && player.auto.includes(8)},
        text: "自动购买维度8"
    },

    "dimboost":{
        time() {return 4*(0.25**player.PL1autoupgDIMBOOST)},
        action(){dimBoost()},
        canAction(){return player.volumes.gte(tmp.dimensionBoost.require()) && player.auto.includes(9)},
        text: "自动维度提升",
        unlocked(){
            return hasMM3Upg(3)
        },
        upgradable(){
            return player.PL1chal.includes(3) && player.PL1autoupgDIMBOOST < 4
        },
        cost() {
            return 1*Math.floor(2**player.PL1autoupgDIMBOOST)
        },
        upgradeEffect: "缩短75%间隔",
        tryUpgrade() {
            if (ExpantaNum.lte(this.cost(),player.PL1points)){
                player.PL1points = player.PL1points.sub(this.cost());
                player.PL1autoupgDIMBOOST++;
            }
        }
    },
    "mm3reset": {
        time() {return 3*(0.6**player.PL1autoupgMM3RESET)},
        action(){doMM3reset()},
        canAction(){return player.volumes.gte(mm3Require) && player.auto.includes(10)},
        text: "自动mm<sup>3</sup>重置",
        unlocked(){
            return player.PL1chal.includes(3)
        },
        upgradable(){
            return hasMM3Upg(10) && player.PL1autoupgMM3RESET<7
        },
        cost() {
            return 2*(4**player.PL1autoupgMM3RESET)
        },
        upgradeEffect: "缩短40%间隔",
        tryUpgrade() {
            if (ExpantaNum.lte(this.cost(),player.PL1points)){
                player.PL1points = player.PL1points.sub(this.cost());
                player.PL1autoupgMM3RESET++;
            }
        }
    }
}
function getAutomationTabDetail(){
    let result = ""
    for (const type in automationTypes){
        if (automationTypes[type].unlocked === undefined || automationTypes[type].unlocked()){
            result = result.concat(automationTypes[type].text)
            result = result.concat(" 间隔: ");
            result = result.concat(formatTime.fromSeconds(automationTypes[type].time()))
            if (automationTypes[type].upgradable !== undefined && automationTypes[type].upgradable()){
                result = result.concat(` <button class=\"btn mm3btn\" onclick="upgradeAuto('${type}')">${automationTypes[type].upgradeEffect} 价格：${format(automationTypes[type].cost())} mm<sup>3</sup> </button>`);

            }
            result = result.concat("<br>")
        }
    }
    return result
}
function upgradeAuto(type){
    automationTypes[type].tryUpgrade();
}
function automationLoop(){
    for (const type in automationTypes){
        if (player.automationState[type] === undefined){
            player.automationState[type] = {
                lastRun: Date.now()
            }
        }

        if (automationTypes[type].canAction() && (( Date.now()-player.automationState[type].lastRun)/1000>=automationTypes[type].time())){
            automationTypes[type].action()
            player.automationState[type].lastRun = Date.now()
        }
        
    }
}