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

    describe('Update attribute', function (done) {
        global.attributeName='attribute' + new Date().getTime();
        it("should go to attribute", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.menu_button, 90000)
                .moveToObject(this.selector.BO.CatalogPage.menu_button)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.submenu, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.submenu)
                .call(done);
        });
    });
    describe('update attribute name and value', function (done) {
        it("should update attribute name ", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.search_input, 90000)
                .setValue(this.selector.BO.CatalogPage.AttributeSubmenu.search_input,global.attributeName)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.search_button, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.search_button)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.group_action_button, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.group_action_button)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.update_button, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.update_button)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.public_name_input, 90000)
                .setValue(this.selector.BO.CatalogPage.AttributeSubmenu.public_name_input,global.attributeName + 'update')
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.save_button, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.save_button)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.selected_attribute, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.selected_attribute)
               .call(done);
        });

        it("should update attribute value ", function (done) {
            this.client
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.update_value_button, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.update_value_button)
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.value_input, 90000)
                .setValue(this.selector.BO.CatalogPage.AttributeSubmenu.value_input,"40")
                .waitForExist(this.selector.BO.CatalogPage.AttributeSubmenu.save, 90000)
                .click(this.selector.BO.CatalogPage.AttributeSubmenu.save)
                .getText(this.selector.BO.CatalogPage.CategorySubmenu.success_panel).then(function (text) {
                    text = text.indexOf('Mise à jour réussie.');
                    if (text === -1){
                        done(new Error('attribut value not created !'));
                    }else
                        done();
                })
        });
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