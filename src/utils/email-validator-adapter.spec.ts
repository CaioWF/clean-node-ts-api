import validator from 'validator';
import EmailValidatorAdapter from './email-validator';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe('EmailValidator Adapter', () => {
  test('Should return false when validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_mail@mail.com');
    expect(isValid).toBe(false);
  });

  test('Should return true when validator returns true', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid('valid_mail@mail.com');
    expect(isValid).toBe(true);
  });
});
