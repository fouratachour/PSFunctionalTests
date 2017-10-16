const { createClient } = require('../common.webdriverio');
const { selector } = require('../globals.webdriverio.js');
const config = require('config');

const towerEndpoint = config.get('tower.endpoint');

class TowerClient {
    constructor() {
        this.client = createClient();
    }

    fillSignInForm(login = 'e2euser@ps.com', password = 'azerty1234') {
        return this.client
        .url(`https://${towerEndpoint}/signin`)
        .waitForExist(selector.signin_loginemail_field, 60000)
        .waitForExist(selector.signin_password_field, 60000)
        .setValue(selector.signin_loginemail_field, login)
        .setValue(selector.signin_password_field, password)
        .click(selector.signin_connection_btn)
        .pause(5000);
    }

    logout() {
        this.client.url(`https://${towerEndpoint}/signout`);
    }

    fillSignUpPage1(email = new Date().getTime() + new_customer_email, password = 'azerty1234') {
        return this.client
        .url(`https://${towerEndpoint}/signup`)
        .waitForExist(selector.signup_email_field, 60000)
        .waitForExist(selector.signup_password_field, 60000)
        .setValue(selector.signup_email_field, email)
        .setValue(selector.signup_password_field, password)
        .click(selector.signup_nextemail_btn);
    }

    fillSignUpPage2() {
        return this.client.waitForExist(selector.signup_name_field, 60000)
        .waitForExist(selector.signup_surname_field, 60000)
        .setValue(selector.signup_name_field, 'maurice')
        .setValue(selector.signup_surname_field, 'martin')
        .click(selector.signup_nextname_btn);
    }

    fillSignUpPage3() {
        return this.client.waitForExist(selector.signup_shopname_field, 60000)
        .waitForExist(selector.signup_subdomain_field, 60000)
        .setValue(selector.signup_shopname_field, `robustesseshop${new Date().getTime()}`)
        .waitForExist(selector.signup_nextshop_btn, 90000)
        .click(selector.signup_nextshop_btn);
    }

    fillSignUpPage4() {
        return this.client
        .waitForExist(selector.signup_country_list, 30000)
        .selectByIndex(selector.signup_country_list, 3)
        .selectByIndex(selector.signup_language_list, 2)
        .click(selector.signup_cgv_checkbox)
        .click(selector.signup_nextcountry_btn);
    }

    pause(value) {
        return this.client.pause(value);
    }

    clickOnBackOfficeButton() {
        return this.client
        .waitForExist(selector.dashboard_backoffice_btn, 180000)
        .waitForExist(selector.dashboard_frontoffice_btn, 180000)
        .click(selector.dashboard_backoffice_btn)
        .then(() => this.client.getTabIds())
        .then(ids => this.client.switchTab(ids[1]));
    }

    clickOnFrontOfficeButton() {
        return this.client.click(selector.dashboard_frontoffice_btn)
        .then(() => this.client.getTabIds())
        .then(ids => this.client.switchTab(ids[1]));
    }

    openOfferPage() {
        return this.client
        .waitForExist(selector.dashboard_selectplan_btn, 180000)
        .click(selector.dashboard_selectplan_btn);
    }

    selectPlan() {
        return this.client.waitForExist(selector.subscription_select_btn, 180000)
        //.click(selector.subscription_monthlyearly_switch)
        .click(selector.subscription_select_btn)
    }

    fillSubscribePage1() {
        return this.client.waitForExist(selector.subscription_mobilephone_field)
        .setValue(selector.subscription_mobilephone_field, '0722334455')
        .click(selector.subscription_next1_btn);
    }

    fillSubscribePage2() {
        return this.client
        .waitForExist(selector.subscription_companyname_field, 180000)
        .setValue(selector.subscription_companyname_field, 'shop test corp.')
        .setValue(selector.subscription_adress_field, '22th juan street')
        .setValue(selector.subscription_zipcode_field, '42222')
        .setValue(selector.subscription_city_field, 'San Antonio Vega')
        .click(selector.subscription_next2_btn);
    }

    fillSubscribePage3() {
        return this.client.waitForExist(selector.subscribe_creditcard_field, 180000)
        .setValue(selector.subscribe_creditcard_field, '4242424242424242')
        .setValue(selector.subscribe_expdate_field, '1148')
        .setValue(selector.subscribe_secucode_field, '223')
        .click(selector.subscribe_iagree_checkbox)
        .click(selector.subscribe_subscribenow_btn)
        .waitForExist(selector.modal_whats_next_btn, 180000);
    }

    clickOnModalButton(selector) {
        return this.client.click(selector);
    }

    clickOnProfileName() {
        return this.client.click(selector.dashboard_profilname_link).pause(500);
    }

    close() {
        return this.client.end();
    };

    clickOnDisconnect() {
        return this.client.click(selector.dashboard_disconnect_link);
    }

    waitForBackOfficeButton() {
        return this.client.waitForExist(selector.dashboard_backoffice_btn, 3 * 60000);
    }

    waitForBackOffice() {
        return this.client.waitForText(selector.backoffice_title, 15000)
        .then(() => this.client.getText(selector.backoffice_title))
        .then((title) => expect(title).to.be.equal('Tableau de bord'))
        .then(() => this.client.getUrl())
        .then(url => expect(url).to.contains('backoffice'));
    }

    waitForFrontOffice() {
        return this.client.waitForText(selector.frontoffice_contact_link, 15000)
        .then(() => this.client.getText(selector.frontoffice_contact_link))
        .then((title) => expect(title).to.be.equal('Contactez-nous'))
        .then(() => this.client.getUrl())
        .then(url => expect(url).endsWith('prestashopready.net/'));
    }

    waitForSignInPage() {
        return this.client.waitForValue('h4')
        .then(() => this.client.getUrl())
        .then(url => expect(url).to.endsWith('/signin'));
    }

    waitForFrontOfficeButton() {
        return this.client.waitForExist(selector.dashboard_frontoffice_btn, 3 * 60000);
    }

    waitForText(text, timeout = 3000) {
        return this.client.waitForText(text, timeout);
    }

    getText(selector) {
        return this.waitForText(selector, 10000).then(() => this.client.getText(selector));
    }

    takeScreenshot() {
        return this.client.saveScreenshot(`test/screenshots/${this.client.desiredCapabilities.browserName}_exception_${global.date_time}.png`);
    }

    open() {
        return this.client.init().windowHandleSize({ width: 1280, height: 1024 });
    }

    waitForExist(selector, timeout = 3000) {
        return this.client.waitForExist(selector, timeout);
    }

}

module.exports = TowerClient;
