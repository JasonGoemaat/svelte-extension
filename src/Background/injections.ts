import { getAssetsForUrl, injectAsset, getAsset } from "./sitedb";

chrome.webNavigation.onDOMContentLoaded.addListener(details => {
    const assets = getAssetsForUrl(details.url);
    assets.forEach(assetName => {
        const asset = getAsset(assetName);
        console.log(`Tab ${details.tabId} url ${details.url} injecting ${asset.type} asset ${asset.name}`);
        injectAsset(details.tabId, asset);
    });
}

/*
let rxStackOverflow = /https:\/\/stackoverflow.com\//
chrome.webNavigation.onCommitted.addListener(
    function(details) {
        if (rxStackOverflow.test(details.url)) {
            let cssDetails = {
                cssOrigin: 'user',
                runAt: 'document_start',
                file: 'Complete/StyleTest.css'
            };
            chrome.tabs.insertCSS(details.tabId, cssDetails, callback => { console.log('CSS INJECTED!'); });
        };
    }
)
*/
