'use strict';
var should = require('should');
var common = require('../common.webdriverio');


describe('High campagnes', function () {
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
    require('../scenario/BO/category/create_category.webdriverio.js');
    require('../scenario/BO/category/update_category.webdriverio.js');
    require('../scenario/BO/category/delete_category.webdriverio.js');



    if (typeof module_tech_name !== 'undefined' && module_tech_name != "None") {
        require('./scenario/BO/uninstall_module.js');
    }

});
