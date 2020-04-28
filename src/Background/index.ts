// see, it's typescript!  Parcel doesn't throw type errors by default,
// but it will let you compile it.
const style: string = 'background-color: blue; color: white; font-size: large; border-radius: 9px; padding: 2px 6px';

console.log('%cBACKGROUND SCRIPT%c running', style, '');

// works: //# sourceMappingURL=http://localhost:8080/Background/index.js.map
//# sourceMappingURL=file://c:/git/svelte-extension/dist//Background/index.js.map

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });