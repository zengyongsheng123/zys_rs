// ==UserScript==
// @name         Injector
// @namespace    http://tampermonkey.net/
// @version      2025-03-17
// @description  try to take over the world!
// @author       You
// @match        *.tiktok.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tiktok.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
  console.newlog = console.log;
  console.log = function() {}
  console.warn = function() {}
  console.error = function() {}
  console.info = function() {}

  // Here I used my own website to store the latestDeobf.js
  const webmssdkURL = "";

  const originalCreateElement = document.createElement;
  document.createElement = function (tagName) {
      const element = originalCreateElement.call(this, tagName);
      if (tagName.toLowerCase() === 'script') {
          Object.defineProperty(element, 'src', {
              set(value) {
                  let sourceURL = value;

                  if (value.includes("webmssdk.js"))
                      sourceURL = webmssdkURL;

                  this.setAttribute('src', sourceURL);
              },
              get() {
                  return this.getAttribute('src');
              },
              configurable: true,
              enumerable: true
          });
      }

      return element;
  };

})();