const mm3UpgradeCost = [
    1, 1, 3, 10, 15, 25, 40, 60, 95, 240, 0
]
function hasMM3Upg(x){
    return player.PL1upgrades.includes(x)
}
function buyMM3Upg(x){
    if (player.PL1points.gte(mm3UpgradeCost[x-1]) && !hasMM3Upg(x)){
        player.PL1upgrades.push(x);
        player.PL1points = player.PL1points.sub(mm3UpgradeCost[x-1])
    }
}

function fixInfinity(){
    if (hasMM3Upg(11)){
        player.PL1breakedPL1limit = true
    }
    if (player.volumes.gte(mm3Require) && !player.PL1breakedPL1limit){
        player.volumes = mm3Require.clone();
    }
}

function norewardMM3reset(){
    resetDimensions();
    player.PL1Timespent = 0;
    player.dimBoostTimespent = 0;
    player.dimBoost = E(hasMM3Upg(7) ? 35 : 
        (hasMM3Upg(6) ? 10 : 0)
    );
    player.volumes = E(7);
    player.PL1inchal = 0;
}

function doMM3reset() {
    player.PL1points = player.PL1points.add(tmp.mm3.gain);
    player.PL1total = player.PL1total.add(1);
    player.PL1times = player.PL1times.add(1);
    player.isPL1unlocked = true;
    norewardMM3reset();
}

function doMM3resetManmade() {
    if (player.volumes.gte(mm3Require)) {
        if (player.PL1inchal != 0){
            player.PL1chal.push(player.PL1inchal);
        }
        doMM3reset()
    }
}

function mm3Loop(){
    player.PL1upgrades = [...(new Set(player.PL1upgrades))]
}

function enterNorChal(x){
    if (player.PL1inchal != x){
        norewardMM3reset();
        player.PL1inchal = x;
    }
}
function exitChal(){
    if (player.PL1inchal != 0){
        if (player.volumes.gte(mm3Require)){
            player.PL1chal.push(player.PL1inchal);
            doMM3reset();
            
        }else{
            norewardMM3reset();
        }
        player.PL1inchal = 0;
    }
}
function getChalClass(x){
    if (player.PL1inchal==x){
        return "inchal"
    }else{
        if (player.PL1chal.includes(x)){
            return "unlocked"
        }
    }
}
function displayChallenge(){
    if (player.PL1inchal == 0){
        return "你当前不在任何挑战中"
    }else{
        return "你当前在挑战"+player.PL1inchal.toString()+"中"

    }
}

function getBuyableCost(x){
    if (x==1){
        return E(7).pow(player.PL1buyable1)
    }
}
function getBuyableEffect(x){
    if (x==1){
        return E(2).pow(player.PL1buyable1)
    }
}
function buyBuyable(x){
    switch(x){
        case 1:
            if (player.PL1points.gte(getBuyableCost(1))){
                player.PL1points = player.PL1points.sub(getBuyableCost(1))
                player.PL1buyable1 = player.PL1buyable1.add(1);
            }
            break;
    }
}