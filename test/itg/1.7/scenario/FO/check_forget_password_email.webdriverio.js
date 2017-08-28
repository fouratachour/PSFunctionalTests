'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('Verify sending an email to reset the password', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.selector = globals.selector;
        this.client.call(done);
    });
    process.on('uncaughtException', common.take_screenshot);
    process.on('ReferenceError', common.take_screenshot);
    after(common.after);

    it('Open the shop FO', function (done) {
        global.fctname = this.test.title;
        this.client
            .url('http://' + URL)
            .waitForExist(this.selector.access_loginFO, 90000)
            .click(this.selector.access_loginFO)
            .call(done);
    });

    describe('check sending an email of rest the password', function (done) {
        it('should check the received email ', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.EmailConfigPage.EmailPasswordForgot.forget_password_button, 90000)
                .click(this.selector.EmailConfigPage.EmailPasswordForgot.forget_password_button)
                .waitForExist(this.selector.EmailConfigPage.forget_password_input, 90000)
                .setValue(this.selector.EmailConfigPage.forget_password_input, 'pub@prestashop.com')
                .click(this.selector.EmailConfigPage.forget_password_email_button)
                .call(done);
        });
    });

    describe('Validation Email', function (done) {
        it('should check the received email ', function (done) {
            global.fctname = this.test.title;
            this.client
                .url('http://localhost:1080')
                .waitForExist(this.selector.EmailConfigPage.title_received_mail, 90000)
                .getText(this.selector.EmailConfigPage.title_received_mail).then(function(text) {
                    global.mailTitle = text.indexOf('Password query confirmation');
                    if(global.mailTitle == -1){
                        done(new Error("Failed to receive email"));
                    }else{
                        done();
                    }
                });
        });

    });

});