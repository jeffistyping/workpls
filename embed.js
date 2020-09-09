if (document.getElementById('grnhse_app')) {
    var redirectUrl = document.getElementById('grnhse_app').firstChild.src;
    chrome.runtime.sendMessage({isApp: true, url: redirectUrl});
}
else {
    chrome.runtime.sendMessage({isApp: false});
}
