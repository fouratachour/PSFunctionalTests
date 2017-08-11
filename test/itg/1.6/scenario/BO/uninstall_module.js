'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');
var uninstall_red_validation_is_visible = false;
var green_validation_is_visible = false;

describe('The Uninstall of a Module', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.selector = globals.selector;
        this.client.call(done);
    });
    process.on('uncaughtException', common.take_screenshot);
    process.on('ReferenceError', common.take_screenshot);
    after(common.after);

    describe('Log in in Back Office', function (done) {
        it('should log in successfully in BO', function (done) {
            global.fctname = this.test.title;
            this.client
            //.signinBO()
                .url('http://' + URL + '/admin-dev')
                .waitForExist(this.selector.BO.Access.login, 120000)
                .setValue(this.selector.BO.Access.login, 'demo@prestashop.com')
                .waitForExist(this.selector.BO.Access.password, 120000)
                .setValue(this.selector.BO.Access.password, 'prestashop_demo')
                .waitForExist(this.selector.BO.Access.login_btn, 90000)
                .click(this.selector.BO.Access.login_btn)
                .waitForExist(this.selector.BO.Product.menu, 60000)
                .call(done);
        });
    });

    describe('Uninstall module', function (done) {
        it('should go to modules page', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.Product.menu, 60000)
                .click(this.selector.BO.Module.menu)
                .waitForExist(this.selector.BO.Module.search, 60000)
                .call(done);
        });

        it('should uninstall the module', function (done) {
            global.fctname = this.test.title;
            if (red_validation_is_visible) {
                done(new Error("Unavailable module"));
            } else {
                this.client
                /*.isExisting("//*[@class=\"alert alert-danger\"]").then(function(present) {
                 should(present).be.equal(false);
                 })*/
                    .setValue(this.selector.BO.Module.search, module_tech_name)
                    .waitForExist('//table[@id="module-list"]/tbody/tr[not(@style)]//span[text()="' + module_tech_name + '"]', 60000)
                    .click('//button[@class="btn btn-default dropdown-toggle" and ancestor::tr[not(@style)]//span[text()="' + module_tech_name + '"]]')
                    .waitForExist('//ul[@class="dropdown-menu" and ancestor::tr[not(@style)]//span[text()="' + module_tech_name + '"]]/li/a[@title="Uninstall"]', 60000)
                    .click('//ul[@class="dropdown-menu" and ancestor::tr[not(@style)]//span[text()="' + module_tech_name + '"]]/li/a[@title="Uninstall"]')
                    .alertAccept()
                    .isVisible(this.selector.BO.Product.red_validation).then(function (isVisible) {
                    uninstall_red_validation_is_visible = isVisible;
                })
                    .isVisible(this.selector.BO.Product.green_validation).then(function (isVisible) {
                    green_validation_is_visible = isVisible;
                })
                    .call(done);
                //.waitForExist(this.selector.green_validation, 60000)
                //.call(done);
            }
        });

        it('should check the uninstall', function (done) {
            global.fctname = this.test.title;
            if (red_validation_is_visible) {
                done(new Error("Unavailable module"));
            } else {
                if (uninstall_red_validation_is_visible) {
                    this.client
                        .getText(this.selector.BO.Product.red_validation).then(function (text) {
                        done(new Error(text));
                    })
                } else if (green_validation_is_visible) {
                    this.client.call(done);
                }
            }
        });
    });

    describe('Log out in Back Office', function (done) {
        it('should log out successfully in BO', function (done) {
            global.fctname = this.test.title;
            this.client
            //.signoutBO()
                .deleteCookie()
                .call(done);
        });
    });

});	