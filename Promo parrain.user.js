// ==UserScript==
// @name        Promo parrain
// @description Promo parrain
// @author      spitant
// @match       https://www.promo-parrain.com/membres/annonces
// @grant       GM_addStyle
// @version     3.0.3
// @homepage    https://github.com/spitant/TamperMonkeyScript/
// @downloadURL https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/Promo parrain.user.js
// @updateURL   https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/Promo parrain.user.js
// @namespace   https://github.com/spitant/TamperMonkeyScript/
// @icon        https://www.google.com/s2/favicons?sz=64&domain=promo-parrain.com
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

/**
 * Set label count on added button
 * @param {int} count Current iteration
 */
function setLabelButton(count){
    const btn = document.getElementById('myButton');
    btn.textContent = 'Actualiser '+ count + '/' + getAnnonce().length;
}

/**
 * Get the list of annonces
 * @return The list of annonces
 */
function getAnnonce(){
    var array = [];
    var elements = document.getElementsByClassName("pboutonv");
    for (const element of elements) {
        array.push(element);
    }
    const shuffled_array = array.sort((a, b) => 0.5 - Math.random());
    return shuffled_array;
}

/**
 * Handler for added button
 */
function ButtonClickAction (zEvent) {
    var count = 0;
    setLabelButton(count)
    for (const element of getAnnonce()) {
        console.log("element " + element.getAttribute("onclick"));
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
