import ValidationComposite from './validation-composite';
import { MissingParamError } from '../../errors';
import { Validation } from './validation';

describe('Validation Composite', () => {
  test('Should return an error when any validation fails', () => {
    class ValisationStub implements Validation {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      validate(input: any): Error {
        return new MissingParamError('field');
      }
    }

    const validationStub = new ValisationStub();
    const sut = new ValidationComposite([validationStub]);
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
