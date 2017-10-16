var should = require('should');
module.exports = {
    createCategory:function () {
        global.categoryName='category' + new Date().getTime();
        it("should go to category and click on <Add new category> ", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.menu_button, 90000)
                .moveToObject(this.selector.BO.CatalogPage.menu_button)
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.submenu, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.submenu)
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.new_category_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.new_category_button)
                .call(done);
        });

        it("should add new category name", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.name_input, 90000)
                .setValue(this.selector.BO.CatalogPage.CategorySubmenu.name_input,global.categoryName)
                .call(done);
        });
        it("should add new category description", function (done) {
            global.fctname = this.test.title;
            this.client
                .execute(function () {
                    document.querySelector('textarea#description_1').style = "";
                })
                .setValue('//*[@id="fieldset_0"]/div[2]/div[4]/div/textarea', "this the description")
                .call(done);
        });
        it("should add new category image", function (done) {
            global.fctname = this.test.title;
            this.client
                .execute(function () {
                    document.getElementById("image").style = "";
                })
                .chooseFile(this.selector.BO.CatalogPage.CategorySubmenu.picture, global.categoryImage)
                .call(done);
        });
        it("should add new category thumb", function (done) {
            global.fctname = this.test.title;
            this.client
                .execute(function () {
                    document.getElementById("thumb").style = "";
                })
                .chooseFile(this.selector.BO.CatalogPage.CategorySubmenu.thumb_picture, global.categoryThumb)
                .call(done);
        });
        it("should add new category title", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.title, 90000)
                .setValue(this.selector.BO.CatalogPage.CategorySubmenu.title,'test category')
                .call(done);
        });
        it("should add new category meta description", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.meta_description, 90000)
                .setValue(this.selector.BO.CatalogPage.CategorySubmenu.meta_description,'this is the meta description')
                .call(done);
        });
        it("should add new category meta keys words", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.keyswords, 90000)
                .setValue(this.selector.BO.CatalogPage.CategorySubmenu.keyswords,'keyswords')
                .keys("\uE007")
                .call(done);
        });
        it("should add new category meta keys simplify URL", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.simplify_URL_input, 90000)
                .setValue(this.selector.BO.CatalogPage.CategorySubmenu.simplify_URL_input,global.categoryName)
                .call(done);
        });
        it("should save new category", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.save_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.save_button)
                .call(done);
        });
        it("should check sucess panel", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.success_panel)
                .getText(this.selector.BO.CatalogPage.CategorySubmenu.success_panel).then(function (text) {
                text = text.indexOf('Création réussie.');
                if (text === -1) {
                    done(new Error('the category is not created !'));
                }else
                    done();
            })

        });
    },
    checkCategoryBO: function () {
        it("should go to category menu ", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.menu_button, 90000)
                .moveToObject(this.selector.BO.CatalogPage.menu_button)
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.submenu, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.submenu)
                .call(done);
        });

        it("should check the category created in BO", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.name_search_input, 90000)
                .setValue(this.selector.BO.CatalogPage.CategorySubmenu.name_search_input,global.categoryName)
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.search_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.search_button)
                .getText(this.selector.BO.CatalogPage.CategorySubmenu.search_result).then(function (text) {
                text = text.indexOf(global.categoryName);
                if (text === -1) {
                    done(new Error('we could not find the category in the list of category'));
                }else
                    done();
            })
        });

        it("should check the category image", function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.BO.CatalogPage.CategorySubmenu.update_button, 90000)
                .click(this.selector.BO.CatalogPage.CategorySubmenu.update_button)
                .isExisting(this.selector.BO.CatalogPage.CategorySubmenu.image_link).then(function(text) {
                if (text === false) {
                    done(new Error('we could not find the image'));
                }else
                    done();
            })
        });

        it("should check the category thumb image", function (done) {
            global.fctname = this.test.title;
            this.client
                .isExisting(this.selector.BO.CatalogPage.CategorySubmenu.thumb_link).then(function(text) {
                if (text === false){
                    done(new Error('we could not find the thumb image'));
                }else
                    done();
            })
        });

        it("should check the category title", function (done) {
            global.fctname = this.test.title;
            this.client
                .getAttribute(this.selector.BO.CatalogPage.CategorySubmenu.title, "value").then(function(text) {
                should(text).be.equal("test category");
            })
                .call(done);
        });

        it("should check the category meta description", function (done) {
            global.fctname = this.test.title;
            this.client
                .getAttribute(this.selector.BO.CatalogPage.CategorySubmenu.meta_description, "value").then(function(text) {
                should(text).be.equal("this is the meta description");
            })
                .call(done);
        });

        it("should check the category keyswords text", function (done) {
            global.fctname = this.test.title;
            this.client
                .getText(this.selector.BO.CatalogPage.CategorySubmenu.keyswords_text).then(function(text) {
                var alt = text.toLowerCase();
                var isExist = alt.indexOf('keyswords');
                should(isExist).not.be.equal(-1);
            })
                .call(done);
        });

        it("should check the category simplify URL", function (done) {
            global.fctname = this.test.title;
            this.client
                .getAttribute(this.selector.BO.CatalogPage.CategorySubmenu.simplify_URL_input, "value").then(function(text) {
                should(text).be.equal(global.categoryName);
            })
                .call(done);
        });
    },
    checkCategoryFO:function () {
        function getAllModulesName(browser, done) {
            var i = 1;
            global.criteriaDisplay=0;
            global.testResulat=false;
            browser
                .elements('//*[@id="left-column"]/div[1]/ul/li[2]/ul/li').then(function (length) {
                global.criteriaDisplay=  length.value.length
            })
                .waitUntil(function() {
                    return browser.getText('//*[@id="left-column"]/div[1]/ul/li[2]/ul/li['+i+']/a').then(function (name) {
                        if (name === global.categoryName) {
                            global.testResulat=true
                        }
                        categoryNameTable[i] = name;
                        i++;
                        return i === global.criteriaDisplay + 1;
                    });
                }, 10000)
                .call(done)
        }

        it('Open the shop', function (done) {
            global.fctname = this.test.title;
            this.client
                .url('http://' + URL)
                .call(done);
        });

        it('should open product list', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.FO.AccessPage.product_list_button, 90000)
                .click(this.selector.FO.AccessPage.product_list_button)
                .call(done);
        });
        it('should go through the list of categories', function (done) {
            getAllModulesName(this.client,done)
        });
        it('should check the existence of the new category', function (done) {
            if (global.testResulat) {
                this.client.call(done)
            } else {
                this.client.call(done(new Error("the category does not exist")))
            }
        });
    }
};