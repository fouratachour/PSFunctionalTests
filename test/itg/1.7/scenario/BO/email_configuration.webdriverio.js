'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('Email SMTP configuration in Back Office', function () {
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
                .waitForExist(this.selector.menu, 90000)
                .call(done);
        });
    });

    describe('Configuration of SMTP mail server', function (done) {

        it('should go to Advanced Parameters', function(done){
            global.fctname= this.test.title;
            this.client
                .moveToObject(this.selector.EmailConfig.advanced_parameter_button)
                .click(this.selector.EmailConfig.email_setting_button)
                .waitForExist(this.selector.EmailConfig.email_seeting_menu,10000)
                .pause(3000)
                .call(done);
        });

        it('should update the new smtp Parameters', function(done){
            global.fctname= this.test.title;
            this.client
                .waitForExist(this.selector.EmailConfig.custum_SMTP_parameter_radio,10000)
                .click(this.selector.EmailConfig.custum_SMTP_parameter_radio)
                .pause(2000)
                .waitForExist(this.selector.EmailConfig.SMTP_server_input, 90000)

                .setValue(this.selector.EmailConfig.SMTP_server_input, '10.0.2.3')
                //local config .setValue('//*[@id="conf_id_PS_MAIL_SERVER"]/div/input', 'localhost')

                .waitForExist(this.selector.EmailConfig.SMTP_user_input, 90000)
                .setValue(this.selector.EmailConfig.SMTP_user_input, 'demo@presta.com')
                .waitForExist(this.selector.EmailConfig.SMTP_password_input, 90000)
                .setValue(this.selector.EmailConfig.SMTP_password_input, '123456789')
                .waitForExist(this.selector.EmailConfig.SMTP_port_input, 90000)

                .setValue(this.selector.EmailConfig.SMTP_port_input, '25')
                //local config .setValue('//*[@id="conf_id_PS_MAIL_SMTP_PORT"]/div/input', '1025')

                .click(this.selector.EmailConfig.save_config_button)
                .call(done);
        });

        it('should send email test', function(done){
            global.fctname= this.test.title;
            this.client
                .click(this.selector.EmailConfig.send_email_button)
                .waitForExist(this.selector.EmailConfig.mail_result_block, 90000)
                .pause(2000)
                .getText(this.selector.EmailConfig.mail_result_block).then(function(text) {
                var my_text_check = text;
                should(my_text_check).be.equal("A test email has been sent to the email address you provided.");
            })
                .call(done);
        });

        it('should log out successfully in BO', function (done) {
            global.fctname = this.test.title;
            this.client
                .signoutBO()
                .call(done);
        });


    });

    describe('log into SMTP page', function (done) {
        it('should check the recived email', function(done){
            global.fctname= this.test.title;
            this.client
                .url('http://localhost:1080')
                .waitForExist(this.selector.EmailConfig.last_received_mail, 90000)
                .click(this.selector.EmailConfig.last_received_mail)
                .getText(this.selector.EmailConfig.test_received_mail).then(function(text) {
                var my_text_check = text;
                 should(my_text_check).be.equal('This is a test message. Your server is now configured to send email.');
                 })
                .call(done);
        });
    });
});
