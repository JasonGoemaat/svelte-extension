export interface Asset {
    name: string,
    type: string, // 'css' or 'js'
    url: string, // set for internal, cannot be deleted
    code: string
}

export interface Injection {
    name: string,
    rx: string,
    assets: string[]
}

const staticAssets: Map<string, Asset> = new Map<string, Asset>();

staticAssets['util'] = {
    name: 'util',
    type: 'js',
    url: 'js/util.js'
}

staticAssets['sample-script'] = {
    name: 'sample-script',
    type: 'js',
    code: 'console.log("injected sample-script!")'
}

staticAssets['blue'] = {
    name: 'blue2',
    type: 'css',
    code: '* { background-color: blue; color: white; }'
}

staticAssets['red'] = {
    name: 'blue',
    type: 'css',
    url: 'css/red.css'
}

const injections = [
    {
        name: "stackoverflow",
        rx: "'https:\/\/stackoverflow.com\/'",
        assets: ['util', 'red']
    }
]

export const getInjectionsForUrl = (url: string): Injection[] {
    return injections.filter(x => (new RegExp(x.rx).test));
}

export const getAssetsForUrl = (url: string): string[] => {
    let injectionsList = getInjectionsForUrl(url);
    let assetList = injectionsList.reduce((prev, curr) => {
        return [...prev, ...curr.assets]
    }, []);
    return assetList;
}

const dynamicAssets: Map<string, Asset> = new Map<string, Asset>();

export const getAsset = (name: string) => {
    return staticAssets[name] || dynamicAssets[name];
}

export const injectAsset = (tabId: number, asset: Asset) => {
    if (asset.type === 'css') {
        const cssDetails: chrome.tabs.InjectDetails = {
            cssOrigin: 'user',
            runAt: 'document_end',
            // document_start
            // document_idle
            // document_end
        };
        if (asset.url) {
            console.log('cs asset file:', asset.url);
            cssDetails.file = asset.url;
            let url = chrome.extension.getURL(asset.url);
            //console.log('using url:', url);
            //cssDetails.file = url;
        } else if (asset.code) {
            console.log('cs code:', asset.code);
            cssDetails.code = asset.code;
        }
        chrome.tabs.insertCSS(tabId, cssDetails, callback => { console.log('CSS INJECTED!'); });
    } else if (asset.type === 'js') {
        const scriptDetails: chrome.tabs.InjectDetails = {
            runAt: 'document_start',
        };
        if (asset.url) {
            scriptDetails.file = asset.url;
        } else if (asset.code) {
            scriptDetails.code = asset.code;
        }
        chrome.tabs.executeScript(tabId, scriptDetails, callback => { console.log('JS INJECTED!'); });
    }
}