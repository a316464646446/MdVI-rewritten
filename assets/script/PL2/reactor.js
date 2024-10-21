function toggleReactorState(i) {
    let temp1 = player.secutitation.reactorStates.indexOf(i)
    if (temp1 == -1) {
        player.secutitation.reactorStates.push(i)
    } else {
        player.secutitation.reactorStates.splice(temp1, 1)
    }
}

function reactorLoop() {
    if (shortcut.secu.reactorStates.includes(1)){
        shortcut.secu.mm53 = shortcut.secu.mm53.add(tmp.reactor.speed.mul(diff))
    }

    if (shortcut.secu.reactorStates.includes(2)){
        if (tmp.reactor.speed.mul(diff).mul(5).lte(shortcut.secu.mm53)){
            shortcut.secu.mm54 = shortcut.secu.mm54.add(tmp.reactor.speed.mul(diff))
            shortcut.secu.mm53 = shortcut.secu.mm53.sub(tmp.reactor.speed.mul(diff).mul(5))
        }
    }
    if (shortcut.secu.reactorStates.includes(3)){
        if (tmp.reactor.speed.mul(diff).mul(5).lte(shortcut.secu.mm54)){
            shortcut.secu.mm55 = shortcut.secu.mm55.add(tmp.reactor.speed.mul(diff))
            shortcut.secu.mm54 = shortcut.secu.mm54.sub(tmp.reactor.speed.mul(diff).mul(5))
        }
    }
    if (shortcut.secu.reactorStates.includes(4)){
        if (tmp.reactor.speed.mul(diff).mul(5).lte(shortcut.secu.mm55)){
            shortcut.secu.mm56 = shortcut.secu.mm56.add(tmp.reactor.speed.mul(diff))
            shortcut.secu.mm55 = shortcut.secu.mm55.sub(tmp.reactor.speed.mul(diff).mul(5))
        }
    }
    if (shortcut.secu.reactorStates.includes(5)){
        if (tmp.reactor.speed.mul(diff).mul(5).lte(shortcut.secu.mm56)){
            shortcut.secu.mm57 = shortcut.secu.mm57.add(tmp.reactor.speed.mul(diff))
            shortcut.secu.mm56 = shortcut.secu.mm56.sub(tmp.reactor.speed.mul(diff).mul(5))
        }
    }
}
function getReactorClass(id) {
    if (shortcut.secu.reactorStates.includes(id)){
        return "rea rea_active"
    }else{
        return "rea"
    }
}
function buyReacUpg(id){
    switch(id){
        case 1:
            if (shortcut.secu.mm54.gte(getReacUpgCost(1))){
                shortcut.secu.mm54 = shortcut.secu.mm54.sub(getReacUpgCost(1))
                shortcut.secu.reacUpgrades[0]++
            }
            break;
        case 2:
            if (shortcut.secu.mm55.gte(getReacUpgCost(2))){
                shortcut.secu.mm55 = shortcut.secu.mm55.sub(getReacUpgCost(2))
                shortcut.secu.reacUpgrades[1]++
            }
            break;
        case 3:
            if (shortcut.secu.mm57.gte(getReacUpgCost(3))){
                shortcut.secu.mm57 = shortcut.secu.mm57.sub(getReacUpgCost(3))
                shortcut.secu.reacUpgrades[2]++
            }
            break;
    }
}
function getReacUpgCost(id){
    switch(id){
        case 1:
            return shortcut.secu.reacUpgrades[0] >= 10 ? K9E15 :  E(4).mul(E(2).pow(shortcut.secu.reacUpgrades[0]))
        case 2:
            return shortcut.secu.reacUpgrades[1] >= 10 ? K9E15 :E(2).mul(E(1.5).pow(shortcut.secu.reacUpgrades[1]))
        case 3:
            return shortcut.secu.reacUpgrades[2] >= 1 ? K9E15 : E(175)
    }
}
