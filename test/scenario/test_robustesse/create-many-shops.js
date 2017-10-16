const SHOP_COUNT = 2;

scenario(`Shops ${SHOP_COUNT}`, client => {
    for (let i = 1; i < (SHOP_COUNT + 1); i++) {
        test(`should create shop #${i}`, () => {
            let promise = Promise.resolve();
            if (i === 1) {
                promise = client.open();
            }
            return promise
            .then(() => client.fillSignUpPage1())
            .then(() => client.fillSignUpPage2())
            .then(() => client.fillSignUpPage3())
            .then(() => client.fillSignUpPage4())
            .then(() => client.waitForBackOfficeButton())
            .then(() => client.logout());
        });
    }
});
