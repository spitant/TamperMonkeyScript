// ==UserScript==
// @name         1parrainage
// @description  Code parrain refree all
// @author       spitant
// @version      2.0.0
// @match        https://www.1parrainage.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1parrainage.com
// @homepage     https://github.com/spitant/TamperMonkeyScript/
// @downloadURL  https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/1parrainage.user.js
// @updateURL    https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/1parrainage.user.js
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

const ignoreList = ["1501856", "1613457"];
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
        if (array_list.length == 0){
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
                    link = "" + link
                    const link_split = link.split("/")
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
    xhr.open("GET", "https://www.1parrainage.com/espace_parrain/parrainages/delete/"+ parrainage_id + "/", false);
    xhr.send()
}

function get_parrainage(parrainage_id) {
    var parrainage_info = new Map();
    parrainage_info.set('parrainage_id', parrainage_id);
    var xhr = new XMLHttpRequest();
    const parser = new DOMParser();
    xhr.open("GET", "https://www.1parrainage.com/espace_parrain/parrainages/edit/"+ parrainage_id + "/", false);
    xhr.onloadend = function(){
        if (xhr.status === 200) {
            var responseXML = parser.parseFromString(xhr.responseText, "text/html");
            const offer_select = responseXML.getElementById('editparrainage_parrainage');
            parrainage_info.set('offer_code', responseXML.getElementById('edit_parrainage_code').value);
            parrainage_info.set('offer_presentation', responseXML.getElementById('edit_parrainage_presentation').value);
            parrainage_info.set('offer_value', offer_select.options[offer_select.selectedIndex].value);
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
        delete_parrainage(annonce_id);
        publier_parrainage(annonce_data.get('offer_value'), annonce_data.get('offer_code'), annonce_data.get('offer_presentation'));
        count++;
        setLabelButton(count);
    }
    console.log(parrainage_infos);
    var blob = new Blob(parrainage_infos, {type: "text/plain;charset=utf-8"});
    saveAs(blob, "backup_parrainage.json");
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

