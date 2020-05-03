import { readable } from 'svelte/store'

let setter

let state = {
    loading: true,
    injections: null,
    tab: null,
    background: null,
    db: null
}

export const store = readable(state, set => {
    setter = set;
})

export const actions = {
    init: () => ({
        type: 'INIT'
    }),
    setBackgroundPage: backgroundPage => ({
        type: 'SET_BACKGROUND_PAGE',
        payload: backgroundPage
    }),
    setCurrentTab: currentTab => ({
        type: 'SET_CURRENT_TAB',
        payload: currentTab
    }),
    checkComplete: () => ({
        type: 'CHECK_COMPLETE'
    }),
}

export const dispatch = action => {
    console.log('dispatch:', action);
    let newState = reducer(state, action);
    if (newState !== state) {
        console.log('\tOld state:', state);
        console.log('\tNew state:', newState);
        state = newState;
        setter(state);
        window['state'] = state;
    } else {
        console.log('\tNO STATE CHANGE');
    }
}

/**
 * Dispatch after a timeout for dispatching a new action from the
 * reducer so it can change state and preserve order.
 */
export const dispatchAsync = action => {
    setTimeout(() => dispatch(action), 0);
}

const initialize = () => {
    chrome.runtime.getBackgroundPage(backgroundPage => dispatch(actions.setBackgroundPage(backgroundPage)));
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        dispatch(actions.setCurrentTab(tabs[0]));
    });
}

const reducer = (state, action) => {
    console.log('reducer (state, action)', state, action);
    switch (action.type) {
        case 'INIT':
            initialize();
            break;
        case 'SET_BACKGROUND_PAGE':
            state = { ...state, backgroundPage: action.payload, db: action.payload.db };
            dispatchAsync(actions.checkComplete())
            break;
        case 'SET_CURRENT_TAB':
            state = { ...state, currentTab: action.payload };
            dispatchAsync(actions.checkComplete())
            break;
        case 'CHECK_COMPLETE':
            if (state.backgroundPage && state.currentTab) {
                state = {
                    ...state,
                    loading: false,
                    injections: state.db.getInjectionsForUrl(state.currentTab.url)
                }
            }
            break;
        default:
            throw new Error(`Unknown action: ${JSON.stringify(action)}`);
    }
    return state;
}
