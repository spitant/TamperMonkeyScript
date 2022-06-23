// ==UserScript==
// @name        Code parrain
// @description Code parrain refree all
// @author      spitant
// @match       https://code-parrainage.net/moncompte
// @grant       GM_addStyle
// @version     1.1.0
// @homepage    https://github.com/spitant/TamperMonkeyScript/
// @downloadURL https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/Code_parrain.js
// @updateURL   https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/Code_parrain.js
// @namespace   https://github.com/spitant/TamperMonkeyScript/
// ==/UserScript==

/*--- Create a button in a container div.  It will be styled and
    positioned with CSS.
*/
var zNode = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">'
                + 'Refresh All</button>'
                ;
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);

function setLabelButton(count){
    const btn = document.getElementById('myButton');
    btn.textContent = 'Actualiser '+ count + '/' + getAnnonce().length;
}

function getAnnonce(){
    var arr = []
    const btn = document.getElementById('myButton');
    var elements = document.getElementsByTagName('a');
    for (const element of elements) {
        let action = element.getAttribute("href");
        if (action != null && action.startsWith("up/")) {
            arr.push(element);
        }
    }
    return arr;
}

function ButtonClickAction (zEvent) {
    var elements = getAnnonce();
    var count = 0;
    setLabelButton(count);
    for (const element of elements) {
        let action = element.getAttribute("href");
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://code-parrainage.net/" + action);
        xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        console.log("Send " + action);
        xhr.send();
        count++;
        setLabelButton(count);
    }
}

//--- Style our newly added elements using CSS.
GM_addStyle ( `
    #myContainer {
        position:               absolute;
        top:                    0;
        left:                   0;
        font-size:              20px;
        background:             orange;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                1100;
        padding:                5px 20px;
    }
    #myButton {
        cursor:                 pointer;
    }
    #myContainer p {
        color:                  blue;
        background:             white;
    }
` );

setLabelButton(0);
