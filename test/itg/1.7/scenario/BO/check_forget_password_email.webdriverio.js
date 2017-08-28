'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('The Check of the order in Back Office', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.selector = globals.selector;
        this.client.call(done);
    });
    process.on('uncaughtException', common.take_screenshot);
    process.on('ReferenceError', common.take_screenshot);
    after(common.after);

    describe('Log in in Back Office', function (done) {
        it('should log in BO', function (done) {
            global.fctname = this.test.title;
            this.client
                .url('http://' + URL + '/admin-dev')
                .waitForExist(this.selector.forget_password_button, 90000)
                .call(done);
        });
    });

    describe('Check the order', function (done) {

        it('Should go to forgotten password page', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.forget_password_button, 90000)
                .click(this.selector.forget_password_button)
                .pause(3000)
                .waitForExist(this.selector.email_forgot_input, 90000)
                .call(done);
        });

        it('should enter the forgotten email password and click the submit button', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.email_forgot_input, 90000)
                .setValue(this.selector.email_forgot_input, 'demo@prestashop.com')
                .waitForExist(this.selector.email_forgot_button, 90000)
                .click(this.selector.email_forgot_button)
                .pause(3000)
                .call(done);
        });

        it('Should check the sending message', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.Email_confirmation_message, 90000)
                .getText(this.selector.Email_confirmation_message).then(function(text) {
                    console.log(text);
                    global.mailTitle = text.indexOf('Un lien pour réinitialiser votre mot de passe vous a été envoyé.');
                    if(global.mailTitle == -1){
                        done(new Error("Send Mail Failed"));
                    }else{
                        done();
                    }
                });
        });

        it('should check the received email ', function (done) {
            global.fctname = this.test.title;
            this.client
                .url('http://localhost:1080')
                .waitForExist(this.selector.EmailConfigPage.title_received_mail, 90000)
                .getText(this.selector.EmailConfigPage.title_received_mail).then(function(text) {
                    console.log(text)
                    global.mailTitle = text.indexOf('Votre nouveau mot de passe');
                    if(global.mailTitle == -1){
                        done(new Error("Failed to receive email"));
                    }else{
                        done();
                    }
                });
        });

    });
});