'use strict';
var should = require('should');
var common = require('../../../common.webdriverio.js');
var globals = require('../../../globals.webdriverio.js');
var categoryFunction = require('./category_function.webdriverio');
var path = require('path');
var devMode = false;
var exit_welcome = false;


describe('The category Delete', function () {
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

    describe('Delete category with delete button', function (done) {
        it("should go to category list ", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.menu_button, 90000)
                .moveToObject(this.selector.BO.CatalogPage.menu_button)
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.submenu, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.submenu)
                .call(done);
        });

        //delete category with delete button
        it("should search for the created category and delete it ", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.name_search_input, 90000)
                .setValue(this.selector.BO.CatalogPage.CategorySubmenu.name_search_input,global.categoryName)
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.search_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.search_button)

                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.search_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.search_button)

                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.action_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.action_button)

                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.delete_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.delete_button)

                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.second_delete_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.second_delete_button)


                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.success_panel)
                .getText(this.selector.BO.CatalogPage.CategorySubmenu.success_panel).then(function (text) {
                    text = text.indexOf('Suppression réussie.');
                    if (text === -1){
                        done(new Error('the category is not deleted !'));
                    }else
                        done();
                })
        });

    });
    // add new category to delete
    describe('create new category', function (done) {
        categoryFunction.createCategory()
    });

    //delete with action group
    describe('delete category with action group', function (done) {
        it('should search for the new category and deleted ', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.name_search_input, 90000)
                .setValue(this.selector.BO.CatalogPage.CategorySubmenu.name_search_input,global.categoryName)
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.search_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.search_button)

                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.select_category, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.select_category)

                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.action_group_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.action_group_button)

                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.delete_action_group_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.delete_action_group_button)

                .alertAccept()

                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.second_delete_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.second_delete_button)

                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.success_panel)
                .getText(this.selector.BO.CatalogPage.CategorySubmenu.success_panel).then(function (text) {
                text = text.indexOf('Sélection supprimée avec succès');
                if (text === -1){
                    done(new Error('the category is not deleted !'));
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
});
