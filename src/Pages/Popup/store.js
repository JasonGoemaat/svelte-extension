import { derived } from 'svelte/store';
import { backgroundPage } from '../../stores/background-page';
import { currentTab } from '../../stores/current-tab';

export default derived([backgroundPage, currentTab], ([$backgroundPage, $currentTab], set) => {
    if ($backgroundPage && $currentTab) {
        console.log('$backgroundPage', $backgroundPage);
        console.log('$currentTab', $currentTab);
        set({
            background: $backgroundPage,
            tab: $currentTab,
            injections: $backgroundPage.me.getInjectionsForUrl($currentTab.url)
        });
    }
});
