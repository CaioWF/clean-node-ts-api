import MissingParamError from '../errors/missing-param-error';
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
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  test('Should return 400 when email is not provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  test('Should return 400 when password is not provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });
});
