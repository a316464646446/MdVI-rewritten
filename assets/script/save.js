var blackListProperties = [];
var hasLoaded = {
    status: false
}
function resetDimensions() {
    player.dimensions = [
        new Array(16).fill(PowiainaNum.ZERO.clone()), //dimensions
        new Array(16).fill(PowiainaNum.ONE.clone()), //dimensions_multi
        new Array(16).fill(PowiainaNum.ZERO.clone()), // dimensions_bought
        new Array(16).fill(PowiainaNum.POSITIVE_INFINITY.clone()),// dim_cost
        new Array(16).fill(PowiainaNum.ONE.clone()), //dim_exponent
        new Array(16).fill(PowiainaNum.ONE.clone()), //dim_doubleexponent
    ]
}
function hardReset() {
    player = {
        version: 1,
        dimensions: [
            new Array(16).fill(PowiainaNum.ZERO.clone()), //dimensions
            new Array(16).fill(PowiainaNum.ONE.clone()), //dimensions_multi
            new Array(16).fill(PowiainaNum.ZERO.clone()), // dimensions_bought
            new Array(16).fill(PowiainaNum.POSITIVE_INFINITY.clone()),// dim_cost
            new Array(16).fill(PowiainaNum.ONE.clone()), //dim_exponent
            new Array(16).fill(PowiainaNum.ONE.clone()), //dim_doubleexponent
        ],
        volumes: E(7),
        volumesTotal: PowiainaNum.ZERO.clone(),
        currentPage: 1,
        time: Date.now(),

        dimBoost: ExpantaNum.ZERO,
        dimBoostTimespent: 0,

        auto: [],

        offlinedTime: 0,
        offlinePower: 0,
        isOffline: false,
        timeSpeed: 0,
        optHotkey: true,

        //#region PL1
        isPL1unlocked: false,
        PL1Timespent: 0,
        PL1points: ExpantaNum.ZERO,
        PL1times: ExpantaNum.ZERO,
        PL1total: ExpantaNum.ZERO,
        PL1upgrades: [],
        PL1chal: [],
        PL1inchal: 0,

        PL1autoupg1: 0,
        PL1autoupg2: 0,
        PL1autoupgDIMBOOST:0,
        PL1autoupgMM3RESET: 0,

        PL1buyable1: ExpantaNum.ZERO,

        PL1breakedPL1limit: false,

        PL1xiaopengyouUnl: false,

        PL1xiaopengyouPoints: ExpantaNum.ZERO,
        PL1buyable2: ExpantaNum.ZERO,

        dimBoost2: ExpantaNum.ZERO,
        PL1dimensions: [
            [ExpantaNum.ZERO, ExpantaNum.ZERO, ExpantaNum.ZERO, ExpantaNum.ZERO, ExpantaNum.ZERO, ExpantaNum.ZERO, ExpantaNum.ZERO, ExpantaNum.ZERO], //dimensions
            [ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE], //dimensions_multi
            [ExpantaNum.ZERO, ExpantaNum.ZERO, ExpantaNum.ZERO, ExpantaNum.ZERO, ExpantaNum.ZERO, ExpantaNum.ZERO, ExpantaNum.ZERO, ExpantaNum.ZERO], // dimensions_bought
            [E(10), E(100), E(1000), E(1e4), E(1e5), E(1e6), E(1e7), E(1e8)],// dim_cost
            [ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE], //dim_exponent
            [ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE, ExpantaNum.ONE], //dim_doubleexponent
        ],
        automationState: {
            
        },
        //#endregion
        
        //#region PL2
        PL2points: ExpantaNum.ZERO,
        isPL2unlocked: false,
        PL2times: ExpantaNum.ZERO,
        PL2total: ExpantaNum.ZERO,
        PL2Timespent: 0, // 时间流逝


        PL2inchallenge: 0,
        PL2chal: [],

        PL2resetTimesSpent: PowiainaNum.ZERO, 

        PL2RTupgrade1: PowiainaNum.ZERO,
        PL2RTupgrade2: PowiainaNum.ZERO,

        PL2dimensionalEnergy: PowiainaNum.ZERO,

        PL2theorieSpent: PowiainaNum.ZERO,
        PL2theoTyp1: PowiainaNum.ZERO,
        PL2theoTyp2: PowiainaNum.ZERO,
        PL2theoTyp3: PowiainaNum.ZERO,

        PL2theoChoose: [],

        isUnlockedDimBoost3: false,
        dimBoost3: PowiainaNum.ZERO,
        //#endregion

        //#region Battle

        currentHP: ExpantaNum.ONE.clone(),
        currentMP: ExpantaNum.ZERO.clone(),
        currentDEF: ExpantaNum.ZERO.clone(),
        currentATK: ExpantaNum.ONE.clone(),
        currentAPS: ExpantaNum.ONE.clone(),

        currentEnemyHP: ExpantaNum.ZERO.clone(),

        XP: ExpantaNum.ZERO.clone(),

        currentFilling: [],

        fillFeatureProgress1: PowiainaNum.ZERO.clone(),
        fillFeatureProgress2: PowiainaNum.ZERO.clone(),
        fillFeatureProgress3: PowiainaNum.ZERO.clone(),

        enemyHPspent: ExpantaNum.ZERO.clone(),
        currentBattlingEnemyId: -1,
        
        battleUpgrade: [],

        enemiesUnlocked: [],

        //#endregion
    }
}

function deepCopyProps(source,target) {
    for (let key in source) {  
        if (source.hasOwnProperty(key)) {  
            // 如果源对象的属性是对象或数组，则递归复制  
            if ((typeof source[key] === 'object' && !(source[key] instanceof ExpantaNum)) && source[key] !== null) {  
                // 如果目标对象没有这个属性，或者属性是null，则创建一个新的  
                if (!target.hasOwnProperty(key) || target[key] == null || Array.isArray(source[key]) !== Array.isArray(target[key])) {  
                    target[key] = Array.isArray(source[key]) ? [] : {};  
                }  
                // 递归复制属性  
                deepCopyProps(source[key], target[key]);  
            } else {  
                // 如果属性不是对象或数组，则直接复制  
                target[key] = source[key];  
            }  
        }  
    }  
}

function transformToE(object) {
    for(let key in object) {
        if (blackListProperties.includes(key)){
            continue;
        }
        if(typeof object[key] === "string" && !E.isNaN(object[key])) {
            object[key] = new E(object[key]);
        }
        if(typeof object[key] === "object") {
            transformToE(object[key]);
        }
    }
}

function iiuaed(object,objectName,setApply){ // if is undefined, apply else disable
    if (object[objectName] === void 0){
        object[objectName] = setApply;
    }
}
function fixOldSave() {

}
function load(){
    hardReset();
    let loadplayer = localStorage.getItem("vol-inc-rew-testPowiainaNum");
    if (loadplayer != null){
        let loadplayer = formatsave.decode(localStorage.getItem("vol-inc-rew-testPowiainaNum"));
        transformToE(loadplayer);
        deepCopyProps(loadplayer, player);
        fixOldSave();
        player.offlinedTime += (Date.now()-player.time)/1000
    }
    loadVue();
    hasLoaded.status = true;
}

var formatsave = {
    startString: 'MultiDimensionalVolumeIncrementalRewrittenSaveFormat',
    endString: 'EndOfSaveFile',
    steps: [
        {
            encode: JSON.stringify,
            decode: JSON.parse
        },
        {
            encode: x => btoa(x),
            decode: x => atob(x)
        },
        {
            encode: x => formatsave.startString + x + formatsave.endString,
            decode: x => x.slice(formatsave.startString.length, -formatsave.endString.length),
        }
    ],
    encode(s) {
        return this.steps.reduce((x, f) => f.encode(x), s);
    },
    decode(s) {
        return this.steps.reduceRight((x, f) => f.decode(x), s);
    },
}
  
  
function exportCopy() {
    return copyToClipboard(formatsave.encode(player))
}
  
function exportFile() {
    let str = formatsave.encode(player)
    let file = new Blob([str], {
        type: "text/plain"
    })
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "Mdv Incremental Save - " + getCurrentBeijingTime() + ".txt"
    a.click()
}
async function importText(){
    let save2 = prompt("输入存档");
    
    importing_player = formatsave.decode(save2)
    hardReset();
    transformToE(importing_player);
    deepCopyProps(importing_player, player)
    save()

    location.href = location.href;
}
function formattedHardReset() {
    confirms = 3
    for(let i = 1; i < 3; i++) {
        let promption = prompt(`请输入${i}以进行第${i}/${confirms}次确认，此操作无法还原!`)
        if(promption != String(i)) return
    }
    let promption = prompt(`请输入${confirms}以进行最后一次确认，此操作无法还原!`)
    if(promption != String(confirms)) return
    hardReset()
    save()
    location.reload()
}

function importFile() {
    let a = document.createElement("input")
    a.setAttribute("type", "file")
    a.click()
    a.onchange = () => {
        let fr = new FileReader();
        fr.onload = () => {
            let save = fr.result
            importing_player = formatsave.decode(save)
            transformToE(importing_player);
            deepCopyProps(importing_player, player)
            console.clear()
        }
        fr.readAsText(a.files[0]);
    }
}

// 复制文本内容方法
function copyToClipboard(textToCopy) {
    if(document.execCommand('copy')) {
        // 创建textarea
        var textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // 使textarea不在viewport，同时设置不可见
        textArea.style.position = "fixed";
        textArea.style.opacity = 0;
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // 执行复制命令并移除文本框
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    } else if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      // navigator clipboard 向剪贴板写文本
        return navigator.clipboard.writeText(textToCopy);
    }
    addNotify("复制失败")
}
function copyToFile(str,name) {
    let file = new Blob([str], {
        type: "text/plain"
    })
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = name + ".txt"
    a.click()
}


function save() {
    localStorage.setItem("vol-inc-rew-testPowiainaNum", formatsave.encode(player))
}
function getCurrentBeijingTime() {
    const t = new Date,
        e = t.getUTCFullYear(),
        r = String(t.getUTCMonth() + 1).padStart(2, "0"),
        a = String(t.getUTCDate()).padStart(2, "0"),
        n = t.getUTCHours(),
        g = t.getUTCMinutes(),
        i = t.getUTCSeconds(),
        S = t.getUTCMilliseconds();
    let o = (n + 8) % 24;
    return o < 0 && (t.setUTCDate(t.getUTCDate() + 1), o += 24), `${e}-${r}-${a} ${o.toString().padStart(2,"0")}:${g.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}.${S.toString().padStart(3,"0")}`
}
  