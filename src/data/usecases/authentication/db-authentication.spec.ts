/* eslint-disable max-classes-per-file */
import { AccountModel } from '../../../domain/models/account';
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository';
import DbAuthentication from './db-authentication';
import { AuthenticationModel } from '../../../domain/usecases/authentication';
import { HashCompare } from '../../protocols/criptography/hash-compare';
import { TokenGenerator } from '../../protocols/criptography/token-generator';
import { UpdateAccessTokenRepository } from '../../protocols/db/update-access-token-repository';

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
});

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async load(email: string): Promise<AccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};

const makeHashCompare = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async compare(value: string, hash: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  return new HashCompareStub();
};

const makeTokenGenerator = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async generate(id: string): Promise<string> {
      return new Promise((resolve) => resolve('any_token'));
    }
  }
  return new TokenGeneratorStub();
};

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async update(id: string, token: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new UpdateAccessTokenRepositoryStub();
};

interface SutTypes {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hashCompareStub: HashCompare;
  tokenGeneratorStub: TokenGenerator;
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository;
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hashCompareStub = makeHashCompare();
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository();
  const tokenGeneratorStub = makeTokenGenerator();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub,
  );
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub,
  };
};

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
    await sut.auth(makeFakeAuthentication());
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should throw when LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test('Should return null when LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(null);
    const accessToken = await sut.auth(makeFakeAuthentication());
    expect(accessToken).toBeNull();
  });

  test('Should call HashCompare with correct values', async () => {
    const { sut, hashCompareStub } = makeSut();
    const compareSpy = jest.spyOn(hashCompareStub, 'compare');
    await sut.auth(makeFakeAuthentication());
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password');
  });

  test('Should throw when HashCompare throws', async () => {
    const { sut, hashCompareStub } = makeSut();
    jest
      .spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test('Should return null when HashCompare returns false', async () => {
    const { sut, hashCompareStub } = makeSut();
    jest
      .spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const accessToken = await sut.auth(makeFakeAuthentication());
    expect(accessToken).toBeNull();
  });

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut();
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate');
    await sut.auth(makeFakeAuthentication());
    expect(generateSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should throw when TokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut();
    jest
      .spyOn(tokenGeneratorStub, 'generate')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test('Should authenticate', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.auth(makeFakeAuthentication());
    expect(accessToken).toBe('any_token');
  });

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update');
    await sut.auth(makeFakeAuthentication());
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token');
  });
});
