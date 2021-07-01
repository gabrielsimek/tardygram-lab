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
  //should hash password and authorize user
  it('creates a post', async () => {
      
  

    const res = await agent
      .post('/api/v1/posts')
      .send({
        photoUrl: 'https://www.placecage.com/200/300',
        caption: 'cage',
        tags: ['nick cage', 'national treasure']
      });
    
    expect(res.body).toEqual(
      {  id: '1',
        userId: '1',
        photoUrl: 'https://www.placecage.com/200/300',
        caption: 'cage',
        tags: ['nick cage', 'national treasure']
      }
    );
  });

  it('gets a list of all posts', async () => {
    const posts = [{
      photoUrl: 'https://www.kitten.com/200/300',
      caption: 'kitten',
      tags: ['cat', 'cute']
    }, 
    {
      photoUrl: 'https://www.placecage.com/g/200/300',
      caption: 'cage',
      tags: ['nick cage', 'calm']
    },
    {
      photoUrl: 'https://www.placecage.com/c/200/300',
      caption: 'cage',
      tags: ['nick cage', 'crazy']
    }
    ];

    const returnedPosts = await Promise.all(
      posts.map(post => {
        return agent
          .post('/api/v1/posts')
          .send(post);
      })
    );
    
    
    const res = await agent
      .get('/api/v1/posts');
    expect(res.body).toEqual(expect.arrayContaining(
      [
        returnedPosts[0].body,
        returnedPosts[1].body,
        returnedPosts[2].body
      ]
    ));
  });

  it('gets a post by id', async () => {
    const postResponse = await agent
      .post('/api/v1/posts')
      .send({
        photoUrl: 'https://www.placecage.com/200/300',
        caption: 'cage',
        tags: ['nick cage', 'national treasure']
      });
    const post = postResponse.body;

    const commentOneResponse = await agent
      .post('/api/v1/comments')
      .send({
        postId: post.id,
        comment: 'Wow cool!'
      });
    const commentOne = commentOneResponse.body;

    const commentTwoResponse = await agent
      .post('/api/v1/comments')
      .send({
        postId: post.id,
        comment: 'so cool!'
      });
    const commentTwo = commentTwoResponse.body;

    const res = await agent
      .get('/api/v1/posts/1');

    expect(res.body).toEqual(
      {  id: '1',
        photoUrl: 'https://www.placecage.com/200/300',
        caption: 'cage',
        tags: ['nick cage', 'national treasure'],
        username: 'MrKitty',
        profilePhotoUrl: 'http://placekitten.com/200/300',
        comments: [
          { comment: commentOne.comment },
          { comment: commentTwo.comment }
        ]
      }
    );
  });
  it('patches a user by id', async () => {
    const post = await agent
      .post('/api/v1/posts')
      .send({
        photoUrl: 'https://www.placecage.com/200/300',
        caption: 'cage',
        tags: ['nick cage', 'national treasure']
      });

    const res = await agent
      .patch('/api/v1/posts/1')
      .send({ caption: 'CAGE' });

    post.body.caption = 'CAGE';
    expect(res.body).toEqual(post.body);
  });

  it('deletes a post by id', async () => {
    const post = await agent
      .post('/api/v1/posts')
      .send({
        photoUrl: 'https://www.placecage.com/200/300',
        caption: 'cage',
        tags: ['nick cage', 'national treasure']
      });

    const res = await agent
      .delete('/api/v1/posts/1');

    expect(res.body).toEqual(post.body);
  });

});
