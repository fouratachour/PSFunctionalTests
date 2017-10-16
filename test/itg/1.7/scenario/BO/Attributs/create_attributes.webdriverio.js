'use strict';
var should = require('should');
var common = require('../../../common.webdriverio.js');
var globals = require('../../../globals.webdriverio.js');
var attributFunction = require('./attribut_function.webdriverio.js');
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
        global.attributeName='attribute' + new Date().getTime();
        it("should go to attribut and click on <Add new attribute> ", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.menu_button, 90000)
                .moveToObject(this.selector.BO.CatalogPage.menu_button)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.submenu, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.submenu)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.add_new_attribute, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.add_new_attribute)
                .call(done);
        });

        it("should add new attribute", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.name_input, 90000)
                .setValue(this.selector.BO.CatalogPage.AttributeSubmenu.name_input,global.attributeName)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.public_name_input, 90000)
                .setValue(this.selector.BO.CatalogPage.AttributeSubmenu.public_name_input,global.attributeName)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.type_select, 90000)
                .selectByValue(this.selector.BO.CatalogPage.AttributeSubmenu.type_select,'radio')
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.save_button, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.save_button)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.success_panel)
                .getText(this.selector.BO.CatalogPage.AttributeSubmenu.success_panel).then(function (text) {
                    console.log('attribut name'+global.attributeName);
                    text = text.indexOf('Création réussie.');
                    if (text === -1){
                        done(new Error('the category is not created !'));
                    }else
                        done();
                })
        });
    });
    describe('add attributes value', function (done) {
        it("should go to attribute created ", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.search_input, 90000)
                .setValue(this.selector.BO.CatalogPage.AttributeSubmenu.search_input,global.attributeName)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.search_button, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.search_button)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.selected_attribute, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.selected_attribute)
                .call(done);
        });

        it("should add attribute value ", function (done) {
            this.client
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.add_value_button, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.add_value_button)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.value_input, 90000)
                .setValue(this.selector.BO.CatalogPage.AttributeSubmenu.value_input,"10")
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.save_and_add, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.save_and_add)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.value_input, 90000)
                .setValue(this.selector.BO.CatalogPage.AttributeSubmenu.value_input,"20")
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.save_and_add, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.save_and_add)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.value_input, 90000)
                .setValue(this.selector.BO.CatalogPage.AttributeSubmenu.value_input,"30")
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.save_and_add, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.save)
                .getText(this.selector.BO.CatalogPage.CategorySubmenu.success_panel).then(function (text) {
                    text = text.indexOf('Création réussie.');
                    if (text === -1){
                        done(new Error('attribut value not created !'));
                    }else
                        done();
                })
        });
    });

    describe('Create new product', function (done) {
        attributFunction.createProduct()
    });

    describe('Log out in Back Office', function (done) {
        it('should log out successfully in BO', function (done) {
            global.fctname = this.test.title;
            this.client
                .signoutBO2()
                .call(done);
        });
    });

    describe('The Check of the Product attribute in Front Office', function (done) {
        attributFunction.checkAttributInFO()
    });

});