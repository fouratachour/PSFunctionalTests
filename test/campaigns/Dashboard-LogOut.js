scenario('Dashboard/LogOut', client => {
    test('open browser', () => client.open());
    test('sign in', () => client.fillSignInForm());
    test('click on profile name', () => client.clickOnProfileName());
    test('click on disconnect', () => client.clickOnDisconnect());
    test('signin page is shown', () => client.waitForSignInPage())
},'tower-client');
