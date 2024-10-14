const enemies = [
    {
        hp: new PowiainaNum(10),
        atk: new PowiainaNum(3000),
        def: new PowiainaNum(0.5),
        aps: new PowiainaNum(1),

        expGain: new PowiainaNum(1),
        get unlocked(){
            return player.volumes.gte("1e50000")
        },
        onPlayerFailed(){
            norewardMM5reset()
        },
        onPlayerSuccess(){

        },
        pentalyWhenFailed(){
            return "如果失败，则进行一次无奖励的mm<sup>5</sup>重置"
        }
    }
]
for (let i = 0; i< enemies.length; i++){
    enemies[i].id = i;
    if (enemies[i].onPlayerFailed === void 0){
        enemies[i].onPlayerFailed = function (){}
    }
    if (enemies[i].onPlayerSuccess === void 0){
        enemies[i].onPlayerSuccess = function (){}
    }
    if (enemies[i].pentalyWhenInBattle === void 0){
        enemies[i].pentalyWhenInBattle = function (){return ""}
    }
    if (enemies[i].pentalyWhenFailed === void 0){
        enemies[i].pentalyWhenFailed = function (){return ""}
    }
}
function getCurrentHPCap(){
    return new PowiainaNum(1).add(tmp.battle.feature1Effect);
}
function battleEnemy(id){
    if (player.currentBattlingEnemyId !== 1) {
        alert("你目前正在战斗中");
        return ;
    }
    player.currentBattlingEnemyId = id;
}
function fillForFeature(i){
    let temp1 = player.currentFilling.indexOf(i)
    if (temp1 == -1) {
        player.currentFilling.push(i)
    } else {
        player.currentFilling.splice(temp1, 1)
    }
}
function isFilling(fillID){
    return player.currentFilling.includes(fillID);
}
function battleLoop(){
    if (player.PL2times.gte(4)){
        if (isFilling(1)){
            if (player.volumes.gte(14)){
                if (player.fillFeatureProgress1.lt("1e100000")){
                    player.fillFeatureProgress1 = player.fillFeatureProgress1.add(player.volumes.sub(7));
                    player.volumes = new PowiainaNum(7);
                }else{
                    player.fillFeatureProgress1 = new PowiainaNum("1e100000")
                }
            }
        }

        if (player.currentBattlingEnemyId != -1){
            if (player.currentBattlingEnemyId >= enemies.length){
                player.currentBattlingEnemyId = -1
            }
            

        }
        if (player.currentBattlingEnemyId != -1){
            let id = player.currentBattlingEnemyId;
            let enemy = enemies[id];
            player.currentHP = player.currentHP.sub(
                enemy.aps.mul(globalDiff).mul(enemy.atk.sub(player.currentDEF))
            );
            player.enemyHPspent = player.enemyHPspent.add(
                player.currentAPS.mul(globalDiff).mul(player.currentATK.sub(enemy.def))
            );

            if (player.enemyHPspent.gte(enemy.hp)){
                player.XP = player.XP.add(enemy.expGain);
                enemy.onPlayerSuccess();

                player.currentBattlingEnemyId = -1;
            }
            if (player.currentHP.lt(0)){

                player.XP = player.XP.sub(enemy.expGain).max(0);
                enemy.onPlayerFailed();

                player.currentBattlingEnemyId = -1;

            }
        }
        if (player.currentHP.lt(0)){

            player.currentHP = PowiainaNum(0.002)

        }
        if (player.currentBattlingEnemyId == -1){
            if (player.currentHP.lt(getCurrentHPCap())){
                player.currentHP = player.currentHP.mul(PowiainaNum.pow(1.05,globalDiff));
            }
            player.enemyHPspent = PowiainaNum.ZERO.clone();
        }
        if (player.currentHP.gt(getCurrentHPCap())){
            player.currentHP = getCurrentHPCap();
        }
    }
}
function buyBattleUpgrade(id){
    switch(id){
        case 1:
            if (player.XP.lt(20)) return;
            break;
    }
    if (player.battleUpgrade.includes(id)) return;
    player.battleUpgrade.push(id)
}
function hasBattleUpgrade(id){
    return player.battleUpgrade.includes(id);
}
function getBattleUpgradeEffect(id){
    if (id == 1){
        return player.XP.root(1.2).max(1)
    }
}