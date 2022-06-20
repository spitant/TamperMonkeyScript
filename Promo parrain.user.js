//==UserScript==
// @name        Promo parrain
// @description Promo parrain
// @match       https://www.promo-parrain.com/membres/annonces
// @grant       GM_addStyle
// @version     0.2
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
    const userID = 686
    var elements = document.getElementsByClassName("pboutonv");
    btn.textContent = 'Actualiser 0/' + elements.length;
    var count = 0;
    for (const element of elements) {
        console.log("element " + element.getAttribute("onclick"));
        element.click()
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