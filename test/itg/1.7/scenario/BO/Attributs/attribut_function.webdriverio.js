var should = require('should');
module.exports = {
    checkAttributInFO:function () {
        it('should acces to the Front Office', function (done) {
            global.fctname = this.test.title;
            this.client
                .url('http://' + URL )
                .call(done);
        });
        it('should search for the product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.FO.SearchProductPage.product_search_input, 90000)
                .setValue(this.selector.FO.SearchProductPage.product_search_input, 'test_nodejs_' + product_id)
                .click(this.selector.FO.SearchProductPage.product_search_button)
                .click(this.selector.FO.SearchProductPage.product_result_name)
                .waitForExist(this.selector.FO.SearchProductPage.attribut_name, 90000)
                .getText(this.selector.FO.SearchProductPage.attribut_name).then(function (text) {
                   var value = text.indexOf(global.attributeName)
                    if (value === -1){
                        done(new Error());
                    }else
                        done();
                })

        });

        function checkAttributValue(browser, done) {
            var i = 1,j = 1;
            global.attributeResulat=[];
            global.tab=["10","20","30","40"];
            global.name=[];
            browser
                .waitUntil(function() {
                    return browser.getText('//*[@id="add-to-cart-or-refresh"]/div[1]/div/ul/li[' + i + ']/label/span').then(function (text) {
                        global.name[i]=text;
                        i++;
                        return (i === 4)  ;
                    });
                }, 10000)
                .waitUntil(function() {
                    return browser.getText('//*[@id="add-to-cart-or-refresh"]/div[1]/div/ul/li[' + j + ']/label/span').then(function (text) {

                        if(global.tab.indexOf(global.name[j]) > -1){
                            global.attributeResulat[j]=true;
                        }else{
                            global.attributeResulat[j]=false;
                        }
                        j++;
                        return (j === 4)  ;
                    });
                }, 10000)
                .call(done)
        }

        it('should check the product attribut', function (done) {
            global.fctname = this.test.title;
            this.client
            checkAttributValue(this.client, done)
        });
        it('should check the product attribut value', function (done) {
            if (global.attributeResulat.indexOf(false) > -1) {
                this.client.call(done(new Error("attribut value does not exist")))
            } else {
                this.client.call(done)
            }
        });
    },
    checkdeletedAttributvalueInFO:function () {
        it('should acces to the Front Office', function (done) {
            global.fctname = this.test.title;
            this.client
                .url('http://' + URL )
                .call(done);
        });
        it('should search for the product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.FO.SearchProductPage.product_search_input, 90000)
                .setValue(this.selector.FO.SearchProductPage.product_search_input, 'test_nodejs_' + product_id)
                .click(this.selector.FO.SearchProductPage.product_search_button)
                .click(this.selector.FO.SearchProductPage.product_result_name)
                .waitForExist(this.selector.FO.SearchProductPage.attribut_name, 90000)
                .getText(this.selector.FO.SearchProductPage.attribut_name).then(function (text) {
                    var value = text.indexOf(global.attributeName)
                    if (value === -1){
                        done(new Error());
                    }else
                        done();
                })
        });

        function checkAttributValue(browser, done) {
            var i = 1,j = 1;
            global.attributeResulat=[];
            global.tab=["20","30"];
            global.name=[];
            browser
                .waitUntil(function() {
                    return browser.getText('//*[@id="add-to-cart-or-refresh"]/div[1]/div/ul/li[' + i + ']/label/span').then(function (text) {
                        global.name[i]=text;
                        i++;
                        return (i === 3)  ;
                    });
                }, 10000)
                .waitUntil(function() {
                    return browser.getText('//*[@id="add-to-cart-or-refresh"]/div[1]/div/ul/li[' + j + ']/label/span').then(function (text) {

                        if(global.tab.indexOf(global.name[j]) > -1){
                            global.attributeResulat[j]=true;
                        }else{
                            global.attributeResulat[j]=false;
                        }
                        j++;
                        return (j === 3)  ;
                    });
                }, 10000)
                .call(done)
        }

        it('should check the product attribut', function (done) {
            checkAttributValue(this.client, done)
        });
        it('should check the product attribut value', function (done) {
            if (global.attributeResulat.indexOf(false) > -1) {
                this.client.call(done(new Error("attribut value does not exist")))
            } else {
                this.client.call(done)
            }
        });
    },
    createProduct:function () {
        it("should click on the <add new product> button", function (done) {
            global.fctname = this.test.title;
            this.client
                .pause(5000)
                .waitForExist(this.selector.BO.AddProductPage.menu, 90000)
                .click(this.selector.BO.AddProductPage.products_subtab)
                .waitForExist(this.selector.BO.AddProductPage.new_product_button, 90000)
                .waitForExist('#notifications-total', 90000)
                .isVisible('//div[@id="debug-mode"]').then(function (isVisible) {
                devMode = isVisible;
            })
                .call(done);
        });

        it('should choose dev mode', function (done) {
            global.fctname = this.test.title;
            if (devMode) {
                this.client
                    .waitForExist('//a[@class="hide-button"]', 90000)
                    .click('//a[@class="hide-button"]');
            }
            this.client.call(done);
        });

        it('should enter the name of product', function (done) {
            global.fctname = this.test.title;
            this.client
                .click(this.selector.BO.AddProductPage.new_product_button)
                .waitForExist(this.selector.BO.AddProductPage.product_name_input, 90000)
                .setValue(this.selector.BO.AddProductPage.product_name_input, 'test_nodejs_' + product_id)
                .call(done);
        });

        it('should enter the quantity of product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.AddProductPage.quantity_shortcut_input, 90000)
                .clearElement(this.selector.BO.AddProductPage.quantity_shortcut_input)
                .addValue(this.selector.BO.AddProductPage.quantity_shortcut_input, "10")
                .call(done);
        });

        it('should enter the type of the product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.AddProductPage.variations_type_button, 90000)
                .click(this.selector.BO.AddProductPage.variations_type_button)
                .call(done);
        });

        it('should enter the price of product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.AddProductPage.price_te_shortcut_input, 90000)
                .execute(function () {
                    document.querySelector('#form_step1_price_shortcut').value = "";
                })
                .setValue(this.selector.BO.AddProductPage.price_te_shortcut_input, "5")
                .call(done);
        });

        it('should select product online', function (done) {
            global.fctname = this.test.title;
            this.client
                .pause(1000)
                .click(this.selector.BO.AddProductPage.product_online_toggle)
                .call(done);
        });

        it('should select product attributs', function (done) {
            global.fctname = this.test.title;
            this.client
                .pause(1000)
                .waitForExist(this.selector.BO.AddProductPage.variations_tab, 90000)
                .click(this.selector.BO.AddProductPage.variations_tab)
                .waitForExist(this.selector.BO.AddProductPage.variations_input, 90000)
                .setValue(this.selector.BO.AddProductPage.variations_input,global.attributeName +" : Toutes")
                .waitForExist(this.selector.BO.AddProductPage.variations_select, 90000)
                .click(this.selector.BO.AddProductPage.variations_select)
                .waitForExist(this.selector.BO.AddProductPage.variations_generate, 90000)
                .click(this.selector.BO.AddProductPage.variations_generate)
                .pause(5000)
                .waitForExist(this.selector.BO.AddProductPage.var_selected, 90000)
                .click(this.selector.BO.AddProductPage.var_selected)
                .pause(3000)
                .waitForExist(this.selector.BO.AddProductPage.var_selected_quantitie, 90000)
                .setValue(this.selector.BO.AddProductPage.var_selected_quantitie, "10")
                .moveToObject('//*[@id="combinations_thead"]/tr/th[7]', 90000)
                .click(this.selector.BO.AddProductPage.save_quantitie_button)
                .call(done);
        });
        it('should save product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.AddProductPage.save_product_button, 90000)
                .click(this.selector.BO.AddProductPage.save_product_button)
                .call(done);
        });
        it('should close green validation', function (done) {
            global.fctname = this.test.title;
            console.log('test_nodejs_' + product_id);
            this.client
                .waitForExist(this.selector.BO.AddProductPage.close_validation_button, 90000)
                .click(this.selector.BO.AddProductPage.close_validation_button)
                .call(done);
        });
    },
    checkdeletedAttributFO:function () {
        it('should acces to the Front Office', function (done) {
            global.fctname = this.test.title;
            this.client
                .url('http://' + URL )
                .call(done);
        });
        it('should search for the product', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.FO.SearchProductPage.product_search_input, 90000)
                .setValue(this.selector.FO.SearchProductPage.product_search_input, 'test_nodejs_' + product_id)
                .click(this.selector.FO.SearchProductPage.product_search_button)
                .waitForExist(this.selector.FO.SearchProductPage.product_result_name, 90000)
                .click(this.selector.FO.SearchProductPage.product_result_name)
                .isExisting(this.selector.FO.SearchProductPage.attribut_name).then(function (value) {
                    console.log(value)
                    if ( value === false ) {
                        done()
                    }else
                         done(new Error());
                })

        });
    }
}