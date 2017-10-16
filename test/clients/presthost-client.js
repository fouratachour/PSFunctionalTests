const RestClient = require('./rest-client');

class PresthostClient extends RestClient {

    constructor(apiEndPoint, apiKey) {
        super(apiEndPoint);
        this.apiKey = apiKey;
    }

    additionalOptions() {
        return {
            headers: {
                'api-key': this.apiKey
            }
        };
    }

    getShop(slug) {
        return this._get(`/shops/${slug}`);
    }

    getVersion() {
        return this._get('/status/version');
    }

    doesShopExist(slug) {
        return this._rp(`/shops/${slug}`, {
            muteError: true,
            qs: {
                checkIfExists: true
            }
        })
        .then(() => true)
        .catch(error => {
            if (error.statusCode === 404) {
                return false;
            }
            throw error;
        });
    }

    createShop(shop) {
        return this._post('/shops', { shop });
    }

    disableShop(shop) {
        return this._delete(`/shops/${shop.slug}/active`);
    }

    activateShop(shop) {
        return this._put(`/shops/${shop.slug}/active`);
    }

    createMerchant(shop, merchant) {
        return this._post(`/shops/${shop.id}/merchants`, { merchant });
    }

    addDomainName(slug, domainName) {
        return this._post(`/shops/${slug}/routes`, { route: domainName })
        .catch(response => {
            throw new BasicError(response.error.error);
        })
        .then(data => {
            // Handle specific errors returned with 202 status code
            if (data && data.error) {
                throw new Error(data.error);
            }
            return data;
        });
    }

    makeMainRoute(slug, route) {
        return this._post(`/shops/${slug}/routes/${route}/make-main`)
        .catch(response => {
            throw new Error(response.error.error);
        })
        .then(data => {
            // Handle specific errors returned with 202 status code
            if (data && data.error) {
                throw new Error(data.error);
            }
            return data;
        });
    }

    listBackups(slug) {
        return this._get(`/shops/${slug}/backups`);
    }

    restoreBackup(slug, backupId) {
        return this._post(`/shops/${slug}/backups/${backupId}`)
        .catch(response => {
            throw new Error(response.error.error);
        })
        .then(data => {
            // Handle specific errors returned with 202 status code
            if (data && data.error) {
                throw new Error(data.error);
            }
            return data;
        });
    }

    createBackup(slug) {
        return this._post(`/shops/${slug}/backups`);
    }

    upgradeShop(slug, version) {
        return this._post(`/shops/${slug}/updates`, {version});
    }
}

module.exports = PresthostClient;
