var isJobAppPage = {
  // Lever ATS
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'jobs.lever.co', urlContains: '/apply'}
    }),
    // Greenhouse ATS
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'boards.greenhouse.io'},
      css: ["form[id='application_form']"]
    }),
    // Greenhouse Embedded on Client Page
    new chrome.declarativeContent.PageStateMatcher({
      css: ["#grnhse_app"]
    })
  ],
  actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([isJobAppPage]);
  });
});
