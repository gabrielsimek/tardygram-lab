import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
const agent = request.agent(app);
describe('demo routes', () => {
  beforeAll(async()  => {
    await setup(pool);
  });
  it('creates a comment on a post', async () => {
    //USER 1
    await agent
      .post('/api/v1/auth/signup')
      .send({
        username: 'MrCat',
        profilePhotoUrl: 'http://placekitten.com/200/300',
        password: 'password'
      });
      
   
    
    //post belongs to user w/ userId 1
    const postResponse = await agent
      .post('/api/v1/posts')
      .send({
        photoUrl: 'https://www.placecage.com/200/300',
        caption: 'cage',
        tags: ['nick cage', 'national treasure']
      });
    const post = postResponse.body;

    //USER 2
    const userTwoResponse =  await agent
      .post('/api/v1/auth/signup')
      .send({
        username: 'MsCat',
        profilePhotoUrl: 'http://placekitten.com/200/300',
        password: 'strongPassword'
      });
    const userTwo = userTwoResponse.body;
    //comment belongs to user w/ userId 2
    
    const res = await agent
      .post('/api/v1/comments')
      .send({
        postId: post.id,
        comment: 'Wow cool!'
      });

    expect(res.body).toEqual({
      id: '1',
      userId: userTwo.id,
      postId: post.id,
      comment: 'Wow cool!'
    });
  });
  it('deletes a comment', async () => {
    //before all so previous comment is retained
    //user2 currently logged in
    const res = await agent
      .delete('/api/v1/comments/1');


    expect(res.body).toEqual(
      {
        id: '1',
        userId: '2',
        postId: '1',
        comment: 'Wow cool!'
      }
    );
  });
});

