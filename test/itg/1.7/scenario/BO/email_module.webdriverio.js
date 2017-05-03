'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('The Check of the order in Back Office', function(){
	common.initMocha.call(this);
	
	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});
	process.on('uncaughtException', common.take_screenshot);
	process.on('ReferenceError', common.take_screenshot);
	after(common.after);
	
	describe('Log in in Back Office', function(done){
        it('should log in successfully in BO', function(done){
            global.fctname= this.test.title;
		    this.client
                .signinBO()
                .waitForExist(this.selector.menu, 90000)
                .call(done);
		});
	});
	
	describe('Send email test', function(done){

        it('should go to Advanced Parameters', function(done){
            global.fctname= this.test.title;
		    this.client
		        .moveToObject('//*[@id="subtab-AdminAdvancedParameters"]/a')
                .click('//*[@id="subtab-AdminEmails"]/a')
                .pause(2000)
                .click('//*[@id="mail_fieldset_test"]/div[4]/button')
                .waitForExist('//*[@id="mailResultCheck"]',10000);
                .call(done);
	    });

	});

    describe('verify Send email test', function(done){

        it('should go to mailDev Parameters', function(done){
            global.fctname= this.test.title;
		    this.client
                .url('http://localhost:1080')
                .click('/html/body/div/div[1]/div[2]/ul/li[1]')
                .pause(2000)
                .getText('/html/body/div/div[2]/div[2]/div/div[1]').then(function(text) {
					var my_text_check = text;
					should(my_text_check).be.equal('This is a test message. Your server is now configured to send email.');
				})

                .call(done);
	    });

	});
	
	describe('Log out in Back Office', function(done){
        it('should log out successfully in BO', function(done){
            global.fctname= this.test.title;
		    this.client
                .signoutBO()
                .call(done);
		});
	});
});