console.log("Teste TRE")

var start = null;

var response = undefined
var candidatesData = []
var pct = 0
let lulaName = "LULA"
let bozoName = "JAIR BOLSONARO"



function doGetRequest(url) {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === XMLHttpRequest.DONE
                && xmlhttp.status == 200) {
            response = JSON.parse(xmlhttp.responseText)
            loadList()
        }
    }
    xmlhttp.open("GET", url, true)
    xmlhttp.send()
}

function loadList(){
    candidatesData = []
    response.cand.forEach(element => {
                         let candidate = {
                            name: element.nm,
                            percent: element.pvap
                         }
                         candidatesData.push(candidate)
                 
                     });
    pct = response.pst
    updateScreen();

}

function updateScreen(){
    var div = document.getElementById('new')
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }

    candidatesData.forEach(cData => {
        var tag = document.createElement("p");
        var text = document.createTextNode(cData.name + " --> " + cData.percent + "%");
        tag.appendChild(text);
       
        div.appendChild(tag);
        console.log(cData)
    });

    var tag = document.createElement("p");
    var node = document.createTextNode("Total de urnas apuradas: " + pct+ "%");
    tag.appendChild(node);
    div.appendChild(tag);
}

function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;

    if (progress > 2000) {

        doGetRequest("https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json")
        progress = 0
    }

    window.requestAnimationFrame(step);
  }
  
  window.requestAnimationFrame(step);