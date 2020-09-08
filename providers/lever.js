function autofill_handler(element) {
    element.style.background = 'rgb(219, 237, 255)';
    element.addEventListener("input", function () {
        element.style.backgroundColor = '';
    }, {
        once: true
    });
}

chrome.storage.local.get({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    ccompany: '',
    linkedin: '',
    twitter: '',
    github: '',
    portfolio: '',
    addInfo: '',
    gender: '',
    hispanic: '',
    veteran: '',
    disability: ''
}, function (items) {
    if (document.forms.length > 0) {
        const appFields = document.forms[0].elements

        if (appFields['name'] && items.fname ) {
            appFields['name'].value = items.fname + " " + items.lname;
            autofill_handler(appFields['name']);
        }

        if (appFields['email'] && items.email) {
            appFields['email'].value = items.email;
            autofill_handler(appFields['email']);
        }

        if (appFields['phone'] && items.phone) {
            appFields['phone'].value = items.phone;
            autofill_handler(appFields['phone']);
        }

        if (appFields['org'] && items.ccompany) {
            appFields['org'].value = items.ccompany;
            autofill_handler(appFields['org']);
        }

        if (appFields['urls[LinkedIn]'] && items.linkedin) {
            appFields['urls[LinkedIn]'].value = items.linkedin;
            autofill_handler(appFields['urls[LinkedIn]']);
        }

        if (appFields['urls[Twitter]'] && items.twitter) {
            appFields['urls[Twitter]'].value = items.twitter;
            autofill_handler(appFields['urls[Twitter]']);
        }

        // This is a url field added by the comapany who listed the posting
        // so there's sometimes some whitespace/capitalization differences
        // it's common enough in enough engineering applications that I felt like it was nessesary to include
        if (items.github) {
            if (appFields['urls[Github]']) {
                appFields['urls[Github]'].value = items.github;
                autofill_handler(appFields['urls[Github]']);
            } else if (appFields['urls[Github ]']) {
                appFields['urls[Github ]'].value = items.github;
                autofill_handler(appFields['urls[Github ]']);
            } else if (appFields['urls[GitHub]']) {
                appFields['urls[GitHub]'].value = items.github;
                autofill_handler(appFields['urls[GitHub]']);
            }
        }

        if (appFields['urls[Portfolio]'] && items.portfolio) {
            appFields['urls[Portfolio]'].value = items.portfolio;
            autofill_handler(appFields['urls[Portfolio]']);
        }

        if (appFields['comments'] && items.addInfo) {
            appFields['comments'].value = items.addInfo;
            autofill_handler(appFields['comments']);
        }

    }
});