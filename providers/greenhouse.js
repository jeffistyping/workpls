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
    race: '',
    veteran: '',
    disability: ''
}, function (items) {
    if (document.forms['application_form']) {

        var appFields = document.forms['application_form'].elements
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

        // EEO
        if (appFields['job_application[gender]'] && items.gender) {
            appFields['job_application[gender]'].value = items.gender == "Male" ? 1 : (items.gender == "Female" ? 2 : 3);
            autofill_handler(appFields['job_application[gender]']);
        }
        if (appFields['job_application[hispanic_ethnicity]'] && items.hispanic) {
            appFields['job_application[hispanic_ethnicity]'].value = items.hispanic == "Na" ? "Decline To Self Identify" : items.hispanic;
            autofill_handler(appFields['job_application[hispanic_ethnicity]']);
            if (appFields['job_application[race]'] && items.race) {
                appFields['job_application[race]'].value = items.race;
                autofill_handler(appFields['job_application[race]']);
            }
        }
        if (appFields['job_application[veteran_status]'] && items.veteran) {
            appFields['job_application[veteran_status]'].value = items.veteran == "Yes" ? 1 : (items.veteran == "No" ? 2 : 3);
            autofill_handler(appFields['job_application[veteran_status]']);
        }
        if (appFields['job_application[disability_status]'] && items.disability) {
            appFields['job_application[disability_status]'].value = items.disability == "Yes" ? 1 : (items.disability == "No" ? 2 : 3);
            autofill_handler(appFields['job_application[disability_status]']);
        }
        
        var jobName = document.querySelector('.app-title').textContent;
        var companyName = document.querySelector('.company-name').textContent;

        chrome.storage.local.get({
            applied_jobs: {}
        }, function(e) {
            e.applied_jobs[companyName.replaceAll("at ", "") + " - " + jobName] = Date.now();
            chrome.storage.local.set(e);
        });

    }
});