'use strict';
var should = require('should');
var common = require('./common.webdriverio');


describe('Allscenario', function () {
    common.initMocha.call(this);

    before(function (done) {
        this.client = common.getClient();
        this.client.call(done);
    });

    after(function (done) {
        this.client
            .end()
            .call(done);
    });

    //install prestashop
    //require('./install_prestashop.js');

    //install and uninstall module
    if (typeof module_tech_name !== 'undefined' && module_tech_name != "None") {
        require('./scenario/BO/install_and_uninstall_module.js');
        require('./scenario/BO/install_module.js');
    }

    // CRUD category
    require('./scenario/BO/category/create_category.webdriverio.js');
    require('./scenario/BO/category/update_category.webdriverio.js');
    require('./scenario/BO/category/delete_category.webdriverio.js');


    // CRUD Attributs
    //require('./scenario/BO/create_attributes.webdriverio');





    //create a product in BO and check it in FO
    //require('./scenario/BO/create_product.webdriverio');
    //require('./scenario/FO/check_product.webdriverio');

    //create an order in FO and check it in BO
    //require('./scenario/FO/buy_product.webdriverio');
    //require('./scenario/BO/check_order.webdriverio');

    //create an account in FO
    //require('./scenario/FO/create_account.webdriverio');

    if (typeof module_tech_name !== 'undefined' && module_tech_name != "None") {
        require('./scenario/BO/uninstall_module.js');
    }

});
