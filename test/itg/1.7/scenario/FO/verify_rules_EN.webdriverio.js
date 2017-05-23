'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('The Purchase of a product', function(){
	common.initMocha.call(this);

	before(function(done){
		this.selector = globals.selector;
		this.client.call(done);
	});
    process.on('uncaughtException', common.take_screenshot);
    process.on('ReferenceError', common.take_screenshot);
	after(common.after);

		it('Open the shop and loggin FO - EN', function(done){
		    global.fctname= this.test.title;
			this.client
                .url('http://' + URL)
                .click(this.selector.access_loginFO)
                .waitForExist(this.selector.loginFO, 90000)
                .setValue(this.selector.loginFO, 'pub@prestashop.com')
                .setValue(this.selector.passwordFO, '123456789')
                .click(this.selector.login_btnFO)

                // change the language
                .waitForExist(this.selector.language_btn, 90000)
                .click(this.selector.language_btn)
                .pause(3000)
                .click(this.selector.english_language)
                .call(done);
		});

	describe('verify the rule', function(done){
		it('should go to the product details', function(done){
		    global.fctname= this.test.title;
			this.client
			    .waitForExist(this.selector.logo_home_pageFO, 90000)
				.click(this.selector.logo_home_pageFO)

                .waitForExist(this.selector.all_product, 90000)
                .click(this.selector.all_product)
                .pause(2000)

                .waitForExist(this.selector.first_category_level, 90000)
                .click(this.selector.first_category_level)
                .pause(2000)

                .waitForExist(this.selector.secand_category_level, 90000)
                .click(this.selector.secand_category_level)
                .pause(2000)

                .waitForExist(this.selector.third_category_level, 90000)
                .click(this.selector.third_category_level)
                .pause(2000)

                .waitForExist(this.selector.choose_category_product, 90000)
                .click(this.selector.choose_category_product)


				.getText(this.selector.product_name_details).then(function(text) {
					global.my_name = text;
				})

				.waitForExist(this.selector.product_image, 90000)
				.pause(2000)

				.getText(this.selector.product_name_details).then(function(text) {
					var my_name_check = text;
					my_name_check.should.containEql(my_name);
				})

                .getAttribute(this.selector.thumbnail_image, "alt").then(function(text) {
					 var alt = text.toLowerCase();
					 var texttoverify = global.my_name.toLowerCase();
					 should(alt).be.equal('product name : ' + texttoverify.toLowerCase());
                })
			    .call(done);

		});

	});


	describe('Log out in Front Office', function(done){
		it('should logout successfully in FO', function(done){
		    global.fctname= this.test.title;
			this.client
                .waitForExist(this.selector.logoutFO, 90000)
                .click(this.selector.logoutFO)
                .waitForExist(this.selector.access_loginFO, 90000)
                .call(done);
		});
	});

});