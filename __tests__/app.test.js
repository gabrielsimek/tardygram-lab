import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
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
});
