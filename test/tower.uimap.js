'use strict';
var common = require('./common.webdriverio');
var path = require('path');
var should = require('should');
var argv = require('minimist')(process.argv.slice(2));

global.date_time = new Date().getTime();
global.URL = argv.URL;
global.module_tech_name = argv.MODULE;
global.saucelabs = argv.SAUCELABS;
global.selenium_url = argv.SELENIUM;
global._projectdir = path.join(__dirname, '..', '..');
global.product_id = new Date().getTime();
global.new_customer_email = 'pub' + date_time + '@prestashop.com';

module.exports = {
    selector: {
        
        //BO
        login: '#email',
        password: '#passwd',
        login_btn: '[name="submitLogin"]',
        exit_welcome: '[class="btn btn-tertiary-outline btn-lg onboarding-button-shut-down"]',
        click_outside: '//*[@id="product_catalog_list"]/div[2]/div/table/thead/tr[1]/th[3]',
        profil: '#employee_infos',
        new_profil: '.employee-dropdown.dropdown > div',
        logout: '#header_logout',
        products: '#subtab-AdminCatalog',
        //go_to_catalog: '//*[@id="form"]/div[4]/div[2]/div/div[2]/a[2]',
        go_to_catalog: '#form > div.product-footer > div.text-lg-right > div > div.dropdown-menu > a.dropdown-item.go-catalog.js-btn-save',
        more_option: '.btn.btn-primary.dropdown-toggle',
        new_product: '#page-header-desc-configuration-add',
        menu: '#nav-sidebar',
        product_name: '#form_step1_name_1',
        save_product: '//*[@id="form"]/div[4]/div[2]/div/button[1]',
        catalog_list: '#product_catalog_list',
        green_validation: '[class="growl growl-notice growl-medium"]',
        close_validation: '.growl-close',
        validation_msg: '//*[@id="growls"]/div/div[3]',
        red_validation: '[class="growl growl-error growl-medium"]',
        summary_button: '[href="#description_short"]',
        summary: 'form_step1_description_short_1_ifr', //not declare than an id because using into function "frame" that not need this information;
        description_button: '[href="#description"]',
        description: 'form_step1_description_1_ifr',//not declare than an id because using into function "frame" that not need this information;
        priceTE_shortcut: '#form_step1_price_shortcut',
        quantity_shortcut: '#form_step1_qty_0_shortcut',
        picture: '[class="dz-hidden-input"]',
        picture_cover: '.iscover',
        product_online: '.switch-input ',
        catalogue_filter_by_name: '//input[@name="filter_column_name"]',
        catalogue_submit_filter: '//button[@name="products_filter_submit"]',
        catalogue_filter_reset: '//button[@type="reset" and @style="display: inline-block;"]',
        orders: '#subtab-AdminParentOrders',
        orders_form: '#form-order',
        order_product_name: '.productName',
        order_quantity: '.product_quantity_show',
        order_total: '#total_order > td.amount.text-right.nowrap',
        //order_reference: '#content > div.row > div > div:nth-child(5) > div.col-lg-7 > div:nth-child(1) > div.panel-heading > span:nth-child(2)',
        order_reference: '((//div[@class="panel-heading"])[1]/span)[1]',
        modules_menu: '#subtab-AdminParentModulesSf',
        modules_search: 'div.pstaggerAddTagWrapper > input',
        modules_search_button: '.btn.btn-primary.pull-right.search-button',
        modules_page_loaded: '.module-search-result-wording',
        modules_installed: '(//div[@class="page-head-tabs"]/a)[2]',
        modules_validate_uninstall: '//a[@class="btn btn-primary uppercase module_action_modal_uninstall"]',
        nbr_module: '[class="module-sorting-search-wording"]',
        close_sf_toolbar: '//a[@class="hide-button"]',
        module_tech_name: '//div[@data-tech-name="' + module_tech_name + '" and not(@style)]',
        install_module_btn: '//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//button[@data-confirm_modal="module-modal-confirm-' + module_tech_name + '-install"]',
        uninstall_module_list: '//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//button[@class="btn btn-primary-outline  dropdown-toggle"]',
        uninstall_module_btn: '//div[@data-tech-name="' + module_tech_name + '" and not(@style)]//button[@class="dropdown-item module_action_menu_uninstall"]',
        modal_confirm_uninstall: '//*[@id="module-modal-confirm-' + module_tech_name + '-uninstall" and @class="modal modal-vcenter fade in"]//a[@class="btn btn-primary uppercase module_action_modal_uninstall"]',

        onboarding_popup: '.onboarding-popup',
        onboarding_popup_close_btn: '.onboarding-button-shut-down',
        onboarding_stop: '.onboarding-button-stop',

        //FO
        access_loginFO: 'div.user-info > a',
        loginFO: '//*[@id="login-form"]/section/div[1]/div[1]/input',
        passwordFO: '//*[@id="login-form"]/section/div[2]/div[1]/div/input',
        login_btnFO: '//*[@id="login-form"]/footer/button',
        logoutFO: '.logout',
        //create_account: '#email_create',
        create_account_button: '[data-link-action="display-register-form"]',
        create_account_firstname: '[name="firstname"]',
        create_account_lastname: '[name="lastname"]',
        create_account_email: '[name="email"]',
        create_account_password: '[name="password"]',
        create_account_info_validate: '[data-link-action="save-customer"]',
        logo_home_pageFO: '.logo.img-responsive',
        first_product_home_page: '.thumbnail.product-thumbnail',
        add_to_cart: '.btn.btn-primary.add-to-cart',
        first_product_home_page_name: '[itemprop="name"]',
        product_image: '#content',
        product_name_details: '[itemprop="name"]',
        product_price_details: '[itemprop="price"]',
        product_quantity_details: '#quantity_wanted',
        layer_cart: '//div[@id="blockcart-modal" and @style="display: block;"]',
        layer_cart_name_details: '//div[@id="blockcart-modal"]/div/div/div[2]/div/div[1]/div/div[2]/h6',
        layer_cart_price_details: '//div[@id="blockcart-modal"]/div/div/div[2]/div/div[1]/div/div[2]/p[1]',
        layer_cart_quantity_details: '//div[@id="blockcart-modal"]/div/div/div[2]/div/div[1]/div/div[2]/p[2]',
        layer_cart_command_button: '//*[@id="blockcart-modal"]/div/div/div[2]/div/div[2]/div/div/a',
        //for 1.7.1.0
        //layer_cart_command_button: '//div[@id="blockcart-modal"]/div/div/div[2]/div/div[2]/div/div/a',
        //command_product_quantity: '//div[@class="product-line-grid-body col-md-5 col-xs-5"]/div[5]',
        command_product_name: '(//div[@class="product-line-info"])[1]/a',
        command_product_price: '//span[@class="price"]',
        command_button_checkout: '//*[@id="main"]/div/div[2]/div[1]/div[2]/div/a',
        check_out_step1: '#checkout-personal-information-step',
        check_out_step2: '#checkout-addresses-step',
        checkout_step2_continue_button: '//*[@id="checkout-addresses-step"]/div/div/form/div[2]/button',
        check_out_step3: '#checkout-delivery-step',
        checkout_step3_continue_button: '//*[@id="js-delivery"]/button',
        check_out_step4: '#checkout-payment-step',
        checkout_step4_payment: '//*[@id="payment-option-2"]',
        checkout_step4_cgv: '//input[@id="conditions_to_approve[terms-and-conditions]"]',
        checkout_step4_order: '#payment-confirmation >div > button',
        checkout_total: '//div[@class="cart-summary-line cart-total"]/span[2]',
        order_confirmation_name: '#order-items > div > div > div.col-sm-4.col-xs-9.details > span',
        order_confirmation_price1: '#order-items > div > table > tbody > tr:nth-child(1) > td:nth-child(2)',
        order_confirmation_price2: '#content-hook_payment_return > div > div > div > dl > dd:nth-child(2)',
        order_confirmation_ref: '(//div[@id="order-details"]/ul/li)[1]',
        search_product: '.ui-autocomplete-input',
        search_product_button: '.material-icons.search',
        search_product_result_image: '.thumbnail.product-thumbnail',
        search_product_result_name: '.h3.product-title > a',
        search_product_result_price: '[itemprop="price"]',
        close_error: '//*[@id="error-modal"]/div/div/button',


        //******strictly for presto project*******
        // selector variable naming convention: [page_name_object] example: "dashboard_loginmember_btn"
        //page: sigin|signup|reset_password|dashboard|
        //object: btn|field|checkbox|link|label|title|logo|avatar|

        //1.1 signin page
        signin_loginemail_field: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[2]/input',
        signin_password_field: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[4]/input',
        signin_forgetpassword_link: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[6]/a',
        signin_rememberme_checkbox: '//*[@id="remember"]',
        signin_connection_btn: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/button',
        signin_subscribe_link: '//*[@id="app"]/div[2]/div[2]/div[2]/div[2]/p/a' ,
        signin_subscribe_btn: '//*[@id="app"]/div[2]/div[2]/div[1]/div[2]/div/a' ,
        signin_puffins_logo: '//*[@id="app"]/div[2]/div[2]/div[1]/div[2]/div/img' ,
        //"veuillez saisir un email valide":
        signin_errormsg_wrongemailformat_txt:'//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[3]/span',
        //"Adresse email ou mot de passe incorrect"
        signin_errormsg_loginincorrect_txt:'//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[1]',
        //
        signin_language_btn: '//*[@id="app"]/div[3]/footer/div[3]/select',



        //1.2 signup page
        signup_disconnected_label: '//*[@id="app"]/div[1]/div/div/div/div/div[2]/p',
            //step1: email
        //signup_email_field: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[2]/input',
        //signup_password_field: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[4]/input',
        signup_email_field: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[1]/input',
        signup_password_field: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[3]/input',
        signup_nextemail_btn: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/button',
            //step2: name
        signup_name_field: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[2]/input',
        signup_surname_field: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[4]/input',
        signup_nextname_btn: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/button',
            //step1: shop
        signup_shopname_field: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[1]/input',
        signup_subdomain_field: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/div[4]/input',
        signup_nextshop_btn: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/button',
            //step1: country
        signup_country_list: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/select[1]',
        signup_countrynb7_list: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/select[1]/option[7]',
        signup_language_list: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/select[2]',
        signup_languagenb2_list: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/select[2]/option[4]',
        signup_cgv_checkbox: '//*[@id="gtc"]',
        signup_nextcountry_btn: '//*[@id="app"]/div[2]/div[2]/div[2]/form/div/button',

        //2.1 dashboard page
        dashboard_profil_avatar: '//*[@id="app"]/div[1]/div/div/div/div/div[3]/i',
        dashboard_signout_link: '//*[@id="app"]/div[1]/div/div[3]/div[3]/a',
        dashboard_profilname_link: '//*[@id="app"]/div[1]/div/div/div/div/div[2]/span',
        dashboard_disconnect_link: '//*[@id="app"]/div[1]/div/div[3]/div[3]/a',
        dashboard_backoffice_btn: '//*[@id="app"]/div[2]/div[2]/div[1]/div[1]/div[2]/div/div/a[1]',
        dashboard_frontoffice_btn: '//*[@id="app"]/div[2]/div[2]/div[1]/div[1]/div[2]/div/div/a[2]',
     

    },
    shouldExist: function (err, existing) {
        should(err).be.not.defined;
        should(existing).be.true;
    }
};
