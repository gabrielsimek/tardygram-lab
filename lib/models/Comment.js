import pool from '../utils/pool';

export default class Comment{
    id;
    userId;
    postId;
    comment;

    constructor(row){
      this.id = row.id;
      this.userId = row.user_id;
      this.postId = row.post_id;
      this.comment = row.comment;
    }

    static async insert({ userId, postId, comment }){
    //   console.log(userId, postId, comment);
      const { rows } = await pool.query(
        `INSERT INTO comments (user_id, post_id, comment)
        VALUES ($1, $2, $3)
        RETURNING *
        `, [userId, postId, comment]
      );
      return new Comment(rows[0]);
    }
}
