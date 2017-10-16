scenario('Subscribe', client => {
    test('open browser', () => client.open());
    test('should fill sign up page 1 successfully', () => client.fillSignUpPage1());
    test('should fill sign up page 2 successfully', () => client.fillSignUpPage2());
    test('should fill sign up page 3 successfully', () => client.fillSignUpPage3());
    test('should fill sign up page 4 successfully', () => client.fillSignUpPage4());
    test('should open offer page', () => client.openOfferPage());
    test('should select start plan', () => client.selectPlan());
    test('should fill subscribe page 1', () => client.fillSubscribePage1());
    test('should fill subscribe page 2', () => client.fillSubscribePage2());
    test('should fill subscribe page 3', () => client.fillSubscribePage3());
    test('should browse carousel page 1', () => client.clickOnModalButton(selector.modal_whats_next_btn));
    test('should browse carousel page 2', () => client.clickOnModalButton(selector.modal_next_btn));
    test('should browse carousel page 3', () => client.clickOnModalButton(selector.modal_go_to_my_account_btn));
    test('should have valid offer status', () => client.waitForExist(selector.upgrade_plan_btn));
},'tower-client');