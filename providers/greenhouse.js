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
        console.log("helo");
        for (var i=0; i < document.forms.length; i++) {
            var appFields = document.forms[i].elements
            if (appFields['job_application[first_name]'] && items.fname) {
                appFields['job_application[first_name]'].value = items.fname;
                autofill_handler(appFields['job_application[first_name]']);
            }

            if (appFields['job_application[last_name]'] && items.lname) {
                appFields['job_application[last_name]'].value = items.lname;
                autofill_handler(appFields['job_application[last_name]']);
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

            //TODO: Find a better way to handle this.. 
            if (appFields['job_application[answers_attributes][0][text_value]'] && items.linkedin) {
                appFields['job_application[answers_attributes][0][text_value]'].value = items.linkedin;
                autofill_handler(appFields['job_application[answers_attributes][0][text_value]']);
            }

            if (appFields['job_application[answers_attributes][1][text_value]'] && items.portfolio) {
                appFields['job_application[answers_attributes][1][text_value]'].value = items.portfolio;
                autofill_handler(appFields['job_application[answers_attributes][1][text_value]']);
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

            if (appFields['comments'] && items.comments) {
                appFields['comments'].value = items.addInfo;
                autofill_handler(appFields['comments']);
            }
        }
    }
});