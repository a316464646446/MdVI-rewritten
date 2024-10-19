function getTheorieP(id){
    let resource = PowiainaNum.NaN.clone();

    if (id==1) resource = player.volumes.clone();
    if (id==2) resource = player.PL1points.clone();
    if (id==3) resource = player.PL2points.clone();

    if (resource.gte(theorieNeed(id))){
        player[`PL2theoTyp${id}`] = player[`PL2theoTyp${id}`].add(1);

    }
}
function getMaxTheorie(){
    for (let id = 1; id < 4 ; id++){
        if (player[`PL2theoTyp${id}`].lt(bulkTheorieTimes(id))){
            player[`PL2theoTyp${id}`] = bulkTheorieTimes(id).clone();
        }
    }
}
function refundTheorie(){
    if (player.PL2theoChoose.length == 0) return;
    norewardMM5reset();
    player.PL2theoChoose = [];
    player.PL2theorieSpent = PowiainaNum.ZERO.clone();

}
const theorieCost = {
    11: 4,
    21: 6, 
    31: 80, 32: 255,
    41: 30,
    51: 40,
    61: 60,
    71: 560,
}
function buyTheorie(id){
    if (theorieTotal().gte(theorieCost[id]) && !hasTheorie(id)){
        player.PL2theorieSpent = player.PL2theorieSpent.add(theorieCost[id])
        player.PL2theoChoose.push(id);
    }
}
function theorieTotal(){
    return player.PL2theoTyp1.add(player.PL2theoTyp2).add(player.PL2theoTyp3).sub(player.PL2theorieSpent)
}

function bulkTheorieTimes(id){
    switch (id){
        case 1:
            return player.volumes.log10().sub(1000000).div(200000).ceil();
        case 2:
            return player.PL1points.log10().sub(12000).div(2000).ceil();
        case 3:
            return player.PL2points.log10().sub(40).ceil();
    }

}
function hasTheorie(id){
    return player.PL2theoChoose.includes(id)
}
function theorieNeed(id){
    switch (id){
        case 1:
            return PowiainaNum.pow(10, PowiainaNum.add(
                1000000,PowiainaNum.mul(player.PL2theoTyp1,200000)
            ))
        case 2:
            return PowiainaNum.pow(10, PowiainaNum.add(
                12000,PowiainaNum.mul(player.PL2theoTyp2,2000)
            ))
        case 3:
            return PowiainaNum.pow(10, PowiainaNum.add(
                40, PowiainaNum.mul(player.PL2theoTyp3,1)
            ))
    }
}