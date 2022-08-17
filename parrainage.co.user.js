// ==UserScript==
// @name        parrainage.co
// @description parrainage.co
// @author      spitant
// @match       https://parrainage.co/account/offers
// @grant       GM_addStyle
// @version     4.0.1
// @homepage    https://github.com/spitant/TamperMonkeyScript/
// @downloadURL https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/parrainage.co.user.js
// @updateURL   https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/parrainage.co.user.js
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

const annonceList = getAnnonce();

/**
 * Set label count on added button
 * @param {int} count Current iteration
 */
function setLabelButton(count){
    const btn = document.getElementById('myButton');
    btn.textContent = 'Actualiser '+ count + '/' + annonceList.length;
}


/**
 * Get the list of annonces
 * @return The list of annonces
 */
function getAnnonce(){
    var array = []
    const max_page = 100;
    var page;
    for(page = 1; page <= max_page; page++) {
        var array_list = getAnnoncePage(page);
        if (array_list.length == 0){
            break;
        }
        array = array.concat(array_list);
    }
    console.log("Array= " + array);
    const shuffled_array = array.sort((a, b) => 0.5 - Math.random());
    return shuffled_array;
}


/**
 * Get the list of annonces for one page
 * @param {int} page Paage index
 * @return The list of annonces
 */
function getAnnoncePage(page) {
    var annonces = []
    try {
        const parser = new DOMParser();
        var xhr = new XMLHttpRequest();
        console.log("=================================");
        console.log("Page = " + page);
        console.log("=================================");
        xhr.open("GET", "https://parrainage.co/account/offers?page="+ page, false);
        xhr.onloadend = function(){
            if (xhr.status === 200) {
                var responseXML = parser.parseFromString(xhr.responseText, "text/html");
                const links_html = responseXML.getElementsByClassName('btn');
                for (var link of links_html) {
                    link = "" + link
                    const link_split = link.split("/")
                    if (link_split[link_split.length-2] == "offers"){
                        const annonce_id = link_split[link_split.length-1];
                        if (annonce_id != "new"){
                            annonces.push(annonce_id);
                        }
                    }

                }
            }
        };
        xhr.send()
        for (const annonce of annonces) {
            console.log("Annonce ID= " + annonce);
        }
    }
    catch(err) {
        console.log("Error= " + err);

    }
    return annonces;
}


/**
 * Handler for added button
 */
function ButtonClickAction (zEvent) {
    var count = 0;
    setLabelButton(count);
    var tasks = ["offers/boost/", "vote/"];
    for (const element of annonceList) {
        for (const task of tasks) {
            console.log("Send https://parrainage.co/account/" + task + element.toString());
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "https://parrainage.co/account/" + task + element.toString());
            xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send();
        }
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
