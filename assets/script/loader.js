

function loadScriptFile(filename){
    let scriptTag = document.createElement("script")
    scriptTag.setAttribute("src", "./assets/script/" + filename)
    scriptTag.setAttribute("defer", "yes")
    document.querySelector("body").appendChild(scriptTag)

}


/*


    <script src="./assets/script/technical/format_expantanum.js" defer></script>
    <script src="./assets/script/technical/hotkeys.js" defer></script>
    <script src="./assets/script/formatTime.js" defer></script>
    <script src="./assets/script/display.js" defer></script>
    <script src="./assets/script/constants.js" defer></script>
    <script src="./assets/script/temp.js" defer></script>
    <script src="./assets/script/script.js" defer></script>
    <script src="./assets/script/newsticker.js" defer></script>
    <script src="./assets/script/save.js" defer></script>
    <script src="./assets/script/components.js" defer></script>
    <script src="./assets/script/changelog.js" defer></script>
    <script src="./assets/script/offline.js" defer></script>
    <script src="./assets/script/dimboost.js" defer></script>
    <script src="./assets/script/hotkeys.js" defer></script>

    <script src="./assets/script/mm3.js" defer></script>
    <script src="./assets/script/automation.js" defer></script>
    
    */