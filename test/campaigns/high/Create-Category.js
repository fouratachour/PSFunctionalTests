scenario('Create category', client => {
    test('open browser', () => client.open());
    test('sign in', () => client.loginBO());
    test('create category', () => client.createCategory());
    test('add category name', () => client.addCategoryName());
    test('add category image', () => client.addCategoryImage());
    test('add category thumb', () => client.addCategoryThumb());
    test('add category title', () => client.addCategoryTitle());
    test('add category meta desciption', () => client.addCategoryMetaDescription());
    test('add category meta keys words', () => client.addCategoryMetakeyswords());
    test('add category simplify url', () => client.addCategorySimplifyUrl());
    test('add category save', () => client.addCategorySave());
    test('add category success panel', () => client.addCategorySuccessPanel());
},'prestashop-client');


scenario('Check category in BO', client => {
    test('open browser', () => client.open());
    test('sign in', () => client.loginBO());

},'prestashop-client');
