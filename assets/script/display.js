function getEnglishNumberOrdinal(num){
    if (num < 1 || Number.isNaN(num) || !Number.isFinite(num)){
        throw RangeError("ordinal number cannot be less than 1, NaN, or Infinity");
    }
    let x = Math.floor(num);
    let tenIsOne = Math.floor(x%100/10)===1 ? true : false;
    let mod = x%10;
    let result = "";
    result = result.concat(x.toString());
    if (tenIsOne){
        result = result.concat("th");
        return result;
    } else {
        if (mod === 1){
            result = result.concat("st")
        }else if(mod === 2){
            result = result.concat("nd")
        }else if(mod === 3){
            result = result.concat("rd")
        }else {
            result = result.concat("th");
        }
    }
    return result;
}

var tabShow = {
    inPrimaryTab(primaryTab) {
        let subtabIDList = [];
        for (const key in this[primaryTab]){
            if (key === "text" || key === "class" || key === "unlocked" || key === "firstTabID"){
                
            }else{
                subtabIDList.push(this[primaryTab][key].id)
            }
        }
        return subtabIDList.includes(player.currentPage)
    },
    inSecondaryTab(primaryTab, secondaryTab) {
        return player.currentPage == this[primaryTab][secondaryTab].id
    },
    main: {
        dimensions: {
            id: 1,
            text: "维度",
            unlocked() {
                return true;
            },
        },
        dimboost: {
            id: 4,
            text: "维度提升", 
            unlocked() {
                return true;
            }
        },
        offline: {
            id:5,
            text: "离线时间",
            unlocked() {
                return true;
            }
        },
        text: "主要",
        firstTabID: 1
    },
    automation: {
        text: "自动",
        firstTabID: 8,
        auto: {
            text: "自动",
            id: 8
        },
        unlocked(){
            return hasMM3Upg(2)
        }
    },
    mm3: {
        text: "3维体积",
        firstTabID : 6,
        upgrades: {
            id: 6,
            class: "mm3btn",
            text: "升级"
        },
        challenges: {
            id: 7,
            class: "mm3btn",
            text: "挑战"
        },
        class: "mm3btn",
        unlocked() {
            return player.isPL1unlocked;
        }
    },
    settings: {
        text: "选项",
        firstTabID: 2,
        save: {
            id: 2,
            text: "保存",
        },
        about: {
            id: 3,
            text: "关于"
        }
    }
};
function primaryTabSort() {
    let result = [];
    for (const key in tabShow){
        if (key === "inPrimaryTab" || key === "inSecondaryTab"){
            continue;
        }else{
            let showThisTab = false;
            if (tabShow[key].unlocked === void 0){
                showThisTab = true
            }else{
                showThisTab = tabShow[key].unlocked()
            }
            if (showThisTab){
                result.push(
                    {
                        style: (tabShow[key].style ?? ""),
                        text:  tabShow[key].text,
                        name: key,
                        id: tabShow[key].firstTabID
                    }
                )
            }
        }
    }
    return result;
}
function secondaryTabSort() {
    let result = [];
    for (const key in tabShow){
        if (tabShow.inPrimaryTab(key)){
            for (const subtabKey in tabShow[key]){
                if (subtabKey === "firstTabID" || subtabKey === "text" || subtabKey==="unlocked" || subtabKey === "class"){continue;}else{
                    let showThisSubTab = true;
                    if (tabShow[key][subtabKey].unlocked === void 0){
                        showThisSubTab = true;
                    }else{
                        showThisSubTab = tabShow[key][subtabKey].unlocked()
                    }
                    if (showThisSubTab){
                        result.push(
                            {
                                id: tabShow[key][subtabKey].id,
                                style: (tabShow[key][subtabKey].style ?? ""),
                                text:  tabShow[key][subtabKey].text,
                                name: subtabKey,
                                parentTab: key
                            }
                        )
                    }
                }
            }
        }
    }
    return result;
}
function getTabClass(tabname) {
    return "btn "+tabShow[tabname].class ?? ""
}
function getSubTabClass(parentTab,subTabName) {
    return "btn "+tabShow[parentTab][subTabName].class ?? ""
}

function colorText(elem, color, text) {
    return "<" + elem + " style='color:" + color + ";text-shadow:0px 0px 10px;'>" + text + "</" + elem + ">"
}
function convertToB16(n) {
    let codes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    let x = n % 16
    return codes[(n - x) / 16] + codes[x]
}
  
function getUndulatingColor(period = Math.sqrt(760)) {
    let t = new Date().getTime()
    let a = Math.sin(t / 1e3 / period * 2 * Math.PI + 0)
    let b = Math.sin(t / 1e3 / period * 2 * Math.PI + 2)
    let c = Math.sin(t / 1e3 / period * 2 * Math.PI + 4)
    a = convertToB16(Math.floor(a * 128) + 128)
    b = convertToB16(Math.floor(b * 128) + 128)
    c = convertToB16(Math.floor(c * 128) + 128)
    return "#" + String(a) + String(b) + String(c)
}

function formatEndgame() {
    const x = getUndulatingColor()
    const endgameText = "当前Endgame：" + colorText('b', x, Endgame.format()) + " mm<sup>4</sup>, 总共 15 mm<sup>3</sup>"
    return endgameText
}