var I18Ntext = {};
var languageName = [];
var currentLanguage = 0;
var comma = 1000 .toLocaleString()[1];
var period = 1000.1.toLocaleString()[5];
async function loadI18N(){
    let indexFile = await (await fetch("./assets/json/i18n/index.json")).text();
    indexes = JSON.parse(indexFile);
    let i = 0;
    for (const language of indexes){
        let languageContent = await (await fetch(`./assets/json/i18n/${language.filename}`)).text();
        I18Ntext[i] = JSON.parse(languageContent)
        languageName.push(language.name);
        i++
    }
}

function getI18Ntext(id){
    if (Object.hasOwn(I18Ntext[currentLanguage],id)) return I18Ntext[currentLanguage][id]
    else return id
}
function glt(){
    return getI18Ntext(...arguments)
}
function getLanguageName(id){
    return languageName[id]
}