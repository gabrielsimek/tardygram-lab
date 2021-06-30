import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
const agent = request.agent(app);
describe('demo routes', () => {
  beforeEach(async()  => {
    await setup(pool);
    await agent
      .post('/api/v1/auth/signup')
      .send({
        username: 'MrKitty',
        profilePhotoUrl: 'http://placekitten.com/200/300',
        password: 'password'
      });
  });
  it('creates a comment on a post', async () => {
    const otherUser = await agent
      .post('/api/v1/auth/signup')
      .send({
        username: 'MrCat',
        profilePhotoUrl: 'http://placekitten.com/200/300',
        password: 'strongPassword'
      });

    const post =  await agent
      .post('/api/v1/posts')
      .send({
        photoUrl: 'https://www.placecage.com/200/300',
        caption: 'cage',
        tags: ['nick cage', 'national treasure']
      });

    const res = await agent
      .post('/api/v1/comments')
      .send({
        postId: '1',
        comment: 'Wow cool!'
      });
    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      postId: '1',
      comment: 'Wow cool!'
    });
  });
});

// Comments have:

// A reference to a user commentBy
// A reference to a post post
// A string comment
