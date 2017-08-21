'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');


describe('The Purchase of a product', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.selector = globals.selector;
        this.client.call(done);
    });
    process.on('uncaughtException', common.take_screenshot);
    process.on('ReferenceError', common.take_screenshot);
    after(common.after);

    /*it('loggin_FO', function(done){
     this.client
     .signinFO()
     .call(done);
     });*/

    describe('Add product to cart', function (done) {
        it('should access to the Front Office', function (done) {
            global.fctname = this.test.title;
            this.client
                .url('http://' + URL)
                .waitForExist(this.selector.FO.Access.logo_home_page, 60000)
                .call(done);
        });

        it('should go to the product details page', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.FO.Access.logo_home_page)
                .waitForExist(this.selector.FO.Product.first_product_home_page, 60000)
                .getText(this.selector.FO.Product.first_product_home_page_name).then(function (text) {
                global.my_name = text[1];
            })
                .moveToObject(this.selector.FO.Product.first_product_home_page)
                .waitForExist(this.selector.FO.Product.details_first_product_home_page, 60000)
                .click(this.selector.FO.Product.details_first_product_home_page)
                .waitForExist(this.selector.FO.Product.first_product_home_page_name, 60000)
                .call(done);
        });

        it('should add the product to the cart', function (done) {
            global.fctname = this.test.title;
            this.client
                .getText(this.selector.FO.Product.name_details).then(function (text) {
                var my_name_check = text;
                should(my_name_check).be.equal(my_name);
            })
                .getText(this.selector.FO.Product.price_details).then(function (text) {
                global.my_price = text;
            })
                .getValue(this.selector.FO.Product.quantity_details).then(function (text) {
                global.my_quantity = text;
            })
                .click(this.selector.FO.LayerCart.add_to_cart_button)
                .waitForExist(this.selector.FO.LayerCart.layer_cart, 60000)
                .getText(this.selector.FO.LayerCart.name_details).then(function (text) {
                var my_cart_name_check = text;
                should(my_cart_name_check).be.equal(my_name);
            })
                .getText(this.selector.FO.LayerCart.price_details).then(function (text) {
                var my_cart_price_check = text;
                should(my_cart_price_check).be.equal(my_price);
            })
                .getText(this.selector.FO.LayerCart.quantity_details).then(function (text) {
                var my_cart_quantity_check = text;
                should(my_cart_quantity_check).be.equal(my_quantity);
            })
                .call(done);
        });

        it('should checkout', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.FO.LayerCart.command_button)
                .waitForExist(this.selector.FO.LayerCart.cart_label, 60000)
                .call(done);
        });
    });

    describe('Validate the cart', function () {
        it('should validate the summary step (step 1)', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.FO.Order.button_checkout, 60000)
                .click(this.selector.FO.Order.button_checkout)
                .pause(3000)
                .waitForExist(this.selector.FO.Access.email_input, 90000)
                .call(done);
        });

        it('should validate the log in step (step 2)', function (done) {
            this.client
                .setValue(this.selector.FO.Access.email_input, 'pub@prestashop.com')
                .setValue(this.selector.FO.Access.password_input, '123456789')
                .click(this.selector.FO.Access.login_button)
                /*.waitForExist(this.selector.FO.validate_address, 60000)
                 .click(this.selector.FO.validate_address)*/
                .waitForExist(this.selector.FO.Order.button_checkout_step3, 60000)
                .call(done);
        });

        it('should validate the adresses step (step 3)', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.FO.Order.button_checkout_step3)
                .waitForExist(this.selector.FO.Order.cgv_button, 60000)
                .call(done);
        });

        it('should validate the shipping step (step 4)', function (done) {
            this.client
                .click(this.selector.FO.Order.cgv_button)
                .click(this.selector.FO.Order.button_checkout)
                .waitForExist(this.selector.FO.Order.product_name_step5, 60000)
                .call(done);
        });

        it('should validate the payment step (step 5)', function (done) {
            global.fctname = this.test.title;
            this.client
                .getText(this.selector.FO.Order.product_name_step5).then(function (text) {
                var my_name_check2 = text;
                should(my_name_check2).be.equal(my_name);
            })
                .getText(this.selector.FO.Order.total_price).then(function (text) {
                var my_price_check = text;
                should(my_price_check).be.equal(my_price);
            })
                .click(this.selector.FO.Order.pay_bankwire)
                .waitForExist(this.selector.FO.Order.price_step5_amout, 60000)
                .getText(this.selector.FO.Order.price_step5_amout).then(function (text) {
                var my_price_check2 = text;
                should(my_price_check2).be.equal(my_price);
            })
                .click(this.selector.FO.Order.confirm_button)
                .waitForExist(this.selector.FO.Order.success_alert, 60000)
                .getText(this.selector.FO.Order.success_price).then(function (text) {
                var my_price_check3 = text;
                should(my_price_check3).be.equal(my_price);
            })
                .call(done);
        });

        it('should get the order id', function (done) {
            global.fctname = this.test.title;
            this.client
                .url().then(function (res) {
                var current_url = res.value;
                var temp1 = current_url.split("id_order=");
                var temp2 = temp1[1].split("&");
                global.order_id = temp2[0];
            })
                .call(done);
        });
    });

    describe('Log out in Front Office', function (done) {
        it('should logout successfully in FO', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.FO.Access.sign_out_button, 60000)
                .click(this.selector.FO.Access.sign_out_button)
                .waitForExist(this.selector.FO.Access.sign_in_button, 60000)
                .call(done);
        });
    });

});