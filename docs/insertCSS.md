
Sample:

```js
    let details = { cssOrigin: 'user', code: 'p { background-color: blue !important; }' };
    chrome.tabs.insertCSS(73, details, callback => { console.log('CSS INJECTED!'); });
```

Here's a minimum to make everything white-on-blue on stack overflow:

```js
let rxStackOverflow = /https:\/\/stackoverflow.com\//
chrome.webNavigation.onDOMContentLoaded.addListener(
    function(details) {
        if (rxStackOverflow.test(details.url)) {
            let cssDetails = { cssOrigin: 'user', code: '* { background-color: blue !important; color: white; }' };
            chrome.tabs.insertCSS(details.tabId, cssDetails, callback => { console.log('CSS INJECTED!'); });
        };
    }
)
```

Runs after page though, let's try the earlier `onCommitted` event:

```js
let rxStackOverflow = /https:\/\/stackoverflow.com\//
chrome.webNavigation.onCommitted.addListener(
    function(details) {
        if (rxStackOverflow.test(details.url)) {
            let cssDetails = {
                cssOrigin: 'user',
                runAt: 'document_start',
                code: '* { background-color: blue !important; color: white; }'
            };
            chrome.tabs.insertCSS(details.tabId, cssDetails, callback => { console.log('CSS INJECTED!'); });
        };
    }
)
```

# Inject using file

```js
let rxStackOverflow = /https:\/\/stackoverflow.com\//
chrome.webNavigation.onCommitted.addListener(
    function(details) {
        if (rxStackOverflow.test(details.url)) {
            let cssDetails = {
                cssOrigin: 'user',
                runAt: 'document_start',
                code: '* { background-color: blue !important; color: white; }'
            };
            chrome.tabs.insertCSS(details.tabId, cssDetails, callback => { console.log('CSS INJECTED!'); });
        };
    }
)
```

# file: css

```js
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
```

Seems better, but still see a flash of non-styled page...  Let's try something else:

```js
let rxStackOverflow = /https:\/\/stackoverflow.com\//

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //if (changeInfo.status === "complete") {
      if (rxStackOverflow.test(tab.url)) {
            let cssDetails = { cssOrigin: 'user', code: '* { background-color: blue !important; color: white; }' };
            chrome.tabs.insertCSS(tabId, cssDetails, callback => { console.log('CSS INJECTED!'); });
        };
  //}
})
```
