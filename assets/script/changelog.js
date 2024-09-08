const changelog = [
    {
        version: "2.0.0", title: "",
        changes: [
            "推倒，然后重写，Just do it!",
            "添加了1-8维度"
        ]
    }
]
Vue.component("changelog", {
    template: `
        <div>
            <div v-for="(log, index) in changelog" :key="index">
            <h3>v{{ log.version }}</h3>
                <li v-for="(change, changeIndex) in log.changes" :key="changeIndex" v-html="change"></li>
            </div>
        </div>
    `
})