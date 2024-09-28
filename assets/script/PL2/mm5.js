
function norewardMM5reset(){
    alert("coming soon");return;
    norewardMM3reset();
    player.PL1Timespent = 0;
    player.PL2Timespent = 0
    player.dimBoostTimespent = 0;

    player.volumes = E(7);

    player.PL1inchal = 0;

    player.PL1upgrades = [2,3,5,8,20];
    player.PL1chal = [];
    player.PL1buyable1 = E(0);
    player.PL1times = E(0);
    player.PL1buyable2 = E(0);
    player.PL1xiaopengyouPoints = E(0);
    player.PL1xiaopengyouUnl = false;

    player.PL1points = E(0);
    player.dimBoost = E(0);
    player.dimBoost2 = E(0);


}

function doMM5reset() {
    alert("coming soon");return;
    player.PL2points = player.PL2points.add(tmp.mm5.gain)
    player.isPL2unlocked = true;
    norewardMM5reset();
}

function doMM5resetManmade() {
    alert("coming soon");return;
    if (player.volumes.gte("1e100000")) {
        doMM5reset()
    }
}