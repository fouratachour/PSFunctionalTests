const { getClient } = require('../common.webdriverio');
const { selector } = require('../globals.webdriverio.js');

global.categoryName='category' + new Date().getTime();

class PrestashopClient {
    constructor() {
        this.client = getClient();
    }


    loginBO(){
        return this.client
            .url(`http://localhost/prestashop_1.7.2.2/admin-dev`)
            .waitForExist(selector.BO.AccessPage.login_input, 90000)
            .setValue(selector.BO.AccessPage.login_input, 'demo@prestashop.com')
            .setValue(selector.BO.AccessPage.password_input, 'prestashop_demo')
            .click(selector.BO.AccessPage.login_button)
            .waitForExist(selector.BO.AddProductPage.menu, 90000)
    }

    goToCategoryList(){
        return this.client
            .waitForExist(selector.BO.CatalogPage.menu_button, 90000)
            .moveToObject(selector.BO.CatalogPage.menu_button)
            .waitForExist(selector.BO.CatalogPage.CategorySubmenu.submenu, 90000)
            .click(selector.BO.CatalogPage.CategorySubmenu.submenu)

    }
    createCategory(){
        return this.client
            .waitForExist(selector.BO.CatalogPage.CategorySubmenu.new_category_button, 90000)
            .click(selector.BO.CatalogPage.CategorySubmenu.new_category_button)
    }

    addCategoryName(){
        return this.client
            .waitForExist(selector.BO.CatalogPage.CategorySubmenu.name_input, 90000)
            .setValue(selector.BO.CatalogPage.CategorySubmenu.name_input,global.categoryName)
    }

    addCategoryImage(){
        return this.client
            .execute(function () {
                document.getElementById("image").style = "";
            })
            .chooseFile(selector.BO.CatalogPage.CategorySubmenu.picture, global.categoryImage)
    }

    addCategoryThumb(){
        return this.client
            .execute(function () {
                document.getElementById("image").style = "";
            })
            .chooseFile(selector.BO.CatalogPage.CategorySubmenu.thumb_picture, global.categoryThumb)
    }

    addCategoryTitle(){
        return this.client
            .waitForExist(selector.BO.CatalogPage.CategorySubmenu.title, 90000)
            .setValue(selector.BO.CatalogPage.CategorySubmenu.title,'test category')
    }

    addCategoryMetaDescription(){
        return this.client
            .waitForExist(selector.BO.CatalogPage.CategorySubmenu.meta_description, 90000)
            .setValue(selector.BO.CatalogPage.CategorySubmenu.meta_description,'this is the meta description')
    }

    addCategoryMetakeyswords(){
        return this.client
            .waitForExist(selector.BO.CatalogPage.CategorySubmenu.keyswords, 90000)
            .setValue(selector.BO.CatalogPage.CategorySubmenu.keyswords,'keyswords')
    }

    addCategorySimplifyUrl(){
        return this.client
            .waitForExist(selector.BO.CatalogPage.CategorySubmenu.simplify_URL_input, 90000)
            .setValue(selector.BO.CatalogPage.CategorySubmenu.simplify_URL_input,global.categoryName)
    }

    addCategorySave(){
        return this.client
            .waitForExist(selector.BO.CatalogPage.CategorySubmenu.save_button, 90000)
            .click(selector.BO.CatalogPage.CategorySubmenu.save_button)
    }

    addCategorySuccessPanel(){
        return this.client
            .waitForExist(selector.BO.CatalogPage.CategorySubmenu.success_panel)
            .getText(selector.BO.CatalogPage.CategorySubmenu.success_panel).then(function (text) {
                text = text.indexOf('Création réussie.');
                if (text === -1) {
                    done(new Error('the category is not created !'));
                }
            })
    }

    goToCategoryBO(){
        return this.client
            .waitForExist(selector.BO.CatalogPage.menu_button, 90000)
            .moveToObject(selector.BO.CatalogPage.menu_button)
            .waitForExist(selector.BO.CatalogPage.CategorySubmenu.submenu, 90000)
            .click(selector.BO.CatalogPage.CategorySubmenu.submenu)
    }

    searchCategoryBO(){
        return this.client
            .waitForExist(selector.BO.CatalogPage.CategorySubmenu.name_search_input, 90000)
            .setValue(selector.BO.CatalogPage.CategorySubmenu.name_search_input,global.categoryName)
            .waitForExist(selector.BO.CatalogPage.CategorySubmenu.search_button, 90000)
            .click(selector.BO.CatalogPage.CategorySubmenu.search_button)
            .getText(selector.BO.CatalogPage.CategorySubmenu.search_result).then(function (text) {
                text = text.indexOf(global.categoryName);
                if (text === -1) {
                    done(new Error('we could not find the category in the list of category'));
                }
            })
    }

    checkCategoryImage(){
        return this.client
            .waitForExist(selector.BO.CatalogPage.CategorySubmenu.update_button, 90000)
            .click(selector.BO.CatalogPage.CategorySubmenu.update_button)
            .isExisting(selector.BO.CatalogPage.CategorySubmenu.image_link).then(function(text) {
                if (text === false) {
                    done(new Error('we could not find the image'));
                }
            })
    }

    checkCategoryImageThumb(){
        return this.client
            .isExisting(selector.BO.CatalogPage.CategorySubmenu.thumb_link).then(function(text) {
                if (text === false){
                    done(new Error('we could not find the thumb image'));
                }
            })
    }

    checkCategoryTitle(){
        return this.client
            .then(() => this.client.getAttribute(selector.BO.CatalogPage.CategorySubmenu.title, "value"))
            .then((text) => expect(text).to.be.equal("test category"));
    }

    checkCategoryMetaDescription(){
        return this.client
            .then(() => this.client.getAttribute(selector.BO.CatalogPage.CategorySubmenu.meta_description,"value"))
            .then((text) => expect(text).to.be.equal("this is the meta description"));
    }

/*    checkCategorykeyswordsText(){
        return this.client
            .then(() => this.client.getAttribute(selector.BO.CatalogPage.CategorySubmenu.keyswords,"value"))
            .then(text => expect(text).to.contains("keyswords"));
    }*/

    checkCategorySimplifyURL(){
        return this.client
            .then(() => this.client.getAttribute(selector.BO.CatalogPage.CategorySubmenu.simplify_URL_input,"value"))
            .then((text) => expect(text).to.be.equal(global.categoryName));
    }

    loginFO(){
        return this.client
            .url(`http://localhost/prestashop_1.7.2.2`)
    }

    openProductList(){
        return this.client
            .waitForExist(selector.FO.AccessPage.product_list_button, 90000)
            .click(selector.FO.AccessPage.product_list_button)
    }

    checkexisitence(){
        return this.client
            .then(() => this.client.getText('//*[@id="left-column"]/div[1]/ul/li[2]/ul/li['+2+']/a'))
            .then((text) => expect(text).to.be.equal(global.categoryName));
    }



    takeScreenshot() {
        return this.client.saveScreenshot(`screenshots/${this.client.desiredCapabilities.browserName}_exception_${global.date_time}.png`);
    }

    open() {
        return this.client.init().windowHandleSize({ width: 1280, height: 1024 });
    }

    close() {
        return this.client.end();
    }
}

module.exports = PrestashopClient;