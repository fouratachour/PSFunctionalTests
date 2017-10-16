const waitFor = require('./wait-builder').waitFor;
const config = require('config');

const shopIsReady = res => {
    const data = res.data;
    console.log(`Shop ${res.id} is creating ... db:${data.db.status}, gke:${data.gke.status}, nfs:${data.nfs.status}, version:${res.prestashop_version}`);
    return data.db.status === 0 && data.gke.status === 0 && data.nfs.status === 0;
};

const shopIsUpdated = res => {
    console.log(`Shop ${res.id} is updating ... version:${res.prestashop_version}`);
    return res.data.upgrade_status === 1;
};

const fromRelease = config.get('upgrade_shop.initial_version');
const toRelease = config.get('upgrade_shop.target_version');

const waitShopIsReady = id =>
    waitFor(() => presthostClient.getShop(id))
    .times(10 * 60)
    .until(shopIsReady)
    .assert();

const waitShopIsUpgraded = id => waitFor(() => presthostClient.getShop(id))
.times(10 * 60)
.until(shopIsUpdated)
.assert(() => console.log('Shop is updated!'));

describe('Shop-Upgrade', () => {
    it('should upgrade shop to the latest version', () => {
        const id = `shopupgrade${new Date().getTime()}`;
        return presthostClient
        .createShop({ id, preset: 'normal', release: fromRelease })
        .then(() => waitShopIsReady(id))
        .then(() => console.log('Shop is ready!'))
        .then(() => presthostClient.upgradeShop(id, toRelease))
        .then(() => waitShopIsUpgraded(id));
    });
});
