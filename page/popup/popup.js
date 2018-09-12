$(function () {

    let recordStepGroupButton = document.getElementById('bt_record_step_group');
    recordStepGroupButton.onclick = function (element) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id, {
                    code: `
                        var script = document.createElement('script');
                        script.innerHTML = 'alert("777");'
                        document.body.appendChild(script);
                        `
                });
        });
    };


});