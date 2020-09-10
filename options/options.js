// Saves options to chrome.storage
function save_info() {
    var formData = new FormData(document.getElementById('form'));
    var object = {};
    formData.forEach((value, key) => {
        object[key] = value
    });

    chrome.storage.local.set(object, function () {
        // Update status to let user know options were saved.
        alert("Changes Saved");
    });
    event.preventDefault();
}

function restore_options() {
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
        disability: '',
    }, items => {
        // Unpack and Populate Form from Storage
        Object.keys(items).forEach((field) => {
            document.querySelector('#' + field).value = items[field];
        });
    });
}


function populate_job_table() {
    var tableRef = document.getElementById('job-table').getElementsByTagName('tbody')[0];
    chrome.storage.local.get({applied_jobs: []}, apps => {
        console.log(apps);
        Object.keys(apps['applied_jobs']).forEach((app) => {
            var newRow = tableRef.insertRow(0);
            var dateCell = newRow.insertCell(0);
            var jobCell = newRow.insertCell(1);

            var intervalInSeconds = Math.round((Date.now() - apps['applied_jobs'][app])/1000);
            dateCell.appendChild(document.createTextNode(humanizeTime(intervalInSeconds)));
            jobCell.appendChild(document.createTextNode(app));
            
        });
    });
}

function humanizeTime(uTime) {
    if (uTime / 31104000 > 1)
        return "" + Math.round(uTime/31104000) + " Years Ago"
    if (uTime / 31104000 == 1)
        return "1 Year Ago"
    if (uTime / 2592000 > 1)
        return "" + Math.round(uTime/2592000) + " Months Ago"
    if (uTime / 2592000 == 1)
        return "1 Month Ago"
    if (uTime / 604800 > 1)
        return "" + Math.round(uTime/604800) + " Weeks Ago"
    if (uTime / 604800 == 1)
        return "1 Week Ago"
    if (uTime / 86400 > 1)
        return "" + Math.round(uTime/86400) + " Days Ago"
    if (uTime / 86400 == 1)
        return "1 Day Ago"
    if (uTime / 3600 > 1)
        return "" + Math.round(uTime/3600) + " Hours Ago"
    if (uTime / 3600 == 1)
        return "1 Hour Ago"
    if (uTime / 60 > 1)
        return "" + Math.round(uTime/60) + " Minutes Ago"
    if (uTime / 60 == 1)
        return "1 Day Ago"
    return "" + uTime + " Seconds Ago"
}

function reset_tracker() {
    chrome.storage.local.set({applied_jobs: {}},
        function() {
            alert("Tracker Reset")
            location.reload();
        });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#form').addEventListener('submit', save_info);
document.querySelector('#tracker-reset').addEventListener('click', reset_tracker);
populate_job_table();
