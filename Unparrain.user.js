// ==UserScript==
// @name        Unparrain
// @description Unparrain
// @match       http://www.unparrain.fr/compte/compte
// @grant       GM_addStyle
// @version     0.3
// @homepage    https://github.com/spitant/TamperMonkeyScript/
// @downloadURL https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/Unparrain.user.js
// @updateURL   https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/Unparrain.user.js
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

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max-min));
}

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function ButtonClickAction (zEvent) {
    const btn = document.getElementById('myButton');
    var elements = document.getElementsByClassName("btn-group");
    btn.textContent = 'Actualiser 0/' + elements.length;
    var count = 0;
    for (const element of elements) {
        let action = element.getAttribute("action");
        if (action != null && action.includes("/front")){
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "	http://www.unparrain.fr" + action);

            xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            console.log("Send " + action);
            xhr.send();
            await sleep(getRandomInt(3500, 6000))
        }
        count++;
        btn.textContent = 'Actualiser '+ count + '/' + elements.length;
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
const btn = document.getElementById('myButton');
var elements = document.getElementsByClassName("btn-group");
btn.textContent = 'Actualiser 0/' + elements.length;
