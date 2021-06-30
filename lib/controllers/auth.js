import { Router } from 'express';
import UserService from '../services.js/UserService';

export default Router()
  .post('/signup', async (req, res, next) => {
    UserService.create(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 
        });
        res.send(user);
      })
      .catch(next);
  })
  .post('/login', async (req, res, next) => {
    UserService.authorize(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24
        });
        res.send(user);
      })
      .catch(next);
  });
