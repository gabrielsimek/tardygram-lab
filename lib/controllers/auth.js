import { Router } from 'express';
import UserService from '../services.js/UserService';

export default Router()
  .post('/signup', async (req, res, next) => {
    UserService.create(req.body)
      .then(user => res.send(user))
      .catch(next);
  });
