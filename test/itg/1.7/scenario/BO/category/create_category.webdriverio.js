'use strict';
var should = require('should');
var common = require('../../../common.webdriverio.js');
var globals = require('../../../globals.webdriverio.js');
var categoryFunction = require('./category_function.webdriverio');
var path = require('path');
var devMode = false;
var exit_welcome = false;


describe('The category Creation', function () {
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
                .signinBO()
                .waitForExist(this.selector.BO.AddProductPage.menu, 90000)
                .call(done);
        });
    });

    describe('Module "Welcome"', function (done) {
        it("should close the onboarding if displayed", function (done) {
            global.fctname = this.test.title;
            if (this.client.isVisible(this.selector.BO.Onboarding.popup)) {
                this.client
                    .click(this.selector.BO.Onboarding.popup_close_button)
                    .pause(1000)
                    .click(this.selector.BO.Onboarding.stop_button);
            };
            this.client.call(done);
        });
    });

    describe('Create new category', function (done) {
        categoryFunction.createCategory()
    });

    describe('Check created category in BO', function (done) {
        categoryFunction.checkCategoryBO()
    });


    describe('Log out in Back Office', function (done) {
        it('should log out successfully in BO', function (done) {
            global.fctname = this.test.title;
            this.client
                .signoutBO2()
                .call(done);
        });
    });

    describe('Check created category in FO', function (done) {
        categoryFunction.checkCategoryFO()
    });

});


