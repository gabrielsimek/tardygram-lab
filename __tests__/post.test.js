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
  it('creates a post', async () => {
    const user = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'MrKitty',
        profilePhotoUrl: 'http://placekitten.com/200/300',
        password: 'password'
      });

    const res = await request(app)
      .post('/api/v1/posts')
      .send({
        photoUrl: 'https://www.placecage.com/200/300',
        caption: 'cage',
        tags: ['nick cage', 'national treasure']
      });
    
    expect(res.body).toEqual(
      {   id: '1',
        username: 'mrKitty',
        photoUrl: 'https://www.placecage.com/200/300',
        caption: 'cage',
        tags: ['nick cage', 'national treasure']
      }
    );
  });
 

});
