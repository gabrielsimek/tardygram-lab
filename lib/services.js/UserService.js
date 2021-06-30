import bcrypt from 'bcryptjs';
import User from '../models/User';

export default class UserService{
  static async create({ username, profilePhotoUrl, password }){
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    //returning a thenable promise...
    return User.insert(username, profilePhotoUrl, passwordHash);
  }

  static async authorize({ username, password }){
    const user = await User.findByUsername(username);
    if(!user) {
      throw new Error('Invalid email/password');
    }

    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
    if(!passwordsMatch) {
      throw new Error('Invalid email/password');
    }

    return user;
  }
}
