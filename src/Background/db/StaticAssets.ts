import { Asset, AssetTypes } from './Asset'

interface IMap<t> {
    [index: string]: Asset
}

const assets: IMap<Asset> = {
    util: {
        name: 'util',
        type: AssetTypes.Js,
        url: 'js/util.js'
    },
    "sample-script": {
        name: 'sample-script-inline',
        type: AssetTypes.Js,
        code: 'console.log("injected sample-script!")'
    },
    blue: {
        name: 'sample-css-inline-blue',
        type: AssetTypes.Css,
        code: '* { background-color: blue; color: white; }'
    },
    red: {
        name: 'sample-css-red',
        type: AssetTypes.Css,
        url: 'css/red.css'
    }
}

export class StaticAssets {
    getAsset(name: string): Asset {
        return assets[name];
    }
}