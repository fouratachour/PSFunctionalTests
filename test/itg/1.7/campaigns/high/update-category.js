scenario('Update category', client => {
    //  test('open browser', () => client.open());
    test('sign in', () => client.loginBO());
    test('go to category', () => client.goToCategoryList());

},'prestashop-client');
