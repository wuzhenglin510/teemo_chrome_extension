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
            td2.className = 'text-left';
            td2.innerText = 'run';
            td2.onclick = function () { runGroup(group.scenerioName)};
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
            td2.className = 'text-left';
            td2.innerText = 'run';
            td2.onclick = function () { runGroup(group.scenerioName)};
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
            td2.className = 'text-left';
            td2.innerText = 'run';
            td2.onclick = function () {
                runScenerio(scenerio.scenerioName);
            } 
            tr.appendChild(td2);
            document.getElementById("case-container").appendChild(tr)
        }
    })
}
