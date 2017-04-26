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

	describe('Add product to cart', function(done){
       it('should search nbproduct variable', function(done){
		    global.fctname= this.test.title;
		    global.my_src_image1="";
			this.client
			.pause(3000)
            .getAttribute('/html/head/link[2]', "href").then(function(text) {
					global.my_src_image1 = text;
            })
            .pause(3000)
            .call(done);
		});

			it('should go to the product details', function(done){
		    global.fctname= this.test.title;
			this.client
			    .waitForExist(this.selector.logo_home_pageFO, 90000)
				.click(this.selector.logo_home_pageFO)
				.waitForExist(this.selector.first_product_home_page, 90000)
				.getText(this.selector.first_product_home_page_name).then(function(text) {
					global.my_name = text[1].split('...')[0];
				})
				.click(this.selector.first_product_home_page)
				.waitForExist(this.selector.product_image, 90000)
				.pause(2000)
				.getText(this.selector.product_name_details).then(function(text) {
					var my_name_check = text;
					my_name_check.toLowerCase().should.containEql(my_name.toLowerCase());
				})
				.getText(this.selector.product_price_details).then(function(text) {
					global.my_price = text;
				})
				.getValue(this.selector.product_quantity_details).then(function(text) {
					global.my_quantity = text;
				})
				.click(this.selector.add_to_cart)
				.waitForExist(this.selector.layer_cart, 90000)
				.getText(this.selector.layer_cart_name_details).then(function(text) {
					var my_cart_name_check = text;
					my_cart_name_check.toLowerCase().should.containEql(my_name.toLowerCase())
				})
				.getText(this.selector.layer_cart_price_details).then(function(text) {
					var my_cart_price_check = text;
					should(my_cart_price_check).be.equal(my_price);
				})
				.getText(this.selector.layer_cart_quantity_details).then(function(text) {
					var my_cart_quantity_check = text.split(': ');
					should(my_cart_quantity_check[1]).be.equal(my_quantity);
				})
			    .call(done);
		});

	    it('should click add to cart button ', function(done){
		    global.fctname= this.test.title;
			this.client
				.click(this.selector.layer_cart_command_button)
				.call(done);
		});

       it('should search nbproduct variable', function(done){
		    global.fctname= this.test.title;
		    global.my_src_image2="";
			this.client
			.pause(3000)
             .getAttribute('/html/head/link[1]', "href").then(function(text) {
					global.my_src_image2 = text;
                    should(global.my_src_image2).not.be.equal(global.my_src_image1);
            })
            .pause(3000)
           .call(done);
		});
	});



});