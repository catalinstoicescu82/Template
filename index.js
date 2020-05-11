function load() {
    for (let i = 0; i < document.querySelectorAll("div.zone-btn").length; i++) {
        document.querySelectorAll("div.zone-btn")[i].addEventListener("click", function() {
            for (let i = 0; i < document.querySelectorAll("div.zone-btn").length; i++) {
                document.querySelectorAll("div.zone-btn")[i].classList.remove("ch5-button--selected");
            }
            let zonePressed = (this.parentElement.id);
            let startPos = zonePressed.indexOf("[");
            let endPos = zonePressed.indexOf("]");
            let zoneToSelect = parseInt(zonePressed.substring(startPos + 1, endPos));
            document.querySelectorAll("div.zone-btn")[zoneToSelect].classList.add("ch5-button--selected");
        });
    }
    for (let i = 0; i < document.querySelectorAll("div.device-btn").length; i++) {
        document.querySelectorAll("div.device-btn")[i].addEventListener("click", function() {
            for (let i = 0; i < document.querySelectorAll("div.device-btn").length; i++) {
                document.querySelectorAll("div.device-btn")[i].classList.remove("ch5-button--selected");
            }
            let zonePressed = (this.parentElement.id);
            let startPos = zonePressed.indexOf("[");
            let endPos = zonePressed.indexOf("]");
            let zoneToSelect = parseInt(zonePressed.substring(startPos + 1, endPos));
            document.querySelectorAll("div.device-btn")[zoneToSelect].classList.add("ch5-button--selected");
        });
    }
}