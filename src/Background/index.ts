import { getAsset, getAssetsForUrl, getInjectionsForUrl, injectAsset } from "./sitedb";

// but it will let you compile it.
const style: string = 'background-color: blue; color: white; font-size: large; border-radius: 9px; padding: 2px 6px';

import './injections.ts'

console.log('%cBACKGROUND SCRIPT%c running (update 3)', style, '');

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.greeting == "hello")
      sendResponse({ farewell: "goodbye" });
  }
);

window['me'] = { getAssetsForUrl, injectAsset, getAsset, getInjectionsForUrl };
