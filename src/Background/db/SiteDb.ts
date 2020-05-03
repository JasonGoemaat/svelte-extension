import { DynamicAssets } from "./DynamicAssets";
import { StaticAssets } from "./StaticAssets";
import { Asset, AssetTypes } from "./Asset";
import { InjectionUtil } from "./InjectionUtil";
import { Injection } from "./Injection";
import { Injections } from "./Injections";

export class SiteDb {
    dynamic = new DynamicAssets();
    static = new StaticAssets();
    injections = new Injections();

    injectionUtil = InjectionUtil;

    constructor() {
    }

    getAsset(name: string): Asset {
        return this.static.getAsset(name) || this.dynamic.getAsset(name);
    }

    getInjectionsForUrl(url: string): Injection[] {
        return this.injections.listInjections().filter(x => (new RegExp(x.rx)).test(url));
    }
}
