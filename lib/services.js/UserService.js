import bcrypt from 'bcryptjs';
import User from '../models/User';

export default class UserService{
  static async create({ username, profilePhotoUrl, password }){
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    //returning a thenable promise...
    return User.insert(username, profilePhotoUrl, passwordHash);
  }
}
