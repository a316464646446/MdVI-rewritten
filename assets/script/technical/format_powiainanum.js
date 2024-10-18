// Basically does the opposite of what standardize in ExpantaNum does
// Set smallTop to true to force the top value in the result below 10


let MAX_LOGP1_REPEATS = 48
let LOG5E = 0.6213349345596119
function polarizeE(array, smallTop=false) {
    if (array.length == 0) array = [0]
    
    let bottom = array[0], top = 0, height = 0
    if (!Number.isFinite(bottom)) {}
    else if (array.length <= 1 && array[0][0] == 0) {
        while (smallTop && bottom >= 10) {
            bottom = Math.log10(bottom)
            top += 1
            height = 1
        }
    }
    else {
        let elem = 1
        top = array[elem][1]
        height = array[elem][0]
        while (bottom >= 10 || elem < array.length || (smallTop && top >= 10)) {
            if (bottom >= 10) { // Bottom mode: the bottom number "climbs" to the top
                if (height == 1) {
                    // Apply one increment
                    bottom = Math.log10(bottom)
                    if (bottom >= 10) { // Apply increment again if necessary
                        bottom = Math.log10(bottom)
                        top += 1
                    }
                }
                else if (height < MAX_LOGP1_REPEATS) {
                    // Apply the first two increments (one or two logs on first, one log on second)
                    if (bottom >= 1e10) bottom = Math.log10(Math.log10(Math.log10(bottom))) + 2
                    else bottom = Math.log10(Math.log10(bottom)) + 1
                    // Apply the remaining increments
                    for (i=2;i<height;i++) bottom = Math.log10(bottom) + 1
                }
                else bottom = 1 // The increment result is indistinguishable from 1
                
                top += 1
            }
            else { // Top mode: height is increased by one, or until the next nonzero value
                // Prevent running top mode more times than necessary
                if (elem == array.length-1 && array[elem][0] == height && !(smallTop && top >= 10)) break
                
                bottom = Math.log10(bottom) + top
                height += 1
                if (elem < array.length && height > array[elem][0]) elem += 1
                if (elem < array.length) {
                    if (height == array[elem][0]) top = array[elem][1] + 1
                    else if (bottom < 10) { // Apply top mode multiple times
                        let diff = array[elem][0] - height
                        if (diff < MAX_LOGP1_REPEATS) {
                            for (i=0;i<diff;i++) bottom = Math.log10(bottom) + 1
                        }
                        else bottom = 1 // The increment result is indistinguishable from 1
                        height = array[elem][0]
                        top = array[elem][1] + 1
                    }
                    else top = 1
                }
                else top = 1
            }
        }
    }
    
    return {bottom: bottom, top: top, height: height}
}
function format(num, precision=4, small=false){
    if (PowiainaNum.isNaN(num)) return "NaN"
    let precision2 = Math.max(3, precision) // for e
    let precision3 = Math.max(4, precision) // for F, G, H
    let precision4 = Math.max(6, precision) // for J, K
    num = new PowiainaNum(num)
    let array = num.array
    if (num.abs().lt(1e-308)) return (0).toFixed(precision)
    if (num.sign < 0) return "-" + format(num.neg(), precision)
    if (num.isInfinite()) return "Infinity"
    if (num.lt("0.001")) {
        return "("+format(num.rec())+")e-1"
    }
    else if (num.lt(1)) {
      if (precision == 0) return '0'
      return regularFormat(num, precision + 2)
    }
    else if (num.lt(1000)) return regularFormat(num, precision)
    else if (num.lt(1e9)) return commaFormat(num)
    else if (num.lt("9007199254740991")) {
        a = num.log10().floor().toNumber();
        b = num.div(10**a).toNumber();
        return `${format(b,precision2)}e${a}`;
    }else if (num.lt("1e1000000000")){
        let a = Math.floor(num.array[0])
        let b = 10**(num.array[0]-a)
        return `${format(b,precision2)}e${a}`;
    }
    else if (num.lt(E.E_MAX_SAFE_INTEGER)) {
        a = num.log10().log10().floor().toNumber();
        b = num.log10().div(10**a).toNumber();
        return `e${format(b,precision2)}e${a}`;
    }else if (num.lt("ee1000000000")){
        let a = Math.floor(num.array[0])
        let b = 10**(num.array[0]-a)
        return `e${format(b,precision2)}e${a}`;
    }
    else if (num.lt(E.EE_MAX_SAFE_INTEGER)) {
        a = num.log10().log10().log10().floor().toNumber();
        b = num.log10().log10().div(10**a).toNumber();
        return `ee${format(b,precision2)}e${a}`;
    }else if (num.lt("eee1000000000")){
        let a = Math.floor(num.array[0])
        let b = 10**(num.array[0]-a)
        return `ee${format(b,precision2)}e${a}`;
    }
    else if (num.lt("10^^1000000")) { // 1F5 ~ F1,000,000
        let pol = polarizeE(array)
        return regularFormat(pol.bottom, precision3) + "f" + commaFormat(pol.top)
    }
    else if (num.lt("10^^10^^10^^10^10^10^10^9")) { // F1,000,000 ~ 1G5
        let rep = arraySearch(array, 2)
        if (rep >= 1) {
            setToZero(array, 2)
            let x = new PowiainaNum();
            x.array = array;
            x.normalize();
            return "f".repeat(rep) + format(x, precision)
        }
        let n = arraySearch(array, 1) + 1
        if (num.gte("10^^" + (n + 1))) n += 1
        return "f" + format(n, precision)
    }
    else if (num.lt("10^^^1000000")) { // 1G5 ~ G1,000,000
        let pol = polarizeE(array)
        return regularFormat(pol.bottom, precision3) + "g" + commaFormat(pol.top)
    }
    else if (num.lt("10^^^^5")) { // G1,000,000 ~ 1H5
        let rep = arraySearch(array, 3)
        if (rep >= 1) {
            setToZero(array, 3)
            let x = new PowiainaNum();
            x.array = array;
            x.normalize();
            return "g".repeat(rep) + format(x, precision)
        }
        let n = arraySearch(array, 2) + 1
        if (num.gte("10^^^" + (n + 1))) n += 1
        return "g" + format(n, precision)
    }else if (num.lt("10^^^^1000000")) { // 1H5 ~ H1,000,000
        let pol = polarizeE(array)
        return regularFormat(pol.bottom, precision3) + "h" + commaFormat(pol.top)
    }
    else if (num.lt("10^^^^^5")) { // H1,000,000 ~ 1J5
        let rep = arraySearch(array, 4)
        if (rep >= 1) {
            setToZero(array, 4)
            let x = new PowiainaNum();
            x.array = array;
            x.normalize();
            return "h".repeat(rep) + format(x, precision)
        }
        let n = arraySearch(array, 3) + 1
        if (num.gte("10^^^^" + (n + 1))) n += 1
        return "h" + format(n, precision)
    }
    else if (num.lt("l0 s1 a[10,[\"x\",1000000,1,1]]")){ // 1K5 ~ K1000000
        return "我不到啊K" + format(num.operator("x"))
        
    }else if (num.lt("l0 s1 a[10,[1,4,2,1]]")){ // K1000000 ~ 1L5

        if (num.lt(`l0 s1 a[10,["x",${Number.MAX_SAFE_INTEGER},1,1]]`)){
            return "K" + format(num.operator("x"))
        }else{
            let rep = num.operator(1,2);
            num.operator(1,2,1,0);
            return "K".repeat(rep) + format(num);

        }
        
    }else if (num.lt("l0 s1 a[10,[1,999999,2,1]]")){ // 1L5 ~ L1000000
        return "我不到啊L" + format(num.operator(1,2))

    }else if (num.lt("l0 s1 a[10,[2,5,2,1]]")){ // 1L5 ~ L^5 10
        if (num.lt(`l0 s1 a[10,[1,${Number.MAX_SAFE_INTEGER},2,1]]`)){
            return "L" + format(num.operator(1,2))
        }else{
            let rep = num.operator(2,2);
            num.operator(2,2,1,0);
            return "L".repeat(rep) + format(num);

        }
    } // beyond L^5 10
    /*let result = ""
    for (let i = num.array.length-1; i>=1;i--){
        arr = num.array[i];
        braceFangKuohao = 0
        braceHuaKuohao = 1

        if (arr[3] > 1 && arr[3] < 5){
            braceFangKuohao = arr[3]+1-1
        }
        if (arr[2] != "x" && arr[2] > 1 && arr[2] < 5){
            braceHuaKuohao = arr[2]+1-1
        }

        if (arr[1] < 4){
            result = result.concat(
                ("10" + "[".repeat(braceFangKuohao)+ "{".repeat(braceHuaKuohao) + arr[0]+"}".repeat(braceHuaKuohao) + "]".repeat(braceFangKuohao)
                ).repeat(arr[1])
            )
        }else{
            result = result.concat(
                "(10" + "[".repeat(braceFangKuohao)+ "{".repeat(braceHuaKuohao) + arr[0]+"}".repeat(braceHuaKuohao) + "]".repeat(braceFangKuohao)
                + ")^"+arr[1]+" "
            )

        }

    }
    result = result.concat(num.array[0]);
    return result;*/
    return num.toString();


}
/*
function format(num, precision=4, small=false){
    if (PowiainaNum.isNaN(num)) return "NaN"
    let precision2 = Math.max(3, precision) // for e
    let precision3 = Math.max(4, precision) // for F, G, H
    let precision4 = Math.max(6, precision) // for J, K
    num = new PowiainaNum(num)
    let array = num.array
    if (num.abs().lt(1e-308)) return (0).toFixed(precision)
    if (num.sign < 0) return "-" + format(num.neg(), precision)
    if (num.isInfinite()) return "Infinity"
    if (num.lt("0.001")) {
      let exponent = num.log10().floor()
      let mantissa = num.div(E(10).pow(exponent))
      return mantissa.toFixed(precision2) + 'e' + exponent
    }
    else if (num.lt(1)) {
      if (precision == 0) return '0'
      return regularFormat(num, precision + 2)
    }
    else if (num.lt(1000)) return regularFormat(num, precision)
    else if (num.lt(1e9)) return commaFormat(num)
    else if (num.lt("9007199254740991")) {
        a = num.log10().floor().toNumber();
        b = num.div(10**a).toNumber();
        return `${b.toFixed(precision2)}e${a}`;
    }else if (num.lt("1e1000000000")){
        let a = Math.floor(num.array[0])
        let b = 10**(num.array[0]-a)
        return `${b.toFixed(precision2)}e${a}`;
    }
    else if (num.lt(E.E_MAX_SAFE_INTEGER)) {
        a = num.log10().log10().floor().toNumber();
        b = num.log10().div(10**a).toNumber();
        return `e${b.toFixed(precision2)}e${a}`;
    }else if (num.lt("ee1000000000")){
        let a = Math.floor(num.array[0])
        let b = 10**(num.array[0]-a)
        return `e${b.toFixed(precision2)}e${a}`;
    }
    else if (num.lt(E.EE_MAX_SAFE_INTEGER)) {
        a = num.log10().log10().log10().floor().toNumber();
        b = num.log10().log10().div(10**a).toNumber();
        return `ee${b.toFixed(precision2)}e${a}`;
    }else if (num.lt("eee1000000000")){ // 10^10^10^9
        let a = Math.floor(num.array[0])
        let b = 10**(num.array[0]-a)
        return `ee${b.toFixed(precision2)}e${a}`;
    }else if (num.lt("10^^1000000")){
        // that xFy means 10^10^...10^x (y 10^'s)
        // that y = floor(slog(num))


        let z = num.slog();
        let y = z.floor();
        let x = PowiainaNum.pow(10,z.sub(y));
        return `${x.toNumber().toFixed(precision3)}f${y.toNumber().toFixed(0)}`;
    }else if (num.lt("10^^10^^10^^10^10^10^10^9")){

        let repeater = num.operatorE(2); //search ^^;

        
        if (repeater >= 1) { 
            num.operatorE(2,0); // set no ^^;
            return "f".repeat(repeater) + format(num, precision)
        }
        let n = num.operatorE(1) + 1
        if (num.gte("10^^" + (n + 1))) n += 1
        return "f" + format(n, precision)
    }
}*/
function arraySearch(array, height, j=1, k= 1) {
    for (i=1;i<array.length;i++) {
        if (array[i][0] == height && array[i][2] == j && array[i][3] == k) return array[i][1]
        else if (array[i][0] > height) break
    }
    return height > 0 ? 0 : 10
}
function setToZero(array, height, j=1, k= 1) {
    for (i=1;i<array.length;i++) {
        if (array[i][0] == height && array[i][2] == j && array[i][3] == k) break
    }
    if (i<array.length) array[i][1] = 0
}


function formatWhole(num) {
    return format(num, 0)
}

function formatSmall(num, precision=2) { 
    return format(num, precision, true)    
}


function commaFormat(num, precision) {
    if (num === null || num === undefined) return "NaN"
    let zeroCheck = num.array ? num.array[0][1] : num
    if (zeroCheck < 0.001) return (0).toFixed(precision)
    let init = num.toString()
    let portions = init.split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1"+comma)
    return portions[0]
}

function regularFormat(num, precision) {
    if (isNaN(num)) return "NaN"
    let zeroCheck = num.array ? num.array[0][1] : num
    if (zeroCheck < 0.001) return (0).toFixed(precision)
    let fmt = num.toString()
    let f = fmt.split(".")
    if (precision == 0) return commaFormat(num.floor ? num.floor() : Math.floor(num))
    else if (f.length == 1) return fmt + period + "0".repeat(precision)
    else if (f[1].length < precision) return fmt + "0".repeat(precision - f[1].length)
    else return f[0] + period + f[1].substring(0, precision)
}