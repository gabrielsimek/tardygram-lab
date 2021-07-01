import pool from '../utils/pool';

export default class Post{
    id;
    userId;
    photoUrl;
    caption
    tags;
    
    constructor(row){
      this.id = row.id;
      this.userId = row.user_id;
      this.photoUrl = row.photo_url;
      this.caption = row.caption;
      this.tags = row.tags;
      this.username = row.username,
      this.profilePhotoUrl = row.profile_photo_url;
    }
    //
    static async insert({ userId, photoUrl, caption, tags }){
      const { rows } = await pool.query(
        `INSERT INTO posts (user_id, photo_url, caption, tags)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [userId, photoUrl, caption, tags]
      );
      return new Post(rows[0]);
    }

    static async findAll(){
      const { rows } = await pool.query(
        'SELECT * FROM posts'
      );
      return rows.map(row => new Post(row));
    }

    // static async findPopular(){
    //   const { rows } = await pool.query(
    //     ` SELECT 
    //       caption,
    //       COUNT(comments.comment) as comments
    //       FROM posts
    //       INNER JOIN comments ON comments.post_id = posts.id
    //       GROUP BY posts.caption
    //       ORDER BY comments DESC
    //       LIMIT 10
    //     `
    //   );
    //   return rows;
    // }

    static async findByPk(id){
      const { rows } = await pool.query(
        `SELECT 
       posts.id, posts.photo_url, posts.caption, posts.tags, users.username, users.profile_photo_url, comments.comment
       FROM posts
       INNER JOIN users ON users.id = posts.user_id
       INNER JOIN comments ON comments.post_id = posts.id
       WHERE posts.id = $1
       `, [id]
      );
      const post = new Post(rows[0]);
      const comments = rows.map(row => {
        return { comment: row.comment };
      });
      post.comments = comments;
      return post;
    }
    static async update(postId, userId, { caption }){
      
      const { rows } = await pool.query(
        `UPDATE posts
        SET caption = $1
        WHERE id = $2 AND user_id = $3
        RETURNING *
        `, [caption, postId, userId]
      );
      return new Post(rows[0]);
    }
    static async destroy(postId, userId){
      
      const { rows } = await pool.query(
        `DELETE FROM posts
        WHERE id = $1 AND user_id = $2
        RETURNING *
        `, [postId, userId]
      );
      
      return new Post(rows[0]);
    }

}
