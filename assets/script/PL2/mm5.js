
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
    else player.PL1xiaopengyouPoints = player.PL1xiaopengyouPoints.root(2);
    if (player.PL2times.lt(6)) player.PL1xiaopengyouUnl = false;

    player.PL1points = E(0);
    player.dimBoost = E(0);
    if (player.PL2times.lt(6)) player.dimBoost2 = E(0);


}

function doMM5reset() {
    player.PL2points = player.PL2points.add(tmp.mm5.gain)
    player.PL2times = player.PL2times.add(1);
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

function hasMM5Upg(){return false;}
function buyMM5Upg(){}