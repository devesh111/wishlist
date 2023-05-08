let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
    //changeColor.style.backgroundColor = color;
    changeColor.innerHTML = "Change page background color to <span style='background:"+color+"'>"+color+"<span>";
});

changeColor.addEventListener("click", async()=>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    })
});

function setPageBackgroundColor(){
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.cssText = `
            color: #ffffff !important;
            background-color: `+ color +` !important;
        `;
    })
}

