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

	describe('Add rule FR', function(done){
        it('should go to the modules page', function(done){
            global.fctname= this.test.title;
            this.client
                .pause(5000)
                .click(this.selector.modules_menu)
                .waitForExist(this.selector.modules_page_loaded, 90000)
                .call(done);
	    });

	    it('should go to the installed modules', function(done){
	        global.fctname= this.test.title;
            this.client
                .waitForExist(this.selector.modules_installed, 90000)
                .click(this.selector.modules_installed)
                .pause(5000)
                .call(done);
        });

        it('should go to the module SEO images configuration ', function(done){
	        global.fctname= this.test.title;
            this.client
                .waitForExist(this.selector.module_seo_configuration, 90000)
                .click(this.selector.module_seo_configuration)
                .pause(5000)
                .call(done);
        });

        it('should go to rule edit panel - langue FR ', function(done){
	        global.fctname= this.test.title;
            this.client
                .waitForExist(this.selector.seo_config_panel, 90000)
                .click(this.selector.seo_config_panel)

                .waitForExist(this.selector.edit_btn_rules_step1, 90000)
                .click(this.selector.edit_btn_rules_step1)

                .waitForExist(this.selector.edit_btn_rules_step2, 90000)
                .click(this.selector.edit_btn_rules_step2)

                .pause(15000)
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