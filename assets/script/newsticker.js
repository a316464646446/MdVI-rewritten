!(function() {
    var textslength;
    var texts = [
        {
            text: "这是一条新闻"
        },
        {
            text: "史上平衡最差的增量游戏是什么？IMR和IDR算什么，WSC才是真神"
        },
        {
            text: "All miracl... 抱歉走错了"
        },
        {
            text: "通关了？如过？超级过关了？如超？究极过关了？F1.797e308"
        },
        {
            text: "Darkest night, I'll confront you here"
        },
        {
            text: "科技已经这么发达了吗，都有K65路公交车了，比葛立恒数还大！",
        },
        {
            text: "别以为100下少，底数是3有ω^ω+1不止呢"
        },
        {
            text: "红鲨在坐车回家的路上，因为速度(受软上限限制)、超级折算|路程，迟迟到不了家"
        },
        {
            text: "因为受上限限制，加上有上有硬上限封顶，导致信息无法超光速传播"
        },
        {
            text: "1+1 = 1.414213562373095048(受软上限限制)"
        },
        {
            text: "比赛时的成绩往往比不过平时的，是因为（处于挑战之中）"
        },
        {
            text: "在马拉松中你的路程受软上限限制，因为你现在有一个疲劳的buff。"
        },
        {
            text: "粒子物理学家Pollux用加速器证明了相对论是错误的，因为光速并不是一个硬上限，而是一个很硬的软上限。"
        },
        {
            text: "伪物(Nisemono)无法被消灭，因为它构建于素数的序列(A058009)之上"
        },
        {
            text: "5小时后更新"
        },
        {
            text: "刚刚复习完的你正在玩游戏休息，突然你脑中出现一道信息： 遗忘度 超过 记忆度 ，进行一次无奖励的 知识重置"
        },
        {
            text: `去超市购物，采购的差不多五百多块的东西，结果结账发现：原价500｜折算^0.9（笑点解析：超市正在打“折”）`
        },
        {
            text: "你有10.000e19728风之微粒，就是这记数法怎么有点奇怪"
        },
        {
            text: ""
        }
    ];
    textslength = texts.length;
    let rand;
    var updatenews = function () {
        let e = document.getElementById("newsText")
        /*  */
        //if (!player.options.showNewsTicker) return
        do {
            rand = Math.floor(Math.random() * textslength)
        } while(checkRand(rand))
        /*if (typeof dev != "undefined") {
            if (dev.devmode) rand = textslength-1
        }if (rand == 56 && repeatN56times == 0) repeatN56times = Math.round(3+Math.random()*(5-2))
        if (repeatN56times > 0) repeatN56times--
        if (repeatN56times > 0) rand = 56*/
        let msg = texts[rand].text;
        e.innerHTML = msg
        let textWidth = e.clientWidth;
        let parentWidth = e.parentElement.clientWidth;
        e.style.transition = '';
        e.style.transform = 'translateX(' + (parentWidth + 10) + 'px)';
        let dist = parentWidth + e.clientWidth
        let rate = 100;
        let transformDuration = dist / rate;
        e.style.transition = 'transform ' + transformDuration + 's linear';
        e.style.transform = 'translateX(-' + (textWidth) + 'px)';
        e.addEventListener('transitionend', onNewsEnd)
    }
    var onNewsEnd = function () {
        let e = document.getElementById("newsText");
        e.removeEventListener('transitionend', onNewsEnd)
        setTimeout(updatenews, 1000)
    }
    Vue.component("newsticker",{
        get template() {
            return `<div id="news"><p id="newsText"></p></div>`
        },
        mounted() {
            updatenews();
        },
    })
    function checkRand(rand) {
        if(texts[rand].unlocked === undefined) return false
        else if(texts[rand].unlocked) return false
        else return true
    }
})()