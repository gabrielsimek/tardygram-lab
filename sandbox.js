import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';
// dotenv.config();
const password = 'password';

bcrypt.hash(password, 18)
  .then(password => console.log(password))
  .catch(err => console.error(err));

