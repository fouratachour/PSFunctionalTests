scenario('SignUp', client => {
    test('open browser', () => client.open());
    test('should fill sign up page 1 successfully', () => client.fillSignUpPage1());
    test('should fill sign up page 2 successfully', () => client.fillSignUpPage2());
    test('should fill sign up page 3 successfully', () => client.fillSignUpPage3());
    test('should fill sign up page 4 successfully', () => client.fillSignUpPage4());
    test('should wait for shop creation', () => client.waitForBackOfficeButton());
},'tower-client');
