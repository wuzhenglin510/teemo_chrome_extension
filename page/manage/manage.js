$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
  
        if (e.type === 'keyup') {
              if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
          if( $this.val() === '' ) {
              label.removeClass('active highlight'); 
              } else {
              label.removeClass('highlight');   
              }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
              label.removeClass('highlight'); 
              } 
        else if( $this.val() !== '' ) {
              label.addClass('highlight');
              }
      }
  
  });
  
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });

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

teemoPost('http://localhost:6385/group.manage', {}).then(result => {
        console.log(result)
        document.getElementById("case-container").innerHTML = "";
        for (let group of result.groups) {
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
            sp1.onclick = function () { runGroup(group.scenerioName)};
            td2.appendChild(sp1);
            let sp2 = document.createElement("span");
            sp2.className = "oi oi-cog teemo-action";
            sp2.onclick = function () { modify(group.scenerioName, 'group')};
            td2.appendChild(sp2);
            tr.appendChild(td2);
            document.getElementById("case-container").appendChild(tr)
        }
    })

document.getElementById("manageGroups").onclick = function () {
    teemoPost('http://localhost:6385/group.manage', {}).then(result => {
        console.log(result)
        document.getElementById("case-container").innerHTML = "";
        for (let group of result.groups) {
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
            sp1.onclick = function () { runGroup(group.scenerioName)};
            td2.appendChild(sp1);
            let sp2 = document.createElement("span");
            sp2.className = "oi oi-cog teemo-action";
            sp2.onclick = function () { modify(group.scenerioName, 'group')};
            td2.appendChild(sp2);
            tr.appendChild(td2);
            document.getElementById("case-container").appendChild(tr)
        }
    })
}

function runGroup(scenerioName) {
    teemoPost('http://localhost:6385/group.run', {scenerioName: scenerioName}).then(result => {
        
    })
}

function runScenerio(scenerioName) {
    teemoPost('http://localhost:6385/scenerio.run', {scenerioName: scenerioName}).then(result => {
        
    })
}

document.getElementById("manageScenerios").onclick =  function () {
    teemoPost('http://localhost:6385/scenerio.manage', {}).then(result => {
        console.log(result)
        document.getElementById("case-container").innerHTML = "";
        for (let scenerio of result.scenerios) {
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
            sp1.onclick = function () { runScenerio(scenerio.scenerioName)};
            td2.appendChild(sp1);
            let sp2 = document.createElement("span");
            sp2.className = "oi oi-cog teemo-action";
            sp2.onclick = function () { modify(scenerio.scenerioName, 'scenerio')};
            td2.appendChild(sp2);
            tr.appendChild(td2);
            document.getElementById("case-container").appendChild(tr)
        }
    })
}


function modify (scenerioName, type) {
    console.log(`modify ${scenerioName} ${type}`)
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        teemoPost(`http://localhost:6385/${type}.get`, {scenerioName}).then(result => {
            chrome.tabs.executeScript(tabs[0].id, {
                code: `window.location.href="${result.steps[0].url}";`
                // code: `window.open("${result.steps[0].url}");`
            })
            setTimeout(() => {
                chrome.tabs.executeScript(
                    tabs[0].id, {
                        code: `
                           var teemoUpdateEnv = document.createElement('div');
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
