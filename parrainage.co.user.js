//==UserScript==
// @name        parrainage.co
// @description parrainage.co
// @match       https://parrainage.co/account/offers
// @grant       GM_addStyle
// @version     0.1
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
    var elements = [74480, 74481, 74482, 74616, 74771, 74473, 74483, 74484, 74485, 74486, 74487, 74658, 74817, 74488, 74867, 75040, 74868, 74763, 74869, 74718, 75076, 75098, 75366, 75367, 74719, 74871, 75198, 75622, 75223, 76075, 75669, 75672, 74474, 76116, 76121, 75936, 76226, 76233, 74475, 76316, 76251, 76369, 76287, 76414, 76576, 76451, 76602, 76455, 76607, 76635, 74476, 76662, 74477, 76835, 76752, 76867, 74478, 74471, 74472, 77371, 74479, 77514];
    btn.textContent = 'Actualiser 0/' + elements.length;
    var count = 0;
    var tasks = ["offers/boost/", "vote/"];
    for (const element of elements) {
        for (const task of tasks) {
            console.log("Send https://parrainage.co/account/" + task + element.toString());
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "https://parrainage.co/account/" + task + element.toString());
            xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
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