import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import Comment from '../models/Comment';
export default Router()
  .post('/', ensureAuth, async (req, res, next) => {
    Comment.insert({ ...req.body, userId: req.user.id })
      .then((comment) => res.send(comment))
      .catch(next);
  });

