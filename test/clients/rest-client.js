const rp = require('request-promise');

class RestClient {

    constructor(apiEndPoint = '') {
        this.apiEndPoint = apiEndPoint;
    }

    // to override, to add headers for example
    additionalOptions() {
    }

    _rp(route, options) {
        const fullOptions = Object.assign({
            uri: `${this.apiEndPoint + route}`,
            resolveWithFullResponse: true,
            json: true,
            timeout: 5000
        }, this.additionalOptions(), options);

        const req = rp(fullOptions);
        return req
        .then(res => {
            return res.body;
        });
    }

    _get(route, queryParams) {
        return this._rp(route, {
            qs: queryParams
        });
    }

    _post(route, body, queryParams) {
        return this._rp(route, {
            method: 'POST',
            qs: queryParams,
            body
        });
    }

    _put(route, body, queryParams) {
        return this._rp(route, {
            method: 'PUT',
            qs: queryParams,
            body
        });
    }

    _delete(route, queryParams) {
        return this._rp(route, {
            method: 'DELETE',
            qs: queryParams
        });
    }

}

module.exports = RestClient;
