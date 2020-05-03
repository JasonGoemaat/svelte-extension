export enum AssetTypes {
    Css = "css",
    Js = "js"
}

export interface Asset {
    name: string,
    type: AssetTypes,
    url?: string,
    code?: string
}
