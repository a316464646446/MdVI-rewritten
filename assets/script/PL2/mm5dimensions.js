function mm5dimbuyable(dim){
    // dim = 9-16
    return player.PL2points.gte(player.dimensions[DIMENSIONS_COST][dim - 1])
}
function mm5dimScale(dim){
    // dim = 9-16
    return PowiainaNum(([1e2, 1e5, 1e10, 1e12, 1e25, "1e50", "1e1200", "1e3000" ][dim-9]))

}
function mm5dimCost(dim){
    return PowiainaNum(mm5dimStartPrice(dim)).mul(
        mm5dimScale(dim).pow(player.dimensions[DIMENSIONS_BOUGHT][dim - 1])
    )
}
function mm5dimStartPrice(dim){
    // dim = 9-16
    return PowiainaNum(([50000000, 5e9, 5e15, 5e22, 5e250, "5e310", "5e1250", "5e3205" ][dim-9]))
}
function buymm5all(){
    buymm5dim(9);
    buymm5dim(10);
    buymm5dim(11);
    buymm5dim(12);
    buymm5dim(13);
    buymm5dim(14);
    buymm5dim(15);
    buymm5dim(16);
}
function buymm5dim(dim, single = false) {
    // dim = 9-16
    if (mm5dimbuyable(dim)) {
        let temp1 = player.PL2points.div(mm5dimStartPrice(dim)).logarithm(mm5dimScale(dim))
        let temp2 = (player.dimensions[DIMENSIONS_COST][dim - 1]).div(mm5dimStartPrice(dim)).logarithm(mm5dimScale(dim))
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
function calculatemm5Dimensions(){
    for (let i = 8; i < 16; i++) {

        if (i != 15){
            player.dimensions[DIMENSIONS_POINTS][i] = player.dimensions[DIMENSIONS_POINTS][i]
                .add(
                    
                    player.dimensions[DIMENSIONS_POINTS][i + 1]
                        .mul(player.dimensions[DIMENSIONS_MULTI][i + 1])
                        .pow(player.dimensions[DIMENSIONS_EXPONENT][i + 1])
                        .mul(globalDiff)
                );
            
        }
        if (player.dimensions[DIMENSIONS_POINTS][i].isNaN()) {
            player.dimensions[DIMENSIONS_POINTS][i] = E(0);
        }
        player.dimensions[DIMENSIONS_MULTI][i] = tmp.mm5.getDimMultiplierafter8(i+1);
        player.dimensions[DIMENSIONS_EXPONENT][i] = PowiainaNum(1);
        player.dimensions[DIMENSIONS_COST][i] = mm5dimCost(i+1,)
    }
    player.PL2dimensionalEnergy = player.PL2dimensionalEnergy.add(
        (
            player.dimensions[DIMENSIONS_POINTS][8]
            .mul(player.dimensions[DIMENSIONS_MULTI][8])
            .pow(player.dimensions[DIMENSIONS_EXPONENT][8])
            .mul(globalDiff))
        )

        if (player.dimBoost3.gte(1)){
            player.dimensions[DIMENSIONS_POINTS][7] = player.dimensions[DIMENSIONS_POINTS][7]
                .add(
                    player.dimensions[DIMENSIONS_POINTS][8]
                        .mul(player.dimensions[DIMENSIONS_MULTI][8])
                        .pow(player.dimensions[DIMENSIONS_EXPONENT][8])
                        .mul(globalDiff)
                );
    
        }
}