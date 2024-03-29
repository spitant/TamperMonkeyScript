// ==UserScript==
// @name         1parrainage
// @description  Code parrain refree all
// @author       spitant
// @version      3.1.4
// @match        https://www.1parrainage.com/espace_parrain/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1parrainage.com
// @homepage     https://github.com/spitant/TamperMonkeyScript/
// @downloadURL  https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/1parrainage.user.js
// @updateURL    https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/1parrainage.user.js
// @namespace    https://github.com/spitant/TamperMonkeyScript/
// @grant        GM_addStyle
// ==/UserScript==

 "use strict";

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

const ignoreList = [];
const annonceList = getAnnonceList();

/**
 * Set label count on added button
 * @param {int} count Current iteration
 */
function setLabelButton(count){
    const btn = document.getElementById('myButton');
    btn.textContent = 'Actualiser '+ count + '/' + annonceList.length;
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
function getAnnonceList(){
    var array = []
    const max_page = 10;
    var page;
    for(page = 1; page <= max_page; page++) {
        var array_list = getAnnonceListPage(page);
        if (array_list.length === 0){
            break;
        }
        array = array.concat(array_list);
    }
    var filtered_array = array.filter(x => !ignoreList.includes(x));
    const shuffled_array = filtered_array.sort((a, b) => 0.5 - Math.random());
    console.log("Array= " + shuffled_array);
    return shuffled_array;
}


/**
 * Get the list of annonces for one page
 * @param {int} page Page index
 * @return The list of annonces
 */
function getAnnonceListPage(page) {
    var annonces = []
    try {
        const parser = new DOMParser();
        var xhr = new XMLHttpRequest();
        console.log("=================================");
        console.log("Page = " + page);
        console.log("=================================");
        xhr.open("GET", "https://www.1parrainage.com/espace_parrain/parrainages/?page="+ page, false);
        xhr.onloadend = function(){
            if (xhr.status === 200) {
                var responseXML = parser.parseFromString(xhr.responseText, "text/html");
                const links_html = responseXML.getElementsByClassName('parrainage_bt visu');
                for (var link of links_html) {
                    link = "" + link;
                    const link_split = link.split("/");
                    const annonce_id = link_split[link_split.length-2];
                    annonces.push(annonce_id);
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
 * Edit parrainage
 */
function edit_parrainage(parrainage_id, token, offer_id, code, presentation){
    console.log("Edit Annonce ID= " + parrainage_id);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://www.1parrainage.com/espace_parrain/parrainages/edit/"+ parrainage_id + "/", false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Upgrade-Insecure-Requests', '1');
    var data = encodeURIComponent("editparrainage[parrainage]") + "=" + encodeURIComponent(offer_id);
    data += "&" + encodeURIComponent("edit_parrainage[parrainage]") + "=" + encodeURIComponent(offer_id);
    data += "&" + encodeURIComponent("edit_parrainage[code]") + "=" + encodeURIComponent(code);
    data += "&" + encodeURIComponent("edit_parrainage[presentation]") + "=" + encodeURIComponent(presentation);
    data += "&" + encodeURIComponent("edit_message[save]") + "=" + encodeURIComponent("");
    data += "&" + encodeURIComponent("edit_parrainage[_token]") + "=" + encodeURIComponent(token);
    xhr.send(data);
}

/**
 * Get parrainage
 */
function get_and_edit_parrainage(parrainage_id) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.1parrainage.com/espace_parrain/parrainages/edit/"+ parrainage_id + "/", false);
    xhr.onloadend = function(){
        if (xhr.status === 200) {
            const parser = new DOMParser();
            var responseXML = parser.parseFromString(xhr.responseText, "text/html");
            const offer_select = responseXML.getElementById('editparrainage_parrainage');
            const offer_id = responseXML.getElementById('editparrainage_parrainage').value;
            const code = responseXML.getElementById('edit_parrainage_code').value;
            const presentation = responseXML.getElementById('edit_parrainage_presentation').value;
            const token = responseXML.getElementById('edit_parrainage__token').value;
            edit_parrainage(parrainage_id, token, offer_id, code, presentation);
        }
    };
    xhr.send();
}

/**
 * Handler for added button
 */
async function ButtonClickAction (zEvent) {
    var count = 0;
    setLabelButton(count);
    for (const annonce_id of annonceList) {
        get_and_edit_parrainage(annonce_id);
        count++;
        setLabelButton(count);
        sleep(500);
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
