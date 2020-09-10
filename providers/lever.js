function autofill_handler(element) {
    element.style.background = 'rgb(219, 237, 255)';
    element.addEventListener("input", function () {
        element.style.backgroundColor = '';
    }, {
        once: true
    });
}

var eeoMapping = {
    1: "American Indian or Alaska Native (Not Hispanic or Latino)",
    2: "Asian (Not Hispanic or Latino)",
    3: "Black or African American (Not Hispanic or Latino)",
    4: "Hispanic or Latino",
    5: "White (Not Hispanic or Latino)",
    6: "Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)",
    7: "Two or More Races (Not Hispanic or Latino)",
    8: "Decline to self-identify"
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
    race: '',
    veteran: '',
    disability: ''
}, function (items) {
    if (document.forms.length > 0) {
        const appFields = document.forms[0].elements

        if (appFields['name'] && items.fname) {
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

        // EEO
        if (appFields['eeo[gender]'] && items.gender) {
            appFields['eeo[gender]'].value = items.gender == "Na" ? "Decline to self-identify" : items.gender;
            autofill_handler(appFields['eeo[gender]']);
        }

        if (appFields['eeo[race]'] && items.race) {
            appFields['eeo[race]'].value = eeoMapping[items.race];
            autofill_handler(appFields['eeo[race]']);
        }

        if (appFields['eeo[veteran]'] && items.veteran) {
            appFields['eeo[veteran]'].value = items.veteran == "Yes" ? "I am a veteran" : (items.veteran == "No" ? "I am not a veteran" : "Decline to self-identify");
            autofill_handler(appFields['eeo[veteran]']);
        }
    }

    chrome.storage.local.get({
        applied_jobs: {}
    }, function (e) {
        e.applied_jobs[document.title] = Date.now();
        chrome.storage.local.set(e);
    });

});