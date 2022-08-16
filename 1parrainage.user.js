// ==UserScript==
// @name         1parrainage
// @description Code parrain refree all
// @author      spitant
// @version      1.0.1
// @match        https://www.1parrainage.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1parrainage.com
// @homepage    https://github.com/spitant/TamperMonkeyScript/
// @downloadURL https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/1parrainage.user.js
// @updateURL   https://raw.githubusercontent.com/spitant/TamperMonkeyScript/main/1parrainage.user.js
// @namespace   https://github.com/spitant/TamperMonkeyScript/
// @grant        none
// ==/UserScript==

/**
 * sleep
 * @param {int} milliseconds number of milliseconds to sleep
 */
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}


(function() {
    'use strict';

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

    // Test
    //delete_parrainage(1578273);
    //publier_parrainage(100204, "https://bravospeed.onelink.me/hpFJ/e1cce352", "Je t'offre un ticket pour tenter de gagner 500 000 € sur Bravospeed. C'est une application de loterie 100% gratuite !\n\nEn t'inscrivant avec mon lien de parrainage, j'en profite aussi !\n\nC'est gagnant - gagnant.\n\nClique ici : https://bravospeed.onelink.me/hpFJ/e1cce352");
})();
