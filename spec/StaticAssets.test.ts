import { StaticAssets } from '../src/Background/db/StaticAssets'
import { AssetTypes } from '../src/Background/db/Asset';

test('should have util', () => {
    const sa = new StaticAssets();
    const util = sa.getAsset('util');
    const expectedObject = {
        name: 'util',
        type: AssetTypes.Js,
        url: 'js/util.js'
    };
    expect(util).toMatchObject(expectedObject);
});

test('should have sample-script', () => {
    const sa = new StaticAssets();
    const sampleScript = sa.getAsset('sample-script');
    const expectedObject = {
        name: 'sample-script-inline',
        type: AssetTypes.Js,
        code: 'console.log("injected sample-script!")'
    };
    expect(sampleScript).toMatchObject(expectedObject);
});
