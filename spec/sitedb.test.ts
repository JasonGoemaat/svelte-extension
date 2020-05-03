import { StaticAssets } from '../src/Background/db/StaticAssets'

test('should have util', () => {
    const sa = new StaticAssets();
    expect(sa.getAsset('util')).toBeDefined();
})