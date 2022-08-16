// ==UserScript==
// @name         1parrainage
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.1parrainage.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1parrainage.com
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

    function post_parrainage(token, parrainage_id, code, presentation){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://www.1parrainage.com/espace_parrain/parrainages/add/", true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Referer', 'https://www.1parrainage.com/espace_parrain/parrainages/add/');
        xhr.setRequestHeader('Sec-Fetch-Dest', 'document');
        xhr.setRequestHeader('Sec-Fetch-Mode', 'navigate');
        xhr.setRequestHeader('Sec-Fetch-User', '?');
        xhr.setRequestHeader('Upgrade-Insecure-Requests', '1');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        var data = encodeURIComponent("edit_parrainage[parrainage]") + "=" + encodeURIComponent(parrainage_id);
        data += "&" + encodeURIComponent("edit_parrainage[code]") + "=" + encodeURIComponent(code);
        data += "&" + encodeURIComponent("edit_parrainage[presentation]") + "=" + encodeURIComponent(presentation);
        data += "&" + encodeURIComponent("edit_message[save]") + "=" + encodeURIComponent("");
        data += "&" + encodeURIComponent("edit_parrainage[_token]") + "=" + encodeURIComponent(token);
        xhr.send(data)
    }

    function initial_call(parrainage_id, code, presentation) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://www.1parrainage.com/espace_parrain/parrainages/add/", true);
        xhr.responseType = "document";
        xhr.onload = function(){
            const input = xhr.responseXML.getElementById('edit_parrainage__token');
            console.log("Token= " + input.value);
            const token = input.value;
            post_parrainage(token, parrainage_id, code, presentation);
        };
        xhr.send()
    }

    // Test
    //initial_call(126, "ceci est un test", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo ullamcorper a lacus vestibulum sed arcu. Amet justo donec enim diam vulputate ut. Fusce id velit ut tortor pretium viverra. Nulla aliquet porttitor lacus luctus. Augue ut lectus arcu bibendum at varius vel pharetra. Non tellus orci ac auctor augue mauris augue neque gravida. Non quam lacus suspendisse faucibus interdum posuere. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Diam quis enim lobortis scelerisque. Tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut. Massa id neque aliquam vestibulum morbi blandit cursus risus at. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Porttitor massa id neque aliquam vestibulum morbi blandit cursus risus.");

})();