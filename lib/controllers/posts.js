import { Router } from 'express';
import Post from '../models/Post';
import ensureAuth from '../middleware/ensure-auth';
export default Router()
  .post('/', ensureAuth, async (req, res, next) => {
    Post.insert({ ...req.body, userId: req.user.id })
      .then(post => res.send(post))
      .catch(next);
  });
