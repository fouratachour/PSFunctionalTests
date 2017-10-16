const waitUntil = require('wait-until');

class WaitBuilder {

    static waitFor(execute = () => Promise.resolve({})) {
        return new WaitBuilder(execute);
    }

    constructor(execute) {
        this.execute = execute;
        this.intervalValue = 1000;
        this.timesValue = 90;
    }

    until(until) {
        this.until = until;
        return this;
    }

    interval(intervalValue) {
        this.intervalValue = intervalValue;
        return this;
    }

    times(timesValue) {
        this.timesValue = timesValue;
        return this;
    }

    assert(assertions) {
        return new Promise((resolve, reject) => {
            let executionError = null;
            waitUntil()
            .interval(this.intervalValue)
            .times(this.timesValue)
            .condition(callback => {
                return this.execute()
                .then(result => {
                    try {
                        this.result = result;
                        const isOK = this.until(result);
                        callback(isOK);
                    } catch (err) {
                        reject(err);
                    }
                })
                .catch(e => {
                    executionError = e;
                    callback(false);
                });
            })
            .done(isDone => {
                if (isDone) {
                    if (!assertions) {
                        return resolve();
                    }
                    try {
                        const asserted = assertions(this.result);
                        if (asserted && asserted.then) {
                            asserted.then(() => resolve()).catch(assertionError => reject({
                                assertionError,
                                executionError
                            }));
                        } else {
                            resolve();
                        }

                    } catch (err) {
                        reject(err);
                    }
                } else {
                    reject({
                        assertionError: 'timeout',
                        executionError
                    });
                }
            });
        });
    }
}

module.exports = WaitBuilder;
