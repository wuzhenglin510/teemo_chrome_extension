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
                        var teemo_inject_script = document.createElement('script');
                        teemo_inject_script.src = 'http://localhost:6385/teemo_inject_js.js'
                        document.body.appendChild(teemo_inject_script);
                        var teemo_inject_link = document.createElement('link');
                        teemo_inject_link.type = "text/css";
                        teemo_inject_link.rel = "stylesheet";
                        teemo_inject_link.href = 'http://localhost:6385/teemo_inject_css.css'
                        document.getElementsByTagName( "head" )[0].appendChild( teemo_inject_link );
                        `
                });
        });
    };


});