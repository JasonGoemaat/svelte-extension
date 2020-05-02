import { readable } from "svelte/store";

// https://stackoverflow.com/questions/13359421/chrome-extension-get-current-tab-from-popup

export const currentTab = readable(null, set => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        set(tabs[0]);
    });
});

