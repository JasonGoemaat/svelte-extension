import { Asset, AssetTypes } from "./Asset";

export class InjectionUtil {
    static getUrl(url: string): string {
        if (url.indexOf('http') === 0) {
            return url;
        }
        return chrome.extension.getURL(url);
    }

    static injectCss(tabId: number, details: any) {
        chrome.tabs.insertCSS(tabId, details, callback => {});
    }

    static injectCssLink(tabId: number, url: string) {
        this.injectCss(tabId, { cssOrigin: 'user', runAt: 'document_start', file: this.getUrl(url)})
    }

    static injectCssCode(tabId: number, code: string) {
        this.injectCss(tabId, { cssOrigin: 'user', runAt: 'document_start', code})
    }

    static injectJs(tabId: number, details: any) {
        chrome.tabs.executeScript(tabId, details, callback => {});
    }

    static injectJsLink(tabId: number, url: string) {
        this.injectJs(tabId, { runAt: 'document_start', file: this.getUrl(url)})
    }

    static injectJsCode(tabId: number, code: string) {
        this.injectJs(tabId, { runAt: 'document_start', code})
    }

    static injectAsset(tabId: number, asset: Asset): void {
        if (asset.type === AssetTypes.Css) {
            if (asset.url) {
                this.injectCssLink(tabId, asset.url);
            } else {
                this.injectCssCode(tabId, asset.code);
            }
        } else if (asset.type === AssetTypes.Js) {
            if (asset.url) {
                this.injectJsLink(tabId, asset.url);
            } else {
                this.injectJsCode(tabId, asset.code);
            }
        }
    }
}
