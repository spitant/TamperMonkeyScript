// ==UserScript==
// @name         super-parrain
// @description  Super parrain refree all
// @author       spitant
// @version      0.0.1
// @match        https://www.super-parrain.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=super-parrain.com
// @homepage     https://github.com/spitant/TamperMonkeyScript/
// @downloadURL  https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/super-parrain.user.js
// @updateURL    https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/super-parrain.user.js
// @namespace    https://github.com/spitant/TamperMonkeyScript/
// @grant        GM_addStyle
// @require     https://raw.githubusercontent.com/eligrey/FileSaver.js/master/dist/FileSaver.min.js
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

const annonceList = getAnnonceList();
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
    btn.textContent = 'Actualiser '+ count + '/' + annonceList.length;
}

function removeUserName(link){
    const link_split = link.split("/");
    const user_name = link_split[link_split.length-1];
    return link.replace(user_name, "");
}

/**
 * Get the list of annonces
 * @return The list of annonces
 */
function getAnnonceList(){
    var annonces = []
    try {
        const parser = new DOMParser();
        var xhr = new XMLHttpRequest();
        console.log("=================================");
        console.log("Load");
        console.log("=================================");
        xhr.open("GET", "https://www.super-parrain.com/tableau-de-bord", false);
        xhr.onloadend = function(){
            if (xhr.status === 200) {
                var responseXML = parser.parseFromString(xhr.responseText, "text/html");
                const links_html = responseXML.getElementsByClassName('c-offer__link');
                for (var link of links_html) {
                    link = "" + link;
                    annonces.push(link);
                }
            }
        };
        xhr.send()
    }
    catch(err) {
        console.log("Error= " + err);
    }
    const shuffled_array = annonces // .sort((a, b) => 0.5 - Math.random());
    console.log("Array= " + shuffled_array);
    return shuffled_array;
}



function publier_parrainage(parrainage_url, presentation) {
    const publicationUrl = removeUserName(parrainage_url).replace("annonces/", "devenir-parrain");
    const token = get_token(publicationUrl);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", publicationUrl, false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Upgrade-Insecure-Requests', '1');
    xhr.setRequestHeader('Referer', parrainage_url);
    var data = encodeURIComponent("form[_token]") + "=" + encodeURIComponent(token);
    data += "&" + encodeURIComponent("form[message]") + "=" + encodeURIComponent(presentation.replaceAll("<br>", ""));
    xhr.send(data)
}

function get_token(parrainage_url) {
    var token = "";
    var xhr = new XMLHttpRequest();
    const parser = new DOMParser();
    xhr.open("GET", parrainage_url, false);
    xhr.onloadend = function(){
        if (xhr.status === 200) {
            var responseXML = parser.parseFromString(xhr.responseText, "text/html");
            token = responseXML.getElementById('form__token').value;
            console.log("Type= " + token );
        }
    };
    xhr.send()
    return token;
}


function delete_parrainage(parrainage_url) {
    const token = get_token(parrainage_url);
    const removedUrl = removeUserName(parrainage_url).replace("annonces/", "desinscription");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", removedUrl, false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Upgrade-Insecure-Requests', '1');
    xhr.setRequestHeader('Referer', parrainage_url);
    const data = encodeURIComponent("form[_token]") + "=" + encodeURIComponent(token);
    xhr.send(data)
}

function get_parrainage(parrainage_url) {
    var parrainage_info = new Map();
    parrainage_info.set('parrainage_url', parrainage_url);
    var xhr = new XMLHttpRequest();
    const parser = new DOMParser();
    xhr.open("GET", parrainage_url, false);
    xhr.onloadend = function(){
        if (xhr.status === 200) {
            var responseXML = parser.parseFromString(xhr.responseText, "text/html");
            const presentation = responseXML.getElementsByClassName('c-parrain__message');
            console.log("Type= " + presentation[0].innerHTML );
            parrainage_info.set('offer_presentation', presentation[0].innerHTML);
        }
    };
    xhr.send()
    return parrainage_info;
}

/**
 * Handler for added button
 */
function ButtonClickAction (zEvent) {
    var count = 0;
    setLabelButton(count);
    var parrainage_infos = [];
    for (const annonce_id of annonceList) {
        var annonce_data = get_parrainage(annonce_id)
        parrainage_infos.push(JSON.stringify(Object.fromEntries(annonce_data)));
        delete_parrainage(annonce_data.get('parrainage_url'));
        publier_parrainage(annonce_data.get('parrainage_url'), annonce_data.get('offer_presentation'));
        count++;
        setLabelButton(count);
    }
    console.log(parrainage_infos);
    var blob = new Blob(parrainage_infos, {type: "text/plain;charset=utf-8"});
    saveAs(blob, "backup_superparrain.json");
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
