let optionsMenu = document.querySelector('#go-to-options');
let fillForm = document.querySelector('#fill-form');

const leverUrl = RegExp('^https:\/\/jobs.lever.co');
const greenhouseUrl = RegExp('^https:\/\/boards.greenhouse.io');

// Check if embedded
chrome.tabs.query({
  active: true,
  currentWindow: true
}, function (tabs) {
  chrome.tabs.executeScript(tabs[0]['url'].id, {
    file: 'embed.js'
  })
});

chrome.runtime.onMessage.addListener(
  function (request, _, _) {
    if (request.isApp) {
      fillForm.disabled = true;
      var msg = '<small><span class="badge badge-pill badge-danger">Beta</span> Hi! We\'ve found a greenhouse form to fill but it doens\'t seem to hosted at greenhouse, we don\'t support those yet. No worries though, we can still fill it out at the direct link: \
        <a target="_blank" href=' + request.url + '>' + request.url + '</a></small>'
      document.querySelector("#embed").innerHTML = msg;
    }
  });

// Open Options Page
optionsMenu.onclick = function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
};

// Fill Form
fillForm.onclick = function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (leverUrl.test(tabs[0]['url'])) {
      chrome.tabs.executeScript(tabs[0].id, {
        file: 'providers/lever.js'
      });
    } else if (greenhouseUrl.test(tabs[0]['url'])) {
      chrome.tabs.executeScript(tabs[0].id, {
        file: 'providers/greenhouse.js'
      });
    }
  });
};