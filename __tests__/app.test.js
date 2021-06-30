import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
//using before all!
describe('demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });
  //should hash password and authorize user
  it('creates a user and signs them up', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'MrKitty',
        profilePhotoUrl: 'http://placekitten.com/200/300',
        password: 'password'
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'MrKitty',
      profilePhotoUrl: 'http://placekitten.com/200/300'
    });
  });

  it('signs in and validates a user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'MrKitty',
        password: 'password'
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'MrKitty',
      profilePhotoUrl: 'http://placekitten.com/200/300'
    });
  });
});
