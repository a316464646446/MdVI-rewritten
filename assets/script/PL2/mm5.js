loadScriptFile("PL2/mm5dimensions.js")
loadScriptFile("PL2/upgradeTower.js")
loadScriptFile("PL2/reactor.js")
function norewardMM5reset(){
    norewardMM3reset();
    player.PL1Timespent = 0;
    player.PL2Timespent = 0
    player.dimBoostTimespent = 0;

    player.volumes = E(7);

    player.PL1inchal = 0;
    if (player.PL2times.lt(6)){
        player.PL1upgrades = [2,3,5,8,20];
        if (player.PL2times.gte(2)){
            player.PL1upgrades.push(1,4,6,9,13,14)
        }
    }
    player.PL1chal = [];
    if (player.PL2times.gte(2)){
        player.PL1chal.push(1,2)
    }
    player.PL1buyable1 = E(0);
    player.PL1times = E(0);
    player.PL1buyable2 = E(0);
    if (player.PL2times.lt(6)) player.PL1xiaopengyouPoints = E(0);
    else if (player.PL2times.lt(160)) player.PL1xiaopengyouPoints = player.PL1xiaopengyouPoints.root(2);

    if (player.PL2times.lt(6)) player.PL1xiaopengyouUnl = false;

    player.PL1points = E(0);
    if (player.PL2times.lt(400)) player.dimBoost = E(0);

    if (player.PL2times.lt(6)) player.dimBoost2 = E(0);
    player.PL2dimensionalEnergy = PowiainaNum.ZERO.clone();
    for (let i = 8; i<16; i++){
        player.dimensions[DIMENSIONS_POINTS][i] = player.dimensions[DIMENSIONS_BOUGHT][i].mul(10);
    }
}
function calcGetPL2resetTimes(){
    return PL2UpgEffect2()
}
function doMM5reset() {
    player.PL2points = player.PL2points.add(tmp.mm5.gain);
    player.PL2total = player.PL2total.add(tmp.mm5.gain);
    player.PL2times = player.PL2times.add(calcGetPL2resetTimes());
    player.isPL2unlocked = true;
    norewardMM5reset();
    if (player.PL2times.lt(2)){
        alert("目前你已经解锁了mm^5。");
        alert("但是你真的解锁了吗？");
    }
}

function doMM5resetManmade() {
    if (player.volumes.gte("e5e4")) {
        doMM5reset()
    }
}
function PL2UpgCost(id){
    switch(id){
        case 1:
            if (player.PL2RTupgrade1.gte(4)){
                return PowiainaNum.POSITIVE_INFINITY.clone()
            }
            return PowiainaNum.pow(5,player.PL2RTupgrade1.add(1))
        case 2:
            if (player.PL2RTupgrade2.gte(7)){
                return PowiainaNum.POSITIVE_INFINITY.clone()
            }
            return PowiainaNum(10).mul(PowiainaNum.pow(5,player.PL2RTupgrade2))
    }
}
function getRealPL2resetTimes(){
    return player.PL2times.sub(player.PL2resetTimesSpent);
}
function buyPL2Upg(id){
    if (getRealPL2resetTimes().gte(PL2UpgCost(id))){
        player.PL2resetTimesSpent = player.PL2resetTimesSpent.add(PL2UpgCost(id))
        if (id == 1) player.PL2RTupgrade1 = player.PL2RTupgrade1.add(1)
        if (id == 2) player.PL2RTupgrade2 = player.PL2RTupgrade2.add(1)
    }
}
function PL2UpgEffect1(){
    if (player.PL2RTupgrade1.eq(0)){
        return PowiainaNum.ONE.clone();
    }
    return getRealPL2resetTimes().max(PowiainaNum.sub(10,player.PL2RTupgrade1)).logarithm(PowiainaNum.sub(10,player.PL2RTupgrade1))
}
function PL2UpgEffect2(){
    return PowiainaNum.pow(4,player.PL2RTupgrade2).max(1)
}

function mm5Loop(){
    if (player.PL2times.gte(7000)){
        player.PL2points = player.PL2points.add(tmp.mm5.gain.mul(globalDiff))
    }
    if (player.PL2times.gte(250000)){
        player.XP = player.XP.add(PowiainaNum.mul(10,globalDiff))
    }
    player.PL2theoChoose = [...(new Set(player.PL2theoChoose))];
    if (hasTheorie(31) && hasTheorie(32)){
        player.isUnlockedDimBoost3 = true
    }
}