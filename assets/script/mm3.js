const mm3UpgradeCost = [
    1, 1, 3, 10
]
function hasMM3Upg(x){
    return player.PL1upgrades.includes(x)
}
function buyMM3Upg(x){
    if (x==4){
        alert("请等待游戏更新");
        return;
    }
    if (player.PL1points.gte(mm3UpgradeCost[x-1]) && !hasMM3Upg(x)){
        player.PL1upgrades.push(x);
        player.PL1points = player.PL1points.sub(mm3UpgradeCost[x-1])
    }
}

function fixInfinity(){
    if (player.volumes.gte(mm3Require)){
        player.volumes = mm3Require.clone();
    }
}

function norewardMM3reset(){
    resetDimensions();
    player.dimBoost = E(0);
    player.volumes = E(7);
}

function doMM3reset() {
    player.PL1points = player.PL1points.add(1);
    player.PL1total = player.PL1total.add(1);
    player.PL1times = player.PL1times.add(1);
    player.isPL1unlocked = true;
    norewardMM3reset();
}

function doMM3resetManmade() {
    if (player.volumes.gte(mm3Require)) doMM3reset();
}

function mm3Loop(){
    player.PL1upgrades = [...(new Set(player.PL1upgrades))]
}