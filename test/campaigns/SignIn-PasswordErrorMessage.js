scenario('SignIn - PasswordErrorMessage', client => {
    test('open browser', () => client.open());
    test('sign in', () => client.fillSignInForm('theteste@rps.com', 'azerty4321'));
    test('error message is displayed', () => client.waitForText(selector.signin_errormsg_loginincorrect_txt, 60000));
},'tower-client');