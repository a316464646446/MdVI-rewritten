const enemies = [
    {
        hp: new PowiainaNum(10),
        atk: new PowiainaNum(3000),
        def: new PowiainaNum(0.5),
        aps: new PowiainaNum(1),

        expGain: new PowiainaNum(1),
        get unlocked(){
            return player.volumes.gte("1e10000")
        },
        onPlayerFailed(){
            norewardMM5reset()
        },
        onPlayerSuccess(){

        },
        pentalyWhenFailed(){
            return "如果失败，则进行一次无奖励的mm<sup>5</sup>重置"
        }
    },
    {
        hp: new PowiainaNum(12),
        atk: new PowiainaNum(9000),
        def: new PowiainaNum(-2),
        aps: new PowiainaNum(1/5),

        expGain: new PowiainaNum(10),
        get unlocked(){
            return player.PL2times.gte(75)
        },

    },
    {
        hp: new PowiainaNum(15),
        atk: new PowiainaNum(2002),
        def: new PowiainaNum(0.2),
        aps: new PowiainaNum(1),

        expGain: new PowiainaNum(100),
        get unlocked(){
            return player.volumes.gte("1e600000")
        },
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
    return new PowiainaNum(1).add(tmp.battle.feature1Effect).add(tmp.battle.feature3Effect);
}
function getCurrentDEF(){
    return new PowiainaNum(0).add(tmp.battle.feature2Effect);
}
function getCurrentATK(){
    return new PowiainaNum(1).add(tmp.battle.feature3Effect);
}
function battleEnemy(id){
    if (player.currentBattlingEnemyId !== -1) {
        alert("你目前正在战斗中");
        return ;
    }
    player.currentBattlingEnemyId = id;
    player.currentEnemyHP = enemies[id].hp.clone();
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
        player.currentDEF = getCurrentDEF();
        player.currentATK = getCurrentATK();
        if (isFilling(1)){
            if (player.volumes.gte(14)){
                if (player.PL2times.gte(1000000) || player.fillFeatureProgress1.lt("1e100000")){
                    player.fillFeatureProgress1 = player.fillFeatureProgress1.add(player.volumes.sub(7));
                    player.volumes = new PowiainaNum(7);
                }else{
                    player.fillFeatureProgress1 = new PowiainaNum("1e100000")
                }
            }
        }
        if (isFilling(2)){
            if (player.PL2points.gte(1)){
                if (player.fillFeatureProgress2.lt("1e10000")){
                    player.fillFeatureProgress2 = player.fillFeatureProgress2.add(player.PL2points);
                    player.PL2points = new PowiainaNum(0);
                }else{
                    player.fillFeatureProgress2 = new PowiainaNum("1e10000")
                }
            }
        }
        if (isFilling(3)){
            if (player.fillFeatureProgress3.lt("1e100000")){
                player.fillFeatureProgress3 = player.fillFeatureProgress3.add(player.PL1points.sub(0));
                player.PL1points = new PowiainaNum(0);
            }else{
                player.fillFeatureProgress3 = new PowiainaNum("1e100000")
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
                enemy.aps.mul(globalDiff).mul(enemy.atk.sub(player.currentDEF)).max(0)
            );
            player.currentEnemyHP = player.currentEnemyHP.sub(
                player.currentAPS.mul(globalDiff).mul(player.currentATK.sub(enemy.def)).max(0)
            );

            if (player.currentEnemyHP.lte(0)){
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
        player.enemiesUnlocked = [...(new Set(player.enemiesUnlocked))];
        for (let i=0; i<enemies.length;i++){
            if (enemies[i].unlocked) player.enemiesUnlocked.push(i);
        }
        if (player.currentHP.lt(0)){

            player.currentHP = PowiainaNum(1e-20)

        }
        if (player.currentBattlingEnemyId == -1){
            if (player.currentHP.lt(getCurrentHPCap())){
                player.currentHP = player.currentHP.mul(PowiainaNum.pow(5,globalDiff));
            }
            player.currentEnemyHP = PowiainaNum.ZERO.clone();
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