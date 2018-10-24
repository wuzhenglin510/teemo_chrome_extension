var caseType = "group";
var search = "";
var cases = [];
var browser = "Chrome"

$('.form').find('input, textarea').on('keyup blur focus', function (e) {

    try {
        var $this = $(this),
            label = $this.prev('label');

        if (e.type === 'keyup') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.addClass('active highlight');
            }
        } else if (e.type === 'blur') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.removeClass('highlight');
            }
        } else if (e.type === 'focus') {

            if ($this.val() === '') {
                label.removeClass('highlight');
            } else if ($this.val() !== '') {
                label.addClass('highlight');
            }
        }
    } catch (err) {

    }
});

$('.tab a').on('click', function (e) {

    try {
        e.preventDefault();

        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');

        target = $(this).attr('href');

        $('.tab-content > div').not(target).hide();

        $(target).fadeIn(600);
    } catch (err) {

    }
});

function teemoPost(uri, data) {
    return new Promise(resolve => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", uri, true);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                let result = JSON.parse(xhr.responseText);
                resolve(result);
            }
        }
        xhr.send(JSON.stringify(data));
    })
}

teemoPost('http://localhost:6385/group.manage', {}).then(result => {
    caseType = "group";
    cases = result.groups;
    document.getElementById("case-container").innerHTML = "";
    for (let group of cases) {
        let tr = document.createElement("tr");
        tr.className = "text-left";
        let td1 = document.createElement("td");
        td1.className = 'text-left';
        td1.innerText = group.scenerioName;
        tr.appendChild(td1);
        let td2 = document.createElement("td");
        td2.className = 'text-center';
        let sp1 = document.createElement("span");
        sp1.className = "oi oi-timer teemo-action";
        sp1.onclick = function () {
            runGroup(group.scenerioName)
        };
        td2.appendChild(sp1);
        let sp2 = document.createElement("span");
        sp2.className = "oi oi-cog teemo-action";
        sp2.onclick = function () {
            modify(group.scenerioName, 'group')
        };
        td2.appendChild(sp2);
        tr.appendChild(td2);
        document.getElementById("case-container").appendChild(tr)
    }
})

document.getElementById("teemo-choose-browser").onchange = function (event) {
    browser = event.target.value;
}


document.getElementById("teemo-case-search").oninput = function (event) {
    search = event.target.value;
    document.getElementById("case-container").innerHTML = "";
    for (let icase of cases) {
        if (icase.scenerioName.indexOf(search) != -1) {
            let tr = document.createElement("tr");
            tr.className = "text-left";
            let td1 = document.createElement("td");
            td1.className = 'text-left';
            td1.innerText = icase.scenerioName;
            tr.appendChild(td1);
            let td2 = document.createElement("td");
            td2.className = 'text-center';
            let sp1 = document.createElement("span");
            sp1.className = "oi oi-timer teemo-action";
            if (caseType == "group") {
                sp1.onclick = function () {
                    runGroup(icase.scenerioName)
                };
                td2.appendChild(sp1);
                let sp2 = document.createElement("span");
                sp2.className = "oi oi-cog teemo-action";
                sp2.onclick = function () {
                    modify(icase.scenerioName, 'group')
                };
                td2.appendChild(sp2);
            } else {
                sp1.onclick = function () {
                    runScenerio(icase.scenerioName)
                };
                td2.appendChild(sp1);
                let sp2 = document.createElement("span");
                sp2.className = "oi oi-cog teemo-action";
                sp2.onclick = function () {
                    modify(icase.scenerioName, 'scenerio')
                };
                td2.appendChild(sp2);
            }
            tr.appendChild(td2);
            document.getElementById("case-container").appendChild(tr)
        }
    }
}




document.getElementById("run-all-silence").onclick = function () {
    if (caseType == "scenerio") {
        teemoPost('http://localhost:6385/scenerio.run', {
            scenerioName: search,
            browser: browser,
            runAll: true,
            silence: true
        }).then(result => {
            alert(`success append test task, please wait!`)
        })
    } else {
        teemoPost('http://localhost:6385/group.run', {
            scenerioName: search,
            browser: browser,
            runAll: true,
            silence: true
        }).then(result => {
            alert(`success append test task, please wait!`)
        })
    }
}

document.getElementById("run-all-alert").onclick = function () {
    if (caseType == "scenerio") {
        teemoPost('http://localhost:6385/scenerio.run', {
            scenerioName: search,
            browser: browser,
            runAll: true,
            silence: false
        }).then(result => {
            alert(`success append test task, please wait!`)
        })
    } else {
        teemoPost('http://localhost:6385/group.run', {
            scenerioName: search,
            browser: browser,
            runAll: true,
            silence: false
        }).then(result => {
            alert(`success append test task, please wait!`)
        })
    }
}




function runGroup(scenerioName) {
    teemoPost('http://localhost:6385/group.run', {
        scenerioName: scenerioName,
        browser: browser,
        closeBrowser: document.getElementById("closeBrowser").checked
    }).then(result => {
        alert(`success append test task, please wait!`)
    })
}

function runScenerio(scenerioName) {
    teemoPost('http://localhost:6385/scenerio.run', {
        scenerioName: scenerioName,
        browser: browser,
        closeBrowser: document.getElementById("closeBrowser").checked
    }).then(result => {
        alert(`success append test task, please wait!`)
    })
}

document.getElementById("manageGroups").onclick = function () {
    caseType = "group";
    teemoPost('http://localhost:6385/group.manage').then(result => {
        cases = result.groups;
        console.log(result)
        document.getElementById("case-container").innerHTML = "";
        for (let group of cases) {
            let tr = document.createElement("tr");
            tr.className = "text-left";
            let td1 = document.createElement("td");
            td1.className = 'text-left';
            td1.innerText = group.scenerioName;
            tr.appendChild(td1);
            let td2 = document.createElement("td");
            td2.className = 'text-center';
            let sp1 = document.createElement("span");
            sp1.className = "oi oi-timer teemo-action";
            sp1.onclick = function () {
                runGroup(group.scenerioName)
            };
            td2.appendChild(sp1);
            let sp2 = document.createElement("span");
            sp2.className = "oi oi-cog teemo-action";
            sp2.onclick = function () {
                modify(group.scenerioName, 'group')
            };
            td2.appendChild(sp2);
            tr.appendChild(td2);
            document.getElementById("case-container").appendChild(tr)
        }
    })
}

document.getElementById("manageScenerios").onclick = function () {
    caseType = "scenerio";
    teemoPost('http://localhost:6385/scenerio.manage').then(result => {
        cases = result.scenerios;
        console.log(result)
        document.getElementById("case-container").innerHTML = "";
        for (let scenerio of cases) {
            let tr = document.createElement("tr");
            tr.className = "text-left";
            let td1 = document.createElement("td");
            td1.className = 'text-left';
            td1.innerText = scenerio.scenerioName;
            tr.appendChild(td1);
            let td2 = document.createElement("td");
            td2.className = 'text-center';
            let sp1 = document.createElement("span");
            sp1.className = "oi oi-timer teemo-action";
            sp1.onclick = function () {
                runScenerio(scenerio.scenerioName)
            };
            td2.appendChild(sp1);
            let sp2 = document.createElement("span");
            sp2.className = "oi oi-cog teemo-action";
            sp2.onclick = function () {
                modify(scenerio.scenerioName, 'scenerio')
            };
            td2.appendChild(sp2);
            tr.appendChild(td2);
            document.getElementById("case-container").appendChild(tr)
        }
    })
}


function modify(scenerioName, type) {
    console.log(`modify ${scenerioName} ${type}`)
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        teemoPost(`http://localhost:6385/${type}.get`, {
            scenerioName
        }).then(result => {
            chrome.tabs.executeScript(tabs[0].id, {
                code: `window.location.href="${result.steps[0].url}";`
                // code: `window.open("${result.steps[0].url}");`
            })
            setTimeout(() => {
                chrome.tabs.executeScript(
                    tabs[0].id, {
                        code: `
                           var teemoUpdateEnv = document.createElement('span');
                           teemoUpdateEnv.style="display:none";
                           teemoUpdateEnv.id = "teemoUpdateEnv";
                           teemoUpdateEnv.innerText = '${scenerioName}';
                           document.body.appendChild(teemoUpdateEnv);

                            var teemo_inject_xpath = document.createElement('script');
                            teemo_inject_xpath.src = 'http://localhost:6385/teemo_inject_xpath.js'
                            document.body.appendChild(teemo_inject_xpath);
    
                            var teemo_inject_common_script = document.createElement('script');
                            teemo_inject_common_script.src = 'http://localhost:6385/teemo_inject_common_js.js'
                            document.body.appendChild(teemo_inject_common_script);
    
                            setTimeout(function () {
                                var teemo_inject_${type}_script = document.createElement('script');
                                teemo_inject_${type}_script.src = 'http://localhost:6385/teemo_inject_${type}_update_js.js'
                                document.body.appendChild(teemo_inject_${type}_script);
                            }, 500)
                            
                            var teemo_inject_link = document.createElement('link');
                            teemo_inject_link.type = "text/css";
                            teemo_inject_link.rel = "stylesheet";
                            teemo_inject_link.href = 'http://localhost:6385/teemo_inject_css.css'
                            document.getElementsByTagName( "head" )[0].appendChild( teemo_inject_link );

                            `
                    });
            }, 2000)

        })
    });
};