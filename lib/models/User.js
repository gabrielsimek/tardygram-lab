import pool from '../utils/pool.js';
import jwt from 'jsonwebtoken';
export default class User{

id;
username;
passwordHash;
profilePhotoUrl;

constructor(row){
  this.id = row.id;
  this.username = row.username;
  this.profilePhotoUrl = row.profile_photo_url;
  this.passwordHash = row.password_hash;
}

static async insert(username, profilePhotoUrl, passwordHash){
  const { rows } = await pool.query(
    `INSERT INTO users 
    (username, profile_photo_url, password_hash)
    values ($1, $2, $3)
    RETURNING *
    `, [username, profilePhotoUrl, passwordHash]
  );

  return new User(rows[0]);
}
static async findByUsername(username){
  const { rows } = await pool.query(
    `SELECT * FROM USERS
    WHERE username = $1
    `, [username]
  );
  if(!rows[0]) return null;
  return new User(rows[0]);
}
//express will always run to json, put a method and define toJSON for each instance of User class that will be passed through exprs
toJSON() {
  return {
    id: this.id,
    username: this.username,
    profilePhotoUrl: this.profilePhotoUrl
  };
}
//creates token with instance of class as payload
//just this as payload returns expected payload as plain object. toJSON or spreading this in works. Maybe instance of a class is treated dif than a reg obj???
//maybe move this to the bottom
authToken() {
  return jwt.sign(this.toJSON(), process.env.APP_SECRET, {
    expiresIn: '24h'
  });
}

}
