// ==UserScript==
// @name         1parrainage
// @description  Code parrain refree all
// @author       spitant
// @version      1.1.0
// @match        https://www.1parrainage.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1parrainage.com
// @homepage     https://github.com/spitant/TamperMonkeyScript/
// @downloadURL  https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/1parrainage.user.js
// @updateURL    https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/1parrainage.user.js
// @namespace    https://github.com/spitant/TamperMonkeyScript/
// @grant        GM_addStyle
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
 * sleep
 * @param {int} milliseconds number of milliseconds to sleep
 */
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

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
    var array = []
    const max_page = 10;
    var page;
    for(page = 1; page <= max_page; page++) {
        var array_list = get_parrainage(page);
        if (array_list.length == 0){
            break;
        }
        array = array.concat(array_list);
    }
    console.log("Array= " + array);
    const shuffled_array = array.sort((a, b) => 0.5 - Math.random());
    return shuffled_array;
}



function get_parrainage(page) {
    var links = []
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
                for (const link of links_html) {
                    links.push(link);
                }
            }
        };
        xhr.send()
        for (const link of links) {
            console.log("Link= " + link);
        }
    }
    catch(err) {
        console.log("Error= " + err);

    }
    return links;
}



function post_parrainage(token, offer_id, code, presentation){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://www.1parrainage.com/espace_parrain/parrainages/add/", true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Referer', 'https://www.1parrainage.com/espace_parrain/parrainages/add/');
    xhr.setRequestHeader('Sec-Fetch-Dest', 'document');
    xhr.setRequestHeader('Sec-Fetch-Mode', 'navigate');
    xhr.setRequestHeader('Sec-Fetch-User', '?');
    xhr.setRequestHeader('Upgrade-Insecure-Requests', '1');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    var data = encodeURIComponent("edit_parrainage[parrainage]") + "=" + encodeURIComponent(offer_id);
    data += "&" + encodeURIComponent("edit_parrainage[code]") + "=" + encodeURIComponent(code);
    data += "&" + encodeURIComponent("edit_parrainage[presentation]") + "=" + encodeURIComponent(presentation);
    data += "&" + encodeURIComponent("edit_message[save]") + "=" + encodeURIComponent("");
    data += "&" + encodeURIComponent("edit_parrainage[_token]") + "=" + encodeURIComponent(token);
    xhr.send(data)
}

function publier_parrainage(offer_id, code, presentation) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.1parrainage.com/espace_parrain/parrainages/add/", true);
    xhr.responseType = "document";
    xhr.onload = function(){
        const input = xhr.responseXML.getElementById('edit_parrainage__token');
        console.log("Token= " + input.value);
        const token = input.value;
        post_parrainage(token, offer_id, code, presentation);
    };
    xhr.send()
}


function delete_parrainage(parrainage_id) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.1parrainage.com/espace_parrain/parrainages/delete/"+ parrainage_id + "/", true);
    xhr.send()
}

/**
 * Handler for added button
 */
function ButtonClickAction (zEvent) {
    var elements = getAnnonce();
    var count = 0;
    setLabelButton(count);
    for (const element of elements) {
        /*let action = element.getAttribute("href");
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://code-parrainage.net/" + action);
        xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        console.log("Send " + action);
        xhr.send();
        count++;
        setLabelButton(count);*/
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
// Test
//delete_parrainage(1578273);
//publier_parrainage(100204, "https://bravospeed.onelink.me/hpFJ/e1cce352", "Je t'offre un ticket pour tenter de gagner 500 000 € sur Bravospeed. C'est une application de loterie 100% gratuite !\n\nEn t'inscrivant avec mon lien de parrainage, j'en profite aussi !\n\nC'est gagnant - gagnant.\n\nClique ici : https://bravospeed.onelink.me/hpFJ/e1cce352");

