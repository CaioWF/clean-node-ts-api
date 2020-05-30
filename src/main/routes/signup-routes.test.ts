// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import app from '../config/app';

describe('Signup Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Caio',
        email: 'caio@caio.com',
        password: '123456',
        passwordConfirmation: '123456',
      })
      .expect(200);
  });
});
