'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');
var path = require('path');
var toUpload = path.join(__dirname, '../..', 'datas', 'image_test.jpg');
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

    describe('Create new attributes', function (done) {
        it("should go to category nad click on <Add new attribute> ", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.menu_button, 90000)
                .moveToObject(this.selector.BO.CatalogPage.menu_button)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.submenu, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.submenu)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.add_new_attrribut, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.add_new_attrribut)
                .call(done);
        });

        it("should add new category", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.name_input, 90000)
                .setValue(this.selector.BO.CatalogPage.name_input,global.categoryName)
                .waitForExist(this.selector.BO.CatalogPage.simplify_URL_input, 90000)
                .setValue(this.selector.BO.CatalogPage.simplify_URL_input,'category' + global.category_id)
                .waitForExist(this.selector.BO.CatalogPage.save_button, 90000)
                .click(this.selector.BO.CatalogPage.save_button)
                .waitForExist(this.selector.BO.CatalogPage.success_panel)
                .getText(this.selector.BO.CatalogPage.success_panel).then(function (text) {
                    text = text.indexOf('Création réussie.');
                    if (text === -1){
                        done(new Error('the category is not created !'));
                    }else
                        done();
                })

        });

/*        it("should check the category created", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.name_search_input, 90000)
                .setValue(this.selector.BO.CatalogPage.name_search_input,'category'+ global.category_id)
                .waitForExist(this.selector.BO.CatalogPage.search_button, 90000)
                .click(this.selector.BO.CatalogPage.search_button)
                .waitForExist(this.selector.BO.CatalogPage.search_result, 90000)
                .getText(this.selector.BO.CatalogPage.search_result).then(function (text) {
                    text = text.indexOf('category' + global.category_id);
                    if (text === -1){
                        done(new Error('we could not find the category in the list of category'));
                    }else
                        done();
                })
        });*/
    });



    describe('Log out in Back Office', function (done) {
        it('should log out successfully in BO', function (done) {
            global.fctname = this.test.title;
            this.client
                .signoutBO2()
                .call(done);
        });
    });
});
