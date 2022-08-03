// ==UserScript==
// @name        Unparrain
// @description Unparrain
// @match       http://www.unparrain.fr/compte/compte
// @grant       GM_addStyle
// @version     3.0.0
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

/**
 * Set label count on added button
 * @param {int} count Current iteration
 */
function setLabelButton(count){
    const btn = document.getElementById('myButton');
    btn.textContent = 'Actualiser '+ count + '/' + getAnnonce().length;
}

/**
 * Get random int between min and max
 * @param {int} min: minimum value
 * @param {int} max: maximum value
 * @return Random value
 */
function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

/**
 * sleep
 * @param {int} milliseconds number of milliseconds to sleep
 */
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Get the list of annonces
 * @return The list of annonces
 */
function getAnnonce(){
  var arr = []
  var elements = document.getElementsByClassName("btn-group");
  for (const element of elements) {
      let action = element.getAttribute("action");
      if (action != null && action.includes("/front")) {
          arr.push(action);
      }
  }
  const shuffled_array = arr.sort((a, b) => 0.5 - Math.random());
  return shuffled_array;
}

/**
 * Handler for added button
 */
async function ButtonClickAction (zEvent) {
    var elements = getAnnonce();
    var count = 0;
    setLabelButton(count);
    for (const element of elements) {
          let xhr = new XMLHttpRequest();
          xhr.open("POST", "http://www.unparrain.fr" + element);
          xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml");
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.send();
          await sleep(getRandomInt(3500, 6000))
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
