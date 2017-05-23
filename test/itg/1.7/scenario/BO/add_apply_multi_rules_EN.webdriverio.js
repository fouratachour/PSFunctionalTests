'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio.js');

describe('The Check of multi rules', function(){
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

describe('Add rule 1 (All category + Category name ) + EN', function(done){
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

        it('Add rules Name - langue EN ', function(done){
	        global.fctname= this.test.title;
            this.client
                .waitForExist(this.selector.seo_config_panel, 90000)
                .click(this.selector.seo_config_panel)

                 .pause(2000)
                .waitForExist(this.selector.add_rules_btn, 90000)
                .click(this.selector.add_rules_btn)

                .waitForExist(this.selector.rule_name,60000)
				.setValue(this.selector.rule_name,'Rule EN all category')

                .waitForExist(this.selector.rule_lang_btn, 90000)
                .click(this.selector.rule_lang_btn)
                .click(this.selector.rule_lang_btn_EN)

                .waitForExist(this.selector.next_step_rules, 90000)
                .click(this.selector.next_step_rules)

                .call(done);
        });

        it('Add rules categorie ', function(done){
            global.fctname= this.test.title;
            this.client
                .pause(5000)
                .click(this.selector.all_catalog_btn_rules)
                .waitForExist(this.selector.next_step_rules, 90000)
                .click(this.selector.next_step_rules)
            .call(done)
        });

        it('Add rules conditions ', function(done){
            global.fctname= this.test.title;
            this.client
                .waitForExist(this.selector.rules_condition, 90000)
                .leftClick(this.selector.rules_condition)
                .pause(5000)
                .setValue(this.selector.rules_condition,'categorie: {default_cat_name}')
                .waitForExist(this.selector.save_rules, 90000)
                .click(this.selector.save_rules)
                .pause(2000)
                .call(done);
        });

        it('close rules modal ', function(done){
            global.fctname= this.test.title;
            this.client
                .pause(2000)
                .click(this.selector.modal_close_btn)
                .call(done);
        });



	});



describe('Add rule 2 (summer dress + discount ) EN', function(done){
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

        it('Add rules Name - langue EN ', function(done){
	        global.fctname= this.test.title;
            this.client
                .waitForExist(this.selector.seo_config_panel, 90000)
                .click(this.selector.seo_config_panel)

                .waitForExist(this.selector.add_rules_btn, 90000)
                .click(this.selector.add_rules_btn)

                .waitForExist(this.selector.rule_name,60000)
				.setValue(this.selector.rule_name,'Rule EN 2')

                .waitForExist(this.selector.rule_lang_btn, 90000)
                .click(this.selector.rule_lang_btn)
                .click(this.selector.rule_lang_btn_EN)

                .waitForExist(this.selector.next_step_rules, 90000)
                .click(this.selector.next_step_rules)

                .call(done);
        });

        it('Add rules categorie ', function(done){
            global.fctname= this.test.title;
            this.client
                .pause(5000)
                // select specific categorie
                .pause(5000)
                // select specific categorie
                .click(this.selector.specific_catalog_btn_rules)

                // afficher tous les categorie
                .waitForExist(this.selector.expand_all_categorie, 90000)
                .click(this.selector.expand_all_categorie)

                // choose category summer dress
                .waitForExist('//*[@id="category_11"]/a', 90000)
                .click('//*[@id="category_11"]/a')

                .waitForExist(this.selector.next_step_rules, 90000)
                .click(this.selector.next_step_rules)

            .call(done)
        });

        it('Add rules conditions ', function(done){
            global.fctname= this.test.title;
            this.client
                .waitForExist(this.selector.rules_condition, 90000)
                .leftClick(this.selector.rules_condition)
                .pause(5000)
                .setValue(this.selector.rules_condition,'discount percent: {product_reduction_percent}')
                .waitForExist(this.selector.save_rules, 90000)
                .click(this.selector.save_rules)
                .pause(2000)
                .call(done);
        });

        it('close rules modal ', function(done){
            global.fctname= this.test.title;
            this.client
                .pause(2000)
                .click(this.selector.modal_close_btn)
                .call(done);
        });


	});

    describe('apply all rules', function(done){

     it('rules apply ', function(done){
                global.fctname= this.test.title;
                this.client
                    .pause(3000)
                    //apply all rules btn
                    .waitForExist('//*[@id="table-metas-1"]/a[1]', 90000)
                    .click('//*[@id="table-metas-1"]/a[1]')
                    .pause(8000)
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