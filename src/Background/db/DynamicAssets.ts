import { Asset } from "./Asset";

export class DynamicAssets {
    listAssets(): Asset[] {
        return <Asset[]>(JSON.parse(localStorage.getItem('DynamicAssets:list')) ?? []);
    }

    setAssets(assets: Asset[]) {
        localStorage.setItem('DynamicAssets:list', JSON.stringify(assets));
    }

    getAsset(name: string) {
        return this.listAssets().find(x => x.name === name);
    }

    addAsset(asset: Asset) {
        let assets = this.listAssets();
        if (assets.find(x => x.name === asset.name)) {
            throw new Error(`DynamicAssets: Asset exists! ('${asset.name}')`);
        }
        assets = [...assets, asset].sort((a, b) => (a.name === b.name ? 0 : (a < b ? -1 : 1)));
        this.setAssets(assets);
    }

    getAssetString(name: string) {
        return localStorage.getItem(`DynamicAssets:asset:${name}`);
    }

    setAssetString(name: string, text: string) {
        localStorage.setItem(`DynamicAssets:asset:${name}`, text);
    }

    clearAssetString(name: string) {
        localStorage.removeItem(`DynamicAssets:asset:${name}`);
    }
}