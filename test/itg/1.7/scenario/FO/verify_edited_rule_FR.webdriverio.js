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

		it('Open the shop and loggin FO', function(done){
		    global.fctname= this.test.title;
			this.client
                .url('http://' + URL)
                .waitForExist(this.selector.access_loginFO, 90000)
                .click(this.selector.access_loginFO)
                .waitForExist(this.selector.loginFO, 90000)
                .setValue(this.selector.loginFO, 'pub@prestashop.com')
                .setValue(this.selector.passwordFO, '123456789')
                .click(this.selector.login_btnFO)
                .pause(3000)
                .call(done);

		});

	describe('verify the rule', function(done){
		it('should go to the product details and check product reference', function(done){
		    global.fctname= this.test.title;
			this.client
			    .waitForExist(this.selector.logo_home_pageFO, 90000)
				.click(this.selector.logo_home_pageFO)

				.waitForExist(this.selector.first_product_home_page, 90000)
                .click(this.selector.first_product_home_page)

                .waitForExist(this.selector.detail_product, 90000)
                .click(this.selector.detail_product)

                .pause(2000)

				.getText(this.selector.reference_product).then(function(text) {
					global.reference_product = text;
				})

				.waitForExist(this.selector.product_image, 90000)
				.pause(2000)

                .getAttribute(this.selector.thumbnail_image, "alt").then(function(text) {
					 var alt = text ;
					 should(alt).be.equal('Référence : '+global.reference_product);
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