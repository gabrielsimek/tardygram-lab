import { Router } from 'express';
import Post from '../models/Post';
import ensureAuth from '../middleware/ensure-auth';
export default Router()
  .post('/', ensureAuth, async (req, res, next) => {
    Post.insert({ ...req.body, userId: req.user.id })
      .then(post => res.send(post))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Post.findAll()
      .then(posts => res.send(posts))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Post.findByPk(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    // res.send({ hello: 'world' });
    Post.update(req.params.id, req.user.id, req.body)
      .then(post => res.send(post))
      .catch(next);
  });
