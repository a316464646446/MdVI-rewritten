var player = {};
var thisFrame = Date.now();
var lastFrame = Date.now();

var isHoldMax = false;
var globalDiff = 0;
var realityDiff = 0;
function loop(){
    thisFrame = Date.now();
    window.realityDiff = (thisFrame-lastFrame)/1000;
    window.globalDiff = realityDiff;
    updateOffline();
    updateDimensionData();
    calculateDimensions();
    updateVolumes();
    fixInfinity();
    automationLoop();
    mm3Loop();
    updateTime();
    xiaopengyouLoop();
    player.time = thisFrame
    lastFrame = thisFrame;
}
function updateTime(){
    player.dimBoostTimespent = player.dimBoostTimespent+globalDiff;
    player.PL1Timespent = player.PL1Timespent+globalDiff;
}
/*
function updateAuto() {
    if (hasMM3Upg(2)){
        for (let i = 1; i<=8; i++){
            if (player.auto.includes(i)){
                buydim(i,true);
            }
        }
    }
    if (hasMM3Upg(3)){
        if (player.auto.includes(9) && player.volumes.lt(mm3Require)){
            dimBoost()
        }
    }
}*/

function buyable(dim) {
    if (player.PL1inchal == 3){
        if (dim > 6){
            return false
        }
    }
    let temp1 = player.dimensions[DIMENSIONS_COST][dim - 1]
    if (player.volumes.gte(mm3Require)  && !player.PL1breakedPL1limit){
        return false
    }
    if (player.PL1breakedPL1limit){
        return true
    }
    return player.volumes.gte(temp1)
}

function buyall(){
    buydim(1);
    buydim(2);
    buydim(3);
    buydim(4);
    buydim(5);
    buydim(6);
    buydim(7);
    buydim(8);
}

function calculateDimensions() {
    for (let i = 0; i < 7; i++) {
        player.dimensions[DIMENSIONS_POINTS][i] = player.dimensions[DIMENSIONS_POINTS][i]
            .add(
                player.dimensions[DIMENSIONS_POINTS][i + 1]
                    .mul(player.dimensions[DIMENSIONS_MULTI][i + 1])
                    .pow(player.dimensions[DIMENSIONS_EXPONENT][i + 1])
                    .mul(globalDiff)
            );
        if (player.dimensions[DIMENSIONS_POINTS][i].isNaN()) {
            player.dimensions[DIMENSIONS_POINTS][i] = E(0);
        }
    }
}

function updateDimensionData() {
    if (isHoldMax){
        buyall();
    }
    for (let i = 0; i < 8; i++) {
        player.dimensions[DIMENSIONS_MULTI][i] = tmp.dimension.getDimMultiplier(i);
        player.dimensions[DIMENSIONS_EXPONENT][i] = tmp.dimension.getDimExponentplier(i);
        player.dimensions[DIMENSIONS_COST][i] = calc_cost(i, player.dimensions[DIMENSIONS_BOUGHT][i])
    }

}
const dimBasePrice=[7,7**2,7**3,7**4,7**5,7**6,7**7,7**8]
function calc_cost(dimid, count) {
    if (player.PL1inchal == 3){
        if (dimid > 6-1){
            return K9E15
        }
    }
    if (player.PL1breakedPL1limit){
        return K9E15
    }
    // count before buy
    // 1st dimension dimid = 0
    let temp1 = 
        E.mul(dimBasePrice[dimid],tmp.dimension.getDimScale(dimid + 1).pow(count.floor()));

    return temp1;
}
function updateVolumes() {
    player.volumes = player.volumes.add(tmp.mm4.gain.mul(globalDiff))
}
function buydim(dim, single = false) {
    if (player.PL1breakedPL1limit){
        let buycountTotal = tmp.dimension.getBoughtDimsAftere400(dim);
        let boughtNow = player.dimensions[DIMENSIONS_BOUGHT][dim - 1];
        if (buycountTotal.gt(boughtNow)){
            let buyCount = buycountTotal.sub(boughtNow);
            player.dimensions[DIMENSIONS_BOUGHT][dim - 1] = player.dimensions[DIMENSIONS_BOUGHT][dim - 1].add(buyCount);
            player.dimensions[DIMENSIONS_POINTS][dim - 1] = player.dimensions[DIMENSIONS_POINTS][dim - 1].add(buyCount.mul(10)); 

        }
        return true;
    }
    if (buyable(dim)) {
        let temp1 = player.volumes.logarithm(tmp.dimension.getDimScale(dim))
        let temp2 = (player.dimensions[DIMENSIONS_COST][dim - 1]).logarithm(tmp.dimension.getDimScale(dim))
        let bought_now = player.dimensions[DIMENSIONS_BOUGHT][dim - 1];
        let buycount = temp1.sub(temp2).ceil();
        let temp3 = buycount.clone();

        if (buycount.lt(1)) {
            buycount = E(1)
        }
        
        if (single) {
            buycount = E(1)
        }
        player.dimensions[DIMENSIONS_BOUGHT][dim - 1] = player.dimensions[DIMENSIONS_BOUGHT][dim - 1].add(buycount);
        player.dimensions[DIMENSIONS_POINTS][dim - 1] = player.dimensions[DIMENSIONS_POINTS][dim - 1].add(buycount.mul(10)); //     player.volumes = player.volumes.sub(E.pow(10,temp1.mul(dim).ceil()))


        return true
    }
    return false


}


function toggleAutobuyer(i) {
    let temp1 = player.auto.indexOf(i)
    if (temp1 == -1) {
        player.auto.push(i)
    } else {
        player.auto.splice(temp1, 1)
    }
}

(function() {
    document.addEventListener('DOMContentLoaded', function(e) {
        load(e);
        window.loopVal = setInterval(loop, 1000/30)
        window.saveVal = setInterval(save, 1000);
    });
})();

function isEndgame(){
    return player.volumes.gt(Endgame)
}

function softcap(value,start,power,mode,dis=false){
    var x = value.clone()
    if (!dis&&x.gte(start)) {
        if ([0, "pow"].includes(mode)) x = x.div(start).max(1).pow(power).mul(start)
        if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start)
        if ([2, "log"].includes(mode)) x = x.div(start).log(power).add(1).mul(start)
    }
    return x
}

function enterFinalChallenge(){
    if (player.volumes.gte("J^99999999999998 (10{9})^8 (10{8})^8 (10{7})^8 (10{6})^8 (10{5})^8 (10^^^^)^8 (10^^^)^8 (10^^)^8 (10^)^8 10000000000")){
        alert("请等待游戏更新!");
    }else{
        alert("经过推测，进入最终挑战需要约K1.000e14个某个资源，现在你还没有能力实现...")
    }
}