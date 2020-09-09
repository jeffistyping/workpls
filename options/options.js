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

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#form').addEventListener('submit', save_info);
