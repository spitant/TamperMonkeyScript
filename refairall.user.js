// ==UserScript==
// @name        refairall
// @description refairall refree all
// @author      spitant
// @match       https://refairall.com/dashboard/annonces
// @grant       GM_addStyle
// @version     1.0.0
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

function getAnnonce(){
    var arr = []
    const btn = document.getElementById('myButton');
    return document.getElementsByClassName('announcementVisibility');
}
const annonces = getAnnonce();

function setLabelButton(count){
    const btn = document.getElementById('myButton');
    btn.textContent = 'Actualiser '+ count + '/' + annonces.length;
}

function ButtonClickAction (zEvent) {
    var elements = annonces;
    var count = 0;
    setLabelButton(count);
    for (const element of elements) {
        element.click();
        element.click();
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
