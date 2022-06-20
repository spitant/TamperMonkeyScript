//==UserScript==
// @name        Code parrain
// @description Code parrain
// @match       https://code-parrainage.net/moncompte
// @grant       GM_addStyle
// @version     0.3
//==/UserScript==

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

function ButtonClickAction (zEvent) {
    const btn = document.getElementById('myButton');
    var elements = document.getElementsByTagName('a');
    btn.textContent = 'Actualiser 0/' + elements.length;
    var count = 0;
    for (const element of elements) {
        let action = element.getAttribute("href");
        if (action != null && action.startsWith("up/")) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "https://code-parrainage.net/" + action);
            xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            console.log("Send " + action);
            xhr.send();
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
` );// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://code-parrainage.net/moncompte
// @icon         https://www.google.com/s2/favicons?sz=64&domain=code-parrainage.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
})();