import SignUpController from './signup';

describe('SignUpController', () => {
  test('Should return 400 when name is not provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
