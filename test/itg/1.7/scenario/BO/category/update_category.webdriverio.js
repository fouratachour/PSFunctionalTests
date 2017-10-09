'use strict';
var should = require('should');
var common = require('../../../common.webdriverio.js');
var globals = require('../../../globals.webdriverio.js');
var categoryFunction = require('./category_function.webdriverio');
var path = require('path');
var toUpload = path.join(__dirname, '../..', 'datas', 'image_test.jpg');
var devMode = false;
var exit_welcome = false;

describe('The category update', function () {
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

    describe('Update category', function (done) {
        it("should go to category list ", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.menu_button, 90000)
                .moveToObject(this.selector.BO.CatalogPage.menu_button)
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.submenu, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.submenu)
                .call(done);
        });


        it("should search for the category ", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.name_search_input, 90000)
                .setValue(this.selector.BO.CatalogPage.CategorySubmenu.name_search_input,global.categoryName)
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.search_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.search_button)
                .call(done)
        });

        it("should update the category ", function (done) {
            global.fctname = this.test.title;
            this.client
                .moveToObject(this.selector.BO.CatalogPage.CategorySubmenu.update_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.update_button)
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.name_input, 90000)
                .setValue(this.selector.BO.CatalogPage.CategorySubmenu.name_input,global.categoryName + 'update')
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.simplify_URL_input, 90000)
                .setValue(this.selector.BO.CatalogPage.CategorySubmenu.simplify_URL_input,global.categoryName + 'update')
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.save_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.save_button)
                .call(done)
        });

        it("should check sucess panel", function (done) {
            global.fctname = this.test.title;
            global.categoryName=global.categoryName + 'update';
            this.client
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.success_panel)
                .getText(this.selector.BO.CatalogPage.CategorySubmenu.success_panel).then(function (text) {
                text = text.indexOf('Mise à jour réussie.');
                if (text === -1) {
                    done(new Error('the category is not updated!')) ;
                }else
                    done();
            })

        });

    });

    describe('Check updated category in BO', function (done) {
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

    describe('Check updated category in FO', function (done) {
        categoryFunction.checkCategoryFO()
    });

});
