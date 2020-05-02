import { readable } from "svelte/store";

export const backgroundPage = readable(null, set => {
    chrome.runtime.getBackgroundPage(bp => set(bp));
});

