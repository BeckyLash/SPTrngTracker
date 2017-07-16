document.getElementById("copyButton").addEventListener("click", function () {
    "use strict";
    copyToClipboard(document.getElementById("copyTarget"));
});

function copyToClipboard(elem) {
    "use strict";
    // create hidden text element, if it doesn't already exist
    var target = "";
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        //restore previous selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {      
        target.textContent = "";
    }
    alert("The link to your training event is copied to the Clipboard. To paste the link into your training event document or an email to the employees, place your mouse cursor where you want the link to appear and, on your keyboard, press Ctrl + V.");
    return succeed;
}

