$(function () {

    var ServerUp = false;

    function teemoPost(uri, data) {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", uri, true);
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    let result = JSON.parse(xhr.responseText);
                    resolve(result);
                }
            }
            xhr.send(JSON.stringify(data));
        })
    }

    teemoPost('http://localhost:6385/connect').then(result => {
            if (result.up) {
                ServerUp = true;
                if (ServerUp) {
                    document.getElementById("server-status-up").style="display: inline"
                    document.getElementById("server-status-down").style="display: none"
                } else {
                    document.getElementById("server-status-up").style="display: none "
                    document.getElementById("server-status-down").style="display: inline"
                }
            }
    })



    document.getElementById('bt_record_step_group').onclick = function (element) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, {
                code: 'window.location.reload();'
            })
            setTimeout(() => {
                chrome.tabs.executeScript(
                    tabs[0].id, {
                        code: `
                            var teemo_inject_xpath = document.createElement('script');
                            teemo_inject_xpath.src = 'http://localhost:6385/teemo_inject_xpath.js'
                            document.body.appendChild(teemo_inject_xpath);
    
                            var teemo_inject_common_script = document.createElement('script');
                            teemo_inject_common_script.src = 'http://localhost:6385/teemo_inject_common_js.js'
                            document.body.appendChild(teemo_inject_common_script);
    
                            setTimeout(function () {
                                var teemo_inject_group_script = document.createElement('script');
                                teemo_inject_group_script.src = 'http://localhost:6385/teemo_inject_group_js.js'
                                document.body.appendChild(teemo_inject_group_script);
                            }, 500)
                            
                            var teemo_inject_link = document.createElement('link');
                            teemo_inject_link.type = "text/css";
                            teemo_inject_link.rel = "stylesheet";
                            teemo_inject_link.href = 'http://localhost:6385/teemo_inject_css.css'
                            document.getElementsByTagName( "head" )[0].appendChild( teemo_inject_link );
                            `
                    });
            }, 1000)
            
        });
    };

    document.getElementById('bt_record_step_scenerio').onclick = function (element) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, {
                code: 'window.location.reload();'
            })
            setTimeout(() => {
                chrome.tabs.executeScript(
                    tabs[0].id, {
                        code: `
                            var teemo_inject_xpath = document.createElement('script');
                            teemo_inject_xpath.src = 'http://localhost:6385/teemo_inject_xpath.js'
                            document.body.appendChild(teemo_inject_xpath);
    
                            var teemo_inject_common_script = document.createElement('script');
                            teemo_inject_common_script.src = 'http://localhost:6385/teemo_inject_common_js.js'
                            document.body.appendChild(teemo_inject_common_script);
    
                            setTimeout(function () {
                                var teemo_inject_scenerio_script = document.createElement('script');
                                teemo_inject_scenerio_script.src = 'http://localhost:6385/teemo_inject_scenerio_js.js'
                                document.body.appendChild(teemo_inject_scenerio_script);
                            }, 500)
                            
                            var teemo_inject_link = document.createElement('link');
                            teemo_inject_link.type = "text/css";
                            teemo_inject_link.rel = "stylesheet";
                            teemo_inject_link.href = 'http://localhost:6385/teemo_inject_css.css'
                            document.getElementsByTagName( "head" )[0].appendChild( teemo_inject_link );
                            `
                    });
            }, 1000)
            
        });
    };


    

});