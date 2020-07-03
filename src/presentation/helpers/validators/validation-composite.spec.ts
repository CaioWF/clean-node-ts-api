import ValidationComposite from './validation-composite';
import { MissingParamError } from '../../errors';
import { Validation } from './validation';

interface SutTypes {
  sut: ValidationComposite;
  validationStub: Validation;
}

const makeValidation = (): Validation => {
  class ValisationStub implements Validation {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validate(input: any): Error {
      return null;
    }
  }
  return new ValisationStub();
};

const makeSut = (): SutTypes => {
  const validationStub = makeValidation();
  const sut = new ValidationComposite([validationStub]);
  return { sut, validationStub };
};

describe('Validation Composite', () => {
  test('Should return an error when any validation fails', () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
