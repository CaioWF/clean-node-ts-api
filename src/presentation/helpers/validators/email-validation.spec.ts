import EmailValidation from './email-validation';
import { EmailValidator } from '../../protocols/email-validator';
import { InvalidParamError } from '../../errors';

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

interface SutTypes {
  sut: EmailValidation;
  emailValidatorStub: EmailValidator;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new EmailValidation('email', emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe('EmailValidation', () => {
  test('Should return an error when EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpResponse = sut.validate({ email: 'any_mail@mail.com' });
    expect(httpResponse).toEqual(new InvalidParamError('email'));
  });

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    sut.validate({ email: 'any_mail@mail.com' });
    expect(isValidSpy).toHaveBeenCalledWith('any_mail@mail.com');
  });

  test('Should throw when EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });
});
