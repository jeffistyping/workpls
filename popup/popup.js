let optionsMenu = document.querySelector('#go-to-options');
let fillForm = document.querySelector('#fill-form');

const leverUrl = RegExp('^https:\/\/jobs.lever.co');
const greenhouseUrl = RegExp('^https:\/\/boards.greenhouse.io');

// Open Options Page
optionsMenu.onclick = function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
};

// Fill Form
fillForm.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log(tabs[0]['url']);
    if (leverUrl.test(tabs[0]['url'])) {
      chrome.tabs.executeScript(tabs[0].id,{file: 'providers/lever.js'});
    }
    else if (greenhouseUrl.test(tabs[0]['url'])) {
      chrome.tabs.executeScript(tabs[0].id,{file: 'providers/greenhouse.js'});
    }
  });
};