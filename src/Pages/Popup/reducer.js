import { readable } from 'svelte/store'

let setter
let state = {
    loading: true,
    injections: null,
    tab: null,
    background: null,
}

const store = readable(INITIAL_STATE, set => {
    setter = set;
})

export const actions = {
    init: () => ({
        type: 'INIT'
    }),
    setBackgroundPage: backgroundPage => ({
        type: 'SET_BACKGROUND_PAGE',
        payload: bp
    }),
    setCurrentTab: currentTab => ({
        type: 'SET_CURRENT_TAB',
        payload: currentTab
    }),
    checkComplete: () => ({
        type: 'CHECK_COMPLETE'
    })
}

export const dispatch = action => {
    let newState = reducer(state);
    console.log('action:', action);
    if (newState !== state) {
        console.log('\tOld state:', state);
        console.log('\tNew state:', newState);
        state = newState;
        setter(state);
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
    chrome.runtime.getBackgroundPage(bp => dispatch(actions.setBackground(bp)));
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        dispatch(actions.setTab(tabs[0]));
    });
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            initialize();
        case 'SET_BACKGROUND_PAGE':
            state = { ...state, backgroundPage: action.payload };
            dispatchAsync(actions.checkComplete())
        case 'SET_CURRENT_TAB':
            state = { ...state, currentTab: action.payload };
            dispatchAsync(actions.checkComplete())
        case 'CHECK_COMPLETE':
            if (state.backgroundPage && state.currentTab) {
                state = {...state, loading: false}
            }
        default:
            throw new Error(`Unknown action: ${JSON.stringify(action)}`);
    }
    return state;
}

export default store;
